import { Device } from "@/query/devices/definitions";
import { fetchEventsDevice } from "@/query/events/data";
import CardEvents from "./CardEvents";
import { StatusBadge } from "./StatusBadge";
import { BatteryIndicator } from "./BatteryIndicator";
import { WifiIndicator } from "./WifiIndicator";
import { fetchDataConfigs } from "@/query/configs/data";
import { fetchDataLabel } from "@/query/labels/data";

export default async function CardDevice({ device }: { device: Device }) {
    const timeRange = Number(device.heartbeatInterval) + 60000;
    const currentTime = Number(new Date());
    const lastHeartbeat = Number(device.lastheartbeat);
    const online = lastHeartbeat + timeRange > currentTime;

    const label = await fetchDataLabel(device.id);
    const events = await fetchEventsDevice(device?.id || "");
    const configs = await fetchDataConfigs(device?.id);
    const configBattery = configs.find((config) => config.event_name === "battery");
    const configWifi = configs.find((config) => config.event_name === "wifi");

    const batteryEvents: typeof events = [];
    const eventsWithoutBattery: typeof events = [];
    const wifiEvents: typeof events = [];

    for (const event of events) {
        if (event.name === "battery") {
            batteryEvents.push(event);
        } else if (event.name === "wifi") {
            if (wifiEvents.length < 1) wifiEvents.push(event);
        } else {
            eventsWithoutBattery.push(event);
        }
    }

    const currentBattery = Number(batteryEvents[0]?.value ?? 0);
    const previousBattery = Number(batteryEvents[1]?.value ?? currentBattery);
    const charging = currentBattery > previousBattery;
    const wifi = Number(wifiEvents[0]?.value ?? 0);

    const eventsTypes = [...new Set(eventsWithoutBattery.map((e) => e.name))].sort();

    return (
        <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-3 transition-shadow hover:shadow-theme-sm dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                <div className="flex min-w-0 flex-col leading-tight">
                    <h4 className="truncate text-sm font-semibold text-gray-800 dark:text-white">
                        {device.name ?? device.mac}
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {device.type}
                    </span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <span className="whitespace-nowrap text-xs text-gray-400">
                        {Intl.DateTimeFormat("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                        }).format(lastHeartbeat)}
                    </span>

                    <StatusBadge online={online} />

                    {online && (
                        <WifiIndicator rssi={wifi} min={configWifi?.min} max={configWifi?.max} />
                    )}
                    <BatteryIndicator
                        batteryEvents={batteryEvents}
                        charging={charging}
                        min={configBattery?.min}
                        max={configBattery?.max}
                    />
                </div>
            </div>

            {eventsTypes.length === 0 ? (
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    No events received yet.
                </p>
            ) : (
                <div className="mt-3 grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3">
                    {eventsTypes.map((type) => {
                        const eventsOfType = events.filter((event) => event.name === type);
                        const config = configs.find((config) => config.event_name === type);
                        return (
                            <CardEvents
                                key={type}
                                events={eventsOfType}
                                type={type}
                                config={config}
                                label={label}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
