type StatusBadgeProps = {
  online: boolean
}

export function StatusBadge({ online }: StatusBadgeProps) {
  return (
    <div className="flex items-center gap-2">

      {/* Label */}
      {!online ? (
        <span
          className={`px-3 py-1 text-sm rounded-full font-medium transition-all
        ${online
              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
              : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
            }
      `}
        >
          {online ? "ONLINE" : "OFFLINE"}
        </span>
      ) : (

        <span
          className={`w-2.5 h-2.5 rounded-full
        ${online ? "bg-green-500 animate-pulse" : "bg-red-500"}
      `}
        />

      )}

    </div>
  )
}