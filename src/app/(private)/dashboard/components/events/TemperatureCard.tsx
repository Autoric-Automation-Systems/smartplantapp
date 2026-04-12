import { WiThermometer } from "react-icons/wi"

export default function TemperatureCard({
  value,
  min = 15,
  max = 30,
}: {
  value: number
  min?: number
  max?: number
}) {
  const isHot = value > max
  const isCold = value < min

  const textColor = isHot
    ? "text-red-500"
    : isCold
      ? "text-blue-500"
      : "text-green-500"

  const bgColor = isHot
    ? "from-red-100 to-orange-200 dark:from-red-900 dark:to-orange-900"
    : isCold
      ? "from-blue-100 to-cyan-200 dark:from-blue-900 dark:to-cyan-900"
      : "from-green-100 to-emerald-200 dark:from-green-900 dark:to-emerald-900"

  const percent = Math.min(
    100,
    Math.max(0, ((value - min) / (max - min)) * 100)
  )

  return (
    <div className={`p-4 rounded-xl bg-gradient-to-br ${bgColor}`}>

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-600 dark:text-gray-300 uppercase">
          Temperature
        </span>
        <WiThermometer className={`text-2xl ${textColor}`} />
      </div>

      {/* VALUE */}
      <div className={`text-2xl font-bold ${textColor}`}>
        {value}°C
      </div>

      {/* BAR */}
      <div className="mt-3">
        <div className="w-full h-2 bg-white/40 dark:bg-black/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-current transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="flex justify-between text-[10px] text-gray-500 mt-1">
          <span>{min}°</span>
          <span>{max}°</span>
        </div>
      </div>
    </div>
  )
}