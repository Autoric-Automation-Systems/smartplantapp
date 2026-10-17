import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { isDeviceRequestAuthorized } from "@/lib/authz";
import { fetchDataConfigs } from "@/query/configs/data";
import { insertConfig } from "@/query/configs/internal";
import { fetchDataLabel } from "@/query/labels/data";
import { insertLabel } from "@/query/labels/internal";
import { evaluateReading } from "@/lib/alarms/engine";
import { findLatestEventValue } from "@/lib/alarms/queries";

// Teto de eventos por requisição: o lote é enviado pelo dispositivo e não
// pode virar um vetor de amplificação (um alarme/e-mail por leitura).
const MAX_EVENTS_PER_REQUEST = 200;

export async function POST(request: Request) {
  // Hardware endpoints: gated by DEVICE_API_KEY when it is configured.
  if (!isDeviceRequestAuthorized(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { mac, events } = body;

    if (!mac || !Array.isArray(events)) {
      return NextResponse.json(
        { error: "invalid payload" },
        { status: 400 }
      );
    }

    if (events.length > MAX_EVENTS_PER_REQUEST) {
      return NextResponse.json(
        { error: `too many events (max ${MAX_EVENTS_PER_REQUEST} per request)` },
        { status: 413 }
      );
    }

    const device = await sql`
      SELECT id, idmachine
      FROM public.devices
      WHERE mac = ${mac}
      LIMIT 1
    `;

    if (device.length === 0) {
      return NextResponse.json(
        { error: "device not found" },
        { status: 404 }
      );
    }

    const deviceId = device[0].id;
    const machineId = device[0].idmachine;

    // Carregados uma vez por lote: antes cada evento consultava o banco.
    let configs = await fetchDataConfigs(deviceId);
    let label = await fetchDataLabel(deviceId);

    let alarmsCreated = 0;
    let emailsSent = 0;

    for (const ev of events) {
      if (!ev.name || ev.value === undefined || !ev.ts) continue;

      const eventDate = new Date(ev.ts * 1000); // epoch → date UTC

      // Lida ANTES de inserir a leitura atual: é a referência de transição.
      const previousValue = await findLatestEventValue(deviceId, ev.name);

      await sql`
        INSERT INTO public.events
        (device_id, machine_id, name, value, created_at)
        VALUES
        (${deviceId}, ${machineId}, ${ev.name}, ${Number(ev.value)}, ${eventDate.toISOString()})
      `;

      // Check if a config exists for this device and event name, if not create one
      let config = configs.find((c) => c.event_name === ev.name) ?? null;

      if (!config) {
        await insertConfig(deviceId, ev.name);
        configs = await fetchDataConfigs(deviceId);
        config = configs.find((c) => c.event_name === ev.name) ?? null;
      }

      // Avalia os limites configurados para o módulo e registra/notifica o alarme
      const evaluation = await evaluateReading({
        deviceId,
        eventName: ev.name,
        value: Number(ev.value),
        at: eventDate,
        config,
        previousValue,
      });

      if (evaluation.alarmId) alarmsCreated += 1;
      if (evaluation.notified) emailsSent += 1;

      if (ev.name === "count" || ev.name === "event1" || ev.name === "event2" || ev.name === "event3") {
        if (!label) {
          await insertLabel(deviceId);
          label = await fetchDataLabel(deviceId);
        }
      }
    }

    return NextResponse.json({ status: "ok", alarmsCreated, emailsSent });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "server error" },
      { status: 500 }
    );
  }
}
