import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  console.log("Chegou Eventos");

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

    if (device.rowCount === 0) {
      return NextResponse.json(
        { error: "device not found" },
        { status: 404 }
      );
    }

    const deviceId = device.rows[0].id;
    const machineId = device.rows[0].idmachine;

    for (const ev of events) {
      if (!ev.name || ev.value === undefined || !ev.ts) continue;

      const eventDate = new Date(ev.ts * 1000); // epoch → date UTC

      await sql`
        INSERT INTO public.events
        (device_id, machine_id, event, value, created_at)
        VALUES
        (${deviceId}, ${machineId}, ${ev.name}, ${Number(ev.value)}, ${eventDate.toISOString()})
      `;
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