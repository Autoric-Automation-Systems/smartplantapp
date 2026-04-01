"use client"

import { useState } from "react"

type BatteryIndicatorProps = {
  value: number
  charging?: boolean
}

export function BatteryIndicator({ value, charging }: BatteryIndicatorProps) {
  const [show, setShow] = useState(false)

  const getColor = () => {
    if (value > 60) return "bg-green-500"
    if (value > 30) return "bg-yellow-500"
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
          className={`h-4 rounded-sm transition-all duration-500 ${getColor()} ${
            charging ? "animate-pulse" : ""
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
      ">
        {value}%
      </div>

      {/* click (mobile) */}
      {show && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 
          px-2 py-1 text-xs rounded-md 
          bg-gray-800 text-white whitespace-nowrap">
          {value}%
        </div>
      )}
    </div>
  )
}