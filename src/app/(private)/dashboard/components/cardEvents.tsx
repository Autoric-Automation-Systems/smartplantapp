import { Event } from "@/query/events/definitions";
import TemperatureCard from "./events/TemperatureCard";
import HumidityCard from "./events/HumidityCard";
import StatusCard from "./events/StatusCard";
import CounterCard from "./events/CounterCard";

export default function CardEvents({
  events,
  type,
}: {
  events: Event[];
  type: string;
}) {
  const value = Number(events[0]?.value ?? 0);

  switch (type) {
    case "temperature":
      const max = 30;
      const min = 18;
      return <TemperatureCard value={value} min={min} max={max} />;

    case "humidity":
      return <HumidityCard value={value} />;

    case "counter":
      return <CounterCard value={value} />;

    default:
      return <StatusCard value={value} type={type} />;
  }
}