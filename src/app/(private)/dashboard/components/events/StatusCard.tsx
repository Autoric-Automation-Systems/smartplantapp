export default function StatusCard({
  value,
  type,
}: {
  value: number;
  type: string;
}) {
  const isBinary = value === 0 || value === 1;
  const isOn = value === 1;

  const bg = isBinary
    ? isOn
      ? "bg-green-100 dark:bg-green-900"
      : "bg-red-100 dark:bg-red-900"
    : "bg-gray-100 dark:bg-gray-800";

  const text = isBinary
    ? isOn
      ? "text-green-700 dark:text-green-300"
      : "text-red-700 dark:text-red-300"
    : "text-gray-700 dark:text-gray-300";

  return (
    <div className={`p-4 rounded-xl text-center ${bg}`}>
      <span className="text-xs text-gray-500 uppercase">
        {type}
      </span>

      <div className={`text-xl font-bold ${text}`}>
        {isBinary ? (isOn ? "ON" : "OFF") : value}
      </div>
    </div>
  );
}