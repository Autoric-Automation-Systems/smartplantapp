"use client"
import { Event } from "@/query/events/definitions"
import BatteryTrend from "./trends/batteryTrend"
import { useState } from "react"
import { Modal } from "../Modal"
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline"

type BatteryIndicatorProps = {
  batteryEvents: Event[]
  charging?: boolean
  min?: number
  max?: number
}

export function BatteryIndicator({ batteryEvents, charging, min = 20, max = 80 }: BatteryIndicatorProps) {
  const [show, setShow] = useState(false)
  const [open, setOpen] = useState(false)
  if (batteryEvents?.length === 0) return null
  const value = Number(batteryEvents?.[0]?.value ?? 0)

  const getColor = () => {
    if (value > max) return "bg-green-500"
    if (value > min) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div
      className="relative flex items-center cursor-pointer group"
      onClick={() => setShow((prev) => !prev)}
    >
      {/* bateria */}
      <div className="relative w-14 h-6 border-2 rounded-md flex items-center px-[2px] border-gray-400 dark:border-gray-600">
        <div
          className={`h-4 rounded-sm transition-all duration-500 ${getColor()} ${charging ? "animate-pulse" : ""
            }`}
          style={{ width: `${value}%` }}
        />

        <div className="absolute -right-2 w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-sm" />

        {charging && (
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
            ⚡
          </div>
        )}
      </div>

      {/* hover (desktop) */}
      <div className="absolute -top-7 left-1/2 -translate-x-1/2
        px-2 py-1 text-xs rounded-md
        bg-gray-800 text-white whitespace-nowrap
        opacity-0 group-hover:opacity-100 transition
        flex items-center gap-1
      "
        onClick={(e) => { e.stopPropagation(); setOpen(true) }}>
        {value}%
        <ArrowTrendingUpIcon className="w-3.5 h-3.5 text-green-400" />
      </div>

      {/* click (mobile) */}
      {show && (
        <>
          <div className="absolute -top-7 left-1/2 -translate-x-1/2
          px-2 py-1 text-xs rounded-md
          bg-gray-800 text-white whitespace-nowrap
          flex items-center gap-1"
            onClick={(e) => { e.stopPropagation(); setOpen(true) }}>
            {value}%
            <ArrowTrendingUpIcon className="w-3.5 h-3.5 text-green-400" />
          </div>
        </>
      )}
      <Modal open={open} onClose={() => setOpen(false)}>
        <h2
          className="text-base font-medium text-gray-800 dark:text-white/90 mb-4">
          Battery Trend
        </h2>

        <BatteryTrend events={batteryEvents} />
      </Modal>

    </div>
  )
}