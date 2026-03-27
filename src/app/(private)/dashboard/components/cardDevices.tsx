import { Device } from "@/query/devices/definitions";
import { fetchEvents, fetchEventsDevice } from "@/query/events/data";
import ComponentCard from "@/components/common/ComponentCard";
import CardEvents from "./cardEvents";

export default async function CardDevices({ device }: { device: Device }) {
    const timeRange = 2 * 60 * 1000;
    const currentTime = Number(new Date());
    const lastHeartbeat = Number(device.lastheartbeat);
    const online = lastHeartbeat + timeRange > currentTime;

    const events = await fetchEventsDevice(device?.id || '');

    const eventsTypes = events.reduce(
        (acc, event) => acc.includes(event.event) ? acc : [...acc, event.event],
        [] as string[]
    );

    const eventsTypesOrderedAlphabetically = eventsTypes.sort();

    return (
        <ComponentCard className="p-4 flex flex-col gap-4 shadow-md rounded-2xl mb-4" title={device.name}>

            {/* HEADER */}
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Events
                </h2>

                <span className={`px-3 py-1 text-sm rounded-full font-medium
                    ${online
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"}
                `}>
                    {online ? "ONLINE" : "OFFLINE"}
                </span>
            </div>

            {/* EVENTS */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {eventsTypesOrderedAlphabetically.map((type) => {
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

        </ComponentCard>
    );
}