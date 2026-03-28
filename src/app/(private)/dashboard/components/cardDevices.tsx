import { Device } from "@/query/devices/definitions";
import { fetchEventsDevice } from "@/query/events/data";
import CardEvents from "./cardEvents";
import { StatusBadge } from "./StatusBadge";
import { BatteryIndicator } from "../components/BatteryIndicator";
import { WifiIndicator } from "../components/WifiIndicator";

export default async function CardDevices({ device }: { device: Device }) {
    const timeRange = 2 * 60 * 1000;
    const currentTime = Number(new Date());
    const lastHeartbeat = Number(device.lastheartbeat);
    const online = lastHeartbeat + timeRange > currentTime;

    const events = await fetchEventsDevice(device?.id || "");

    const batteryEvents: typeof events = [];
    const eventsWithoutBattery: typeof events = [];
    const wifiEvents: typeof events = [];

    for (const event of events) {
        if (event.event === "battery") {
            if (batteryEvents.length < 2) batteryEvents.push(event);
        } else if (event.event === "wifi") {
            if (wifiEvents.length < 1) wifiEvents.push(event);
        } else {
            eventsWithoutBattery.push(event);
        }
    }

    const currentBattery = Number(batteryEvents[0]?.value ?? 0);
    const previousBattery = Number(batteryEvents[1]?.value ?? currentBattery);
    const charging = currentBattery > previousBattery;
    const wifi = Number(wifiEvents[0]?.value ?? 0);

    const eventsTypes = [...new Set(eventsWithoutBattery.map((e) => e.event))].sort();

    return (
        <div
            title=" "
            className="p-3 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-500 dark:border-gray-800 mb-4">

            {/* HEADER */}
            <div className="flex items-center justify-between gap-4 flex-wrap">

                {/* ESQUERDA */}
                <div className="flex flex-col leading-tight">
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                        {device.name}
                    </h2>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {device.type}
                    </span>
                </div>

                {/* DIREITA */}
                <div className="flex items-center gap-4 flex-wrap">

                    {/* Last update */}
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                        {Intl.DateTimeFormat("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                        }).format(lastHeartbeat)}
                    </span>

                    {/* Status */}
                    <StatusBadge online={online} />

                    {online && (
                        <>
                            <WifiIndicator rssi={wifi} />
                            <BatteryIndicator value={currentBattery} charging={charging} />
                        </>
                    )
                    }


                </div>
            </div>

            {/* EVENTS */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                {eventsTypes.map((type) => {
                    const eventsOfType = events.filter((event) => event.event === type);

                    return (
                        <CardEvents
                            key={type}
                            events={eventsOfType}
                            type={type}
                        />
                    );
                })}
            </div>
        </div>
    );
}