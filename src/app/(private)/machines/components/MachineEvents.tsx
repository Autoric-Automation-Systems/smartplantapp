'use client'
import { useEffect, useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import LineChartOne from "./LineChartOne";
import BarChartOne from "./BarChartOne";

export default function MachineEvents({ idmachine }: { idmachine: string }) {

    const [events, setEvents] = useState<any[]>([]);


    useEffect(() => {
        async function loadEvents() {
            const res = await fetch(`/api/machines/${idmachine}/events`, {
                cache: "no-store",
            });

            const data = await res.json();

            setEvents(data);
        }

        let mounted = true;

        async function init() {
            const res = await fetch(`/api/machines/${idmachine}/events`, {
                cache: "no-store",
            });

            const data = await res.json();

            if (mounted) {
                setEvents(data);
            }
        }

        init();

        const interval = setInterval(() => {
            loadEvents();
        }, 10000);

        return () => {
            mounted = false;
            clearInterval(interval);
        };

    }, [idmachine]);

    const eventsTypes: string[] = events.reduce(
        (acc: string[], event) =>
            acc.includes(event.name) ? acc : [...acc, event.name],
        []
    );
    return (
        <ComponentCard title='' className="mb-4">

            {eventsTypes.map((type) => {

                const eventsOfType = events.filter((event) => event.name === type);

                if (!eventsOfType.length) return null;

                const value = Number(eventsOfType[0].value);

                return (
                    <div key={type} className="m4">

                        {(value === 0 || value === 1) &&
                            <BarChartOne events={eventsOfType} />
                        }

                        {(value > 1) &&
                            <LineChartOne events={eventsOfType} />
                        }

                    </div>
                );

            })}

        </ComponentCard>
    );
}