"use client"

import { useState } from "react"

import { Event } from "@/query/events/definitions"

type Segment = { startMs: number; endMs: number; state: number }

export default function StatusTrend({
  events,
}: {
  events: Event[]
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

  const dayStart = new Date(selectedDate)
  dayStart.setHours(0, 0, 0, 0)
  const dayEnd = new Date(dayStart)
  dayEnd.setDate(dayStart.getDate() + 1)

  const now = new Date()
  const isToday = now >= dayStart && now < dayEnd
  const cutoff = isToday ? now.getTime() : dayEnd.getTime()
  const dayMs = dayEnd.getTime() - dayStart.getTime()

  const sorted = [...events].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  )

  const before = sorted.filter((e) => new Date(e.created_at) < dayStart)
  const initialState = before.length ? Number(before[before.length - 1].value) : 0

  const dayEvents = sorted.filter((e) => {
    const t = new Date(e.created_at)
    return t >= dayStart && t < dayEnd
  })

  const segments: Segment[] = []
  let currentState = initialState
  let currentStart = dayStart.getTime()

  for (const ev of dayEvents) {
    const t = new Date(ev.created_at).getTime()
    const newState = Number(ev.value) ? 1 : 0
    if (t > currentStart) {
      segments.push({ startMs: currentStart, endMs: t, state: currentState })
    }
    currentState = newState
    currentStart = t
  }
  if (cutoff > currentStart) {
    segments.push({ startMs: currentStart, endMs: cutoff, state: currentState })
  }

  const totalOnMs = segments
    .filter((s) => s.state === 1)
    .reduce((acc, s) => acc + (s.endMs - s.startMs), 0)

  const elapsedMs = cutoff - dayStart.getTime()
  const pctOn = elapsedMs > 0 ? (totalOnMs / elapsedMs) * 100 : 0

  let activations = 0
  let prevState = initialState
  for (const ev of dayEvents) {
    const v = Number(ev.value) ? 1 : 0
    if (prevState === 0 && v === 1) activations++
    prevState = v
  }

  const lastEvent = dayEvents[dayEvents.length - 1]
  const lastEventLabel = lastEvent
    ? new Date(lastEvent.created_at).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
    : "—"

  function fmtDuration(ms: number) {
    const s = Math.max(0, Math.floor(ms / 1000))
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    return `${h}h ${m}m`
  }

  function fmtTime(ms: number) {
    return new Date(ms).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

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
          <div className="text-xs text-gray-500">ATIVAÇÕES</div>
          <div className="font-bold">{activations}</div>
        </div>

        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
          <div className="text-xs text-gray-500">TEMPO ON</div>
          <div className="font-bold text-emerald-600">{fmtDuration(totalOnMs)}</div>
        </div>

        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
          <div className="text-xs text-gray-500">% ON</div>
          <div className="font-bold">{pctOn.toFixed(1)}%</div>
        </div>

        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
          <div className="text-xs text-gray-500">ÚLT. EVENTO</div>
          <div className="font-bold">{lastEventLabel}</div>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="w-full">
        <div className="relative w-full h-10 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800">
          {segments.map((seg, i) => {
            if (seg.state !== 1) return null
            const left = ((seg.startMs - dayStart.getTime()) / dayMs) * 100
            const width = ((seg.endMs - seg.startMs) / dayMs) * 100
            return (
              <div
                key={i}
                className="absolute top-0 h-full bg-emerald-500"
                style={{ left: `${left}%`, width: `${width}%` }}
                title={`ON: ${fmtTime(seg.startMs)} - ${fmtTime(seg.endMs)}`}
              />
            )
          })}
        </div>

        <div className="flex justify-between mt-1 text-[10px] text-gray-500">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>24:00</span>
        </div>

        <div className="flex items-center justify-end gap-3 mt-2 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-sm bg-emerald-500" />
            ON
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-sm bg-gray-300 dark:bg-gray-700" />
            OFF
          </div>
        </div>
      </div>
    </div>
  )
}
