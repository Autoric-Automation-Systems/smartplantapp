import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  console.log("Chegou Heartbeat");
  try {

    const body = await request.json();

    const { mac, type, version, wifi, ip } = body;

    if (!mac) {
      return NextResponse.json(
        { error: "mac is required" },
        { status: 400 }
      );
    }

    const device = await sql`
      SELECT * FROM public.devices
      WHERE mac = ${mac}
      LIMIT 1
    `;

    if (device.rowCount === 0) {

      await sql`
        INSERT INTO public.devices
        (mac, type, version, lastheartbeat, created_at)
        VALUES
        (${mac}, ${type}, ${version}, NOW(), NOW())
      `;

    } else {

      await sql`
        UPDATE public.devices
        SET lastheartbeat = NOW(),
            version = ${version},
            type = ${type}
        WHERE mac = ${mac}
      `;

    }

    return NextResponse.json({
      status: "ok",
      heartbeatInterval: device.rows[0].heartbeatInterval || "60000" // Default to 60 seconds if not set
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "server error" },
      { status: 500 }
    );
  }
}