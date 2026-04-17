'use client'

import { Event } from "@/query/events/definitions";
import TemperatureCard from "./events/TemperatureCard";
import HumidityCard from "./events/HumidityCard";
import StatusCard from "./events/StatusCard";
import CounterCard from "./events/CounterCard";
import TemperatureTrend from "./trends/temperatueTrend";
import HumidityTrend from "./trends/humidityTrend";
import LevelCard from "./events/LevelCard";
import { useState } from "react";
import { Modal } from "../Modal";
import FlowCard from "./events/FlowCard";
import FlowTrend from "./trends/flowTrend";
import { Config } from "@/query/configs/definitions";
import LevelTrend from "./trends/levelTrend";
import { Label as LabelDefinition } from "@/query/labels/definitions";

export default function CardEvents({
  events,
  type,
  config,
  label
}: {
  events: Event[];
  type: string;
  config: Config | undefined;
  label: LabelDefinition | undefined;
}) {
  const [openTemperature, setOpenTemperature] = useState(false);
  const [openHumidity, setOpenHumidity] = useState(false);
  const [openCounter, setOpenCounter] = useState(false);
  const [openFlow, setOpenFlow] = useState(false);
  const [openLevel, setOpenLevel] = useState(false);

  const value = Number(events[0]?.value ?? 0);
  //console.log('Events for type:  ', events.length);
  //console.log('Type: ', type);
  const max = config?.max ? Number(config.max) : 100;
  const min = config?.min ? Number(config.min) : 0;

  switch (type) {
    case "temperature":
      return (
        <>
          {/* CARD */}
          <div onClick={() => setOpenTemperature(true)} className="cursor-pointer">
            <TemperatureCard value={value} min={min} max={max} />
          </div>

          {/* MODAL */}
          <Modal open={openTemperature} onClose={() => setOpenTemperature(false)}>
            <h2
              className="text-base font-medium text-gray-800 dark:text-white/90 mb-4">
              Temperature Trend
            </h2>

            <TemperatureTrend events={events} />
          </Modal>
        </>
      )

    case "humidity":
      return (
        <>
          <div onClick={() => setOpenHumidity(true)} className="cursor-pointer">
            <HumidityCard value={value} min={min} max={max} />
          </div>

          {/* MODAL */}
          <Modal open={openHumidity} onClose={() => setOpenHumidity(false)}>
            <h2
              className="text-base font-medium text-gray-800 dark:text-white/90 mb-4">
              Humidity Trend
            </h2>

            <HumidityTrend events={events} />
          </Modal>
        </>
      );

    case "count":
      return <CounterCard value={value} label={label?.count} />;

    case "flow":
      const flowMonth = events.reduce((acc, event) => {
        const date = new Date(event.created_at);
        const now = new Date();
        if (date.getMonth() === now.getMonth()) {
          return acc + Number(event.value);
        }
        return acc;
      }, 0);

      return (
        <>
          <div onClick={() => setOpenFlow(true)} className="cursor-pointer">
            <FlowCard value={flowMonth} max={max} />
          </div>
          {/* MODAL */}
          <Modal open={openFlow} onClose={() => setOpenFlow(false)}>
            <h2
              className="text-base font-medium text-gray-800 dark:text-white/90 mb-4">
              Flow Trend
            </h2>

            <FlowTrend startHour={0} events={events} />
          </Modal>

        </>
      );

    case "level":
      return (
        <>
          <div onClick={() => setOpenLevel(true)} className="cursor-pointer">
            <LevelCard value={value} min={min} max={max} />
          </div>

          {/* MODAL */}
          <Modal open={openLevel} onClose={() => setOpenLevel(false)}>
            <h2
              className="text-base font-medium text-gray-800 dark:text-white/90 mb-4">
              Level Trend
            </h2>

            <LevelTrend events={events} />
          </Modal>
        </>
      );

    default:
      return <StatusCard value={value} type={type} label={label} />;
  }
}