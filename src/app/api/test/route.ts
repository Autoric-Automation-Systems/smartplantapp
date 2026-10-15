// Endpoint de ingestão usado para gerar alarmes a partir de leituras de um dispositivo.
// O acesso é controlado por DEVICE_API_KEY (header x-api-key ou Authorization: Bearer).
// Enquanto a variável não estiver configurada o endpoint permanece aberto, como antes.
import CreateAlarm from "@/lib/creatAlarm";
import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { isDeviceRequestAuthorized } from "@/lib/authz";

export async function POST(request: Request) {
    if (!isDeviceRequestAuthorized(request)) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { event_name, value, device_id } = body;

        if (
            typeof device_id !== "string" ||
            typeof event_name !== "string" ||
            value === undefined ||
            value === null
        ) {
            return NextResponse.json({ error: "invalid payload" }, { status: 400 });
        }

        const device = await sql`
            SELECT id FROM public.devices WHERE id = ${device_id} LIMIT 1
        `;

        if (device.length === 0) {
            return NextResponse.json({ error: "device not found" }, { status: 404 });
        }

        await CreateAlarm({ value, device_id, event_name });

        return NextResponse.json({
            message: `Received event ${event_name} with value ${value} for device ${device_id}`,
        });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
