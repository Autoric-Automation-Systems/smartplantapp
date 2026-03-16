import { fetchCounts } from "@/query/counts/data";
import ComponentCard from "@/components/common/ComponentCard";
import CardCounts from "./cardCounts";
import { fetchEvents } from "@/query/events/data";
import CardEvents from "./cardEvents";

export default async function CardMachine({ idmachine }: { idmachine: string }) {
    const counts = await fetchCounts(idmachine);
    const types = counts.reduce((acc, count) => acc.includes(count.tag) ? acc : [...acc, count.tag], [] as string[]);
    const typesOrderedAlphabetically = types.sort();
    const events = await fetchEvents(idmachine);
    const eventsTypes = events.reduce((acc, event) => acc.includes(event.event) ? acc : [...acc, event.event], [] as string[]);
    const eventsTypesOrderedAlphabetically = eventsTypes.sort();

    return (
        <div className="flex flex-wrap">
            {eventsTypesOrderedAlphabetically.map((type) => {
                const eventsOfType = events.filter((event) => event.event === type);
                return (
                    <CardEvents key={type} events={eventsOfType} type={type} />
                )
            })}
        </div>
    )
}