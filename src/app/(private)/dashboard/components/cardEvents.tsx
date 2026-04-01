'use client'

import { Event } from "@/query/events/definitions";
import TemperatureCard from "./events/TemperatureCard";
import HumidityCard from "./events/HumidityCard";
import StatusCard from "./events/StatusCard";
import CounterCard from "./events/CounterCard";
import TemperatureTrend from "./trends/temperatueTrend";
import { useState } from "react";
import { Modal } from "../Modal";

export default function CardEvents({
  events,
  type,
}: {
  events: Event[];
  type: string;
}) {
  const [open, setOpen] = useState(false);

  const value = Number(events[0]?.value ?? 0);

  switch (type) {
    case "temperature":
      const max = 30;
      const min = 18;

      return (
        <>
          {/* CARD */}
          <div onClick={() => setOpen(true)} className="cursor-pointer">
            <TemperatureCard value={value} min={min} max={max} />
          </div>

          {/* MODAL */}
          <Modal open={open} onClose={() => setOpen(false)}>
            <h2 
        className="text-base font-medium text-gray-800 dark:text-white/90 mb-4">
              Temperature Trend
            </h2>

            <TemperatureTrend events={events.slice(0, 100)} />
          </Modal>
        </>
      )

    case "humidity":
      return <HumidityCard value={value} />;

    case "counter":
      return <CounterCard value={value} />;

    default:
      return <StatusCard value={value} type={type} />;
  }
}