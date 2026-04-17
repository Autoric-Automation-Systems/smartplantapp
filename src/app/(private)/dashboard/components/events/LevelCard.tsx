import { WiHumidity } from "react-icons/wi"
import { LuGlassWater } from "react-icons/lu";
export default function LevelCard({
  value,
  min = 50,
  max = 90,
}: {
  value: number,
  min?: number,
  max?: number,
}) {
  const isHigh = value > max
  const isLow = value < min

  const textColor = isHigh
    ? "text-blue-600"
    : isLow
      ? "text-yellow-500"
      : "text-cyan-500"

  const bgColor = isHigh
    ? "from-blue-100 to-indigo-200 dark:from-blue-900 dark:to-indigo-900"
    : isLow
      ? "from-yellow-100 to-orange-200 dark:from-yellow-900 dark:to-orange-900"
      : "from-cyan-100 to-blue-200 dark:from-cyan-900 dark:to-blue-900"

  const percent = Math.min(100, Math.max(0, value))

  return (
    <div className={`p-4 rounded-xl bg-gradient-to-br ${bgColor}`}>

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-600 dark:text-gray-300 uppercase">
          lEVEL
        </span>
        <LuGlassWater className={`text-2xl ${textColor}`} />
      </div>

      {/* VALUE */}
      <div className={`text-2xl font-bold ${textColor}`}>
        {value}%
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
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  )
}