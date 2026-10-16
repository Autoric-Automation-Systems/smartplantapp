export default function CounterCard({ value, label }: { value: number; label: string | undefined; }) {
  return (
    <div className="min-w-0 p-3 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 text-center dark:from-gray-800 dark:to-gray-900 sm:p-4">
      <span className="text-xs text-gray-500 uppercase">{label || "Count"}</span>

      <div className="break-words text-lg font-bold leading-tight tabular-nums text-gray-800 dark:text-gray-200 sm:text-2xl">
        {value}
      </div>
    </div>
  );
}