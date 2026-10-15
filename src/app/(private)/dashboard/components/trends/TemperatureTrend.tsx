"use client"

import { useState } from "react"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts"

import { Event } from "@/query/events/definitions"
import { formatDateTimeDb, formatDateToLocal, formatDateToTimeDb, formatTime, timeToDecimal } from "@/lib/formatTime"

export default function TemperatureTrend({ events }: { events: Event[] }) {

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
    // 🔥 filtra por dia
    const filtered = events.filter((e) => {
        const d = new Date(e.created_at)
        return d.toDateString() === selectedDate.toDateString()
    })

    // ordena do mais antigo → mais recente
    const data = [...filtered]
        .slice(0, 100)
        .reverse()
        .map((e) => {
            return {
                value: Number(e.value),
                time: new Date(e.created_at).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                fullTime: new Date(e.created_at).toLocaleString("pt-BR"),
            }
        })

    const values = data.map((d) => d.value)

    const avg =
        values.reduce((acc, v) => acc + v, 0) / (values.length || 1)

    const min = Math.min(...values)
    const max = Math.max(...values)

    const trend =
        values.length > 1
            ? values[values.length - 1] - values[0]
            : 0

    return (
        <div className="flex flex-col gap-4">
            {/* 🔥 DATE CONTROL */}
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

            {/* 📊 STATS */}
            <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <div className="text-xs text-gray-500">AVG</div>
                    <div className="font-bold">{avg.toFixed(1)}°C</div>
                </div>

                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <div className="text-xs text-gray-500">MIN</div>
                    <div className="font-bold text-blue-500">{min}°C</div>
                </div>

                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <div className="text-xs text-gray-500">MAX</div>
                    <div className="font-bold text-red-500">{max}°C</div>
                </div>

                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <div className="text-xs text-gray-500">TREND</div>
                    <div
                        className={`font-bold ${trend > 0
                            ? "text-red-500"
                            : trend < 0
                                ? "text-blue-500"
                                : "text-gray-500"
                            }`}
                    >
                        {trend > 0 ? "↑" : trend < 0 ? "↓" : "-"}{" "}
                        {trend.toFixed(1)}°C
                    </div>
                </div>
            </div>

            {/* 📈 CHART */}
            <div className="w-full h-56">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                        <YAxis />

                        <Tooltip
                            formatter={(value: any) => `${Number(value)}°C`} labelFormatter={(label, payload) =>
                                payload?.[0]?.payload?.fullTime || label
                            }
                            contentStyle={{
                                backgroundColor: "#111",
                                border: "none",
                                borderRadius: "8px",
                            }}
                            labelStyle={{ color: "#aaa" }}
                        />

                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}