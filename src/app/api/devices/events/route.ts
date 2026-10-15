import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { isDeviceRequestAuthorized } from "@/lib/authz";
import { fetchDataConfigs } from "@/query/configs/data";
import { insertConfig } from "@/query/configs/internal";
import { fetchDataLabel } from "@/query/labels/data";
import { insertLabel } from "@/query/labels/internal";

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

    for (const ev of events) {
      if (!ev.name || ev.value === undefined || !ev.ts) continue;

      const eventDate = new Date(ev.ts * 1000); // epoch → date UTC

      await sql`
        INSERT INTO public.events
        (device_id, machine_id, name, value, created_at)
        VALUES
        (${deviceId}, ${machineId}, ${ev.name}, ${Number(ev.value)}, ${eventDate.toISOString()})
      `;

      // Check if a config exists for this device and event name, if not create one
      const configs = (await fetchDataConfigs(deviceId)).filter(
        (config) => config.event_name === ev.name
      );

      if (configs.length === 0) {
        await insertConfig(deviceId, ev.name);
      }

      if (ev.name === "count" || ev.name === "event1" || ev.name === "event2" || ev.name === "event3") {
        const label = await fetchDataLabel(deviceId);
        if (!label) {
          await insertLabel(deviceId);
        }
      }
    }

    return NextResponse.json({ status: "ok" });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "server error" },
      { status: 500 }
    );
  }
}