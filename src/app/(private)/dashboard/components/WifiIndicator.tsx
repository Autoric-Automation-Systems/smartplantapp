"use client"

import { useState } from "react"

type WifiIndicatorProps = {
  rssi: number // ex: -65
  min?: number // ex: -80
  max?: number // ex: -50
}

export function WifiIndicator({ rssi, min = -80, max = -50 }: WifiIndicatorProps) {
  const [show, setShow] = useState(false)

  // Converte RSSI para nível (0–4)
  const getLevel = () => {
    if (rssi >= max) return 4
    if (rssi >= -60) return 3
    if (rssi >= -70) return 2
    if (rssi >= min) return 1
    return 0
  }

  const level = getLevel()

  const getColor = () => {
    if (level >= 3) return "bg-green-500"
    if (level === 2) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div
      onClick={() => setShow((prev) => !prev)}
      className="relative group flex items-center gap-2">
      {/* Barras */}
      <div className="flex items-end gap-[2px] h-4">
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className={`w-[3px] rounded-sm ${bar <= level ? getColor() : "bg-gray-300 dark:bg-gray-700"
              }`}
            style={{
              height: `${bar * 4}px`,
            }}
          />
        ))}
      </div>

      {/* hover (desktop) */}
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 
        px-2 py-1 text-xs rounded-md 
        bg-gray-800 text-white whitespace-nowrap
        opacity-0 group-hover:opacity-100 transition
      ">
        {rssi} dBm
      </div>

      {/* click (mobile) */}
      {show && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 
          px-2 py-1 text-xs rounded-md 
          bg-gray-800 text-white whitespace-nowrap">
          {rssi} dBm
        </div>
      )}

    </div>
  )
}