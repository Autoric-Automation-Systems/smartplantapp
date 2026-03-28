type BatteryIndicatorProps = {
  value: number
  charging?: boolean
}

export function BatteryIndicator({ value, charging }: BatteryIndicatorProps) {
  const getColor = () => {
    if (value > 60) return "bg-green-500"
    if (value > 30) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="flex items-center gap-2">
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
      {/*
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {value}%
      </span>
      */}
    </div>
  )
}