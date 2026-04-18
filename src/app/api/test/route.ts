//Test creat Alarm
import CreateAlarm from "@/lib/creatAlarm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    console.log("Chegou Post Test");
    try {
        const body = await request.json();
        const { event_name, value, device_id } = body;
        console.log(`Received event ${event_name} with value ${value} for device ${device_id}`); // Log the received event and value

        await CreateAlarm({ value, device_id, event_name }); // Call the CreateAlarm function with the received data

        return NextResponse.json({ message: `Received event ${event_name} with value ${value} for device ${device_id}` });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}