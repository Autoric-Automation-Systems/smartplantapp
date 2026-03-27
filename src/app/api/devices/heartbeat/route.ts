import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {

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
      SELECT id FROM smartplantapp.devices
      WHERE mac = ${mac}
      LIMIT 1
    `;

    if (device.rowCount === 0) {

      await sql`
        INSERT INTO smartplantapp.devices
        (mac, type, version, lastheartbeat, created_at)
        VALUES
        (${mac}, ${type}, ${version}, NOW(), NOW())
      `;

    } else {

      await sql`
        UPDATE smartplantapp.devices
        SET lastheartbeat = NOW(),
            version = ${version},
            type = ${type}
        WHERE mac = ${mac}
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