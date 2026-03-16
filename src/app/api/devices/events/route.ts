import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {

  try {

    const body = await request.json();

    const { mac, ...events } = body;

    if (!mac) {
      return NextResponse.json(
        { error: "mac is required" },
        { status: 400 }
      );
    }

    const device = await sql`
      SELECT id, idmachine
      FROM smartplantapp.devices
      WHERE mac = ${mac}
      LIMIT 1
    `;

    if (device.rowCount === 0) {

      return NextResponse.json(
        { error: "device not registered" },
        { status: 404 }
      );

    }

    const deviceId = device.rows[0].id;
    const machineId = device.rows[0].idmachine;

    const now = new Date().toISOString();

    for (const [tag, value] of Object.entries(events)) {

      await sql`
        INSERT INTO smartplantapp.events
        (device_id, machine_id, event, value, created_at)
        VALUES
        (${deviceId}, ${machineId}, ${tag}, ${Number(value)}, ${now})
      `;

    }

    return NextResponse.json({
      status: "ok"
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "server error" },
      { status: 500 }
    );
  }
}