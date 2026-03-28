type WifiIndicatorProps = {
  rssi: number // ex: -65
}

export function WifiIndicator({ rssi }: WifiIndicatorProps) {
  // Converte RSSI para nível (0–4)
  const getLevel = () => {
    if (rssi >= -50) return 4
    if (rssi >= -60) return 3
    if (rssi >= -70) return 2
    if (rssi >= -80) return 1
    return 0
  }

  const level = getLevel()

  const getColor = () => {
    if (level >= 3) return "bg-green-500"
    if (level === 2) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="flex items-center gap-2">
      {/* Barras */}
      <div className="flex items-end gap-[2px] h-4">
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className={`w-[3px] rounded-sm ${
              bar <= level ? getColor() : "bg-gray-300 dark:bg-gray-700"
            }`}
            style={{
              height: `${bar * 4}px`,
            }}
          />
        ))}
      </div>

      {/* dBm */}
      {/*
      <span className="text-xs text-gray-500 dark:text-gray-400">
        {rssi} dBm
      </span>
      */}
    </div>
  )
}