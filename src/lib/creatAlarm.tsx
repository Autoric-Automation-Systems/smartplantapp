import { sql } from "@/lib/db";
import { fetchDataConfigs } from "@/query/configs/data";

export default async function CreateAlarm({ value, device_id, event_name }: { value: any, device_id: string, event_name: string }
) {
    let message = "";
    const config = (await fetchDataConfigs(device_id)).filter((config) => config.event_name === event_name)[0];
    if (!config || !config.alarm) { return; }

    if (value <= config.min!) {
        message = `Value ${value} of ${event_name} is below the minimum threshold of ${config.min}`;
    } else if (value >= config.max!) {
        message = `Value ${value} of ${event_name} is above the maximum threshold of ${config.max}`;
    }

    try {
        await sql`
        INSERT INTO public.alarms
        (device_id, event_name, message)
        VALUES
        (${device_id}, ${event_name}, ${message})
      `;
    } catch (error) {
        console.error("Error creating alarm:", error);
    }
}