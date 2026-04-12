import { FaWater } from "react-icons/fa"

export default function FlowCard({
  value,
  max = 1000, // referência visual (ex: meta do dia em litros)
}: {
  value: number
  max?: number
}) {

  const percent = Math.min(100, Math.max(0, (value / max) * 100))

  const isLow = value < max * 0.3
  const isMedium = value >= max * 0.3 && value < max * 0.7
  const isHigh = value >= max * 0.7

  const textColor = isHigh
    ? "text-blue-700"
    : isMedium
    ? "text-blue-500"
    : "text-blue-300"

  const bgColor = isHigh
    ? "from-blue-200 to-blue-400 dark:from-blue-900 dark:to-blue-700"
    : isMedium
    ? "from-cyan-100 to-blue-200 dark:from-cyan-900 dark:to-blue-800"
    : "from-gray-100 to-blue-100 dark:from-gray-800 dark:to-blue-900"

  return (
    <div className={`p-4 rounded-xl bg-gradient-to-br ${bgColor}`}>

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-600 dark:text-gray-300 uppercase">
          Month Flow
        </span>
        <FaWater className={`text-xl ${textColor}`} />
      </div>

      {/* VALUE */}
      <div className={`text-2xl font-bold ${textColor}`}>
        {value} L
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
          <span>0</span>
          <span>{max}L</span>
        </div>
      </div>
    </div>
  )
}