import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

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
      SELECT *
      FROM public.devices
      WHERE mac = ${mac}
      LIMIT 1
    `;

    if (device.length === 0) {
      console.log("Device not found, creating new device");
      try {
        await sql`
        INSERT INTO public.devices
        (mac, type, version, lastheartbeat, created_at)
        VALUES
        (${mac}, ${type}, ${version}, NOW(), NOW())
      `;

      } catch (error) {
        console.error(error);
        console.log("Error inserting device:", error);
        return NextResponse.json(
          { error: "server error" },
          { status: 500 }
        );
      }


    } else {
      console.log("Device found, updating heartbeat");
      try {
        await sql`
        UPDATE public.devices
        SET lastheartbeat = NOW(),
            version = ${version},
            type = ${type}
        WHERE mac = ${mac}
      `;
      } catch (error) {
        console.error(error);
        console.log("Error updating device:", error);
        return NextResponse.json(
          { error: "server error" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      status: "ok",
      heartbeatInterval: device[0]?.heartbeatInterval || "60000" // Default to 60 seconds if not set
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "server error" },
      { status: 500 }
    );
  }
}