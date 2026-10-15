"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

import { Event } from "@/query/events/definitions"

export default function CounterTrend({
  events,
  startHour = 0,
}: {
  events: Event[]
  startHour?: number
}) {

  const [selectedDate, setSelectedDate] = useState(new Date())

  function changeDay(offset: number) {
    const newDate = new Date(selectedDate)
    newDate.setDate(selectedDate.getDate() + offset)
    setSelectedDate(newDate)
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const newDate = new Date(e.target.value)
    setSelectedDate(newDate)
  }

  const filtered = events.filter((e) => {
    const d = new Date(e.created_at)
    return d.toDateString() === selectedDate.toDateString()
  })

  const hours = Array.from({ length: 24 }, (_, i) => {
    const h = (startHour + i) % 24
    return {
      hour: h,
      label: `${h.toString().padStart(2, "0")}:00`,
      value: 0,
    }
  })

  filtered.forEach((e) => {
    const date = new Date(e.created_at)
    const hour = date.getHours()

    const index = hours.findIndex((h) => h.hour === hour)

    if (index !== -1) {
      hours[index].value += Number(e.value)
    }
  })

  const data = hours

  const values = data.map((d) => d.value)

  const total = values.reduce((acc, v) => acc + v, 0)
  const avg = total / 24
  const max = Math.max(...values)
  const min = Math.min(...values)

  return (
    <div className="flex flex-col gap-4">

      {/* DATE CONTROL */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={() => changeDay(-1)}
          className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700"
        >
          ←
        </button>

        <input
          type="date"
          value={selectedDate.toISOString().split("T")[0]}
          onChange={handleInput}
          className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm"
        />

        <button
          onClick={() => changeDay(1)}
          className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700"
        >
          →
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
          <div className="text-xs text-gray-500">TOTAL</div>
          <div className="font-bold">{total}</div>
        </div>

        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
          <div className="text-xs text-gray-500">AVG/H</div>
          <div className="font-bold">{avg.toFixed(1)}</div>
        </div>

        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
          <div className="text-xs text-gray-500">MIN</div>
          <div className="font-bold text-emerald-500">{min}</div>
        </div>

        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
          <div className="text-xs text-gray-500">MAX</div>
          <div className="font-bold text-emerald-700">{max}</div>
        </div>
      </div>

      {/* CHART */}
      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="label" tick={{ fontSize: 10 }} />
            <YAxis allowDecimals={false} />

            <Tooltip
              formatter={(value: any) => `${Number(value)}`}
              labelFormatter={(label) => `Hora: ${label}`}
              contentStyle={{
                backgroundColor: "#111",
                border: "none",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#aaa" }}
            />

            <Bar
              dataKey="value"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
