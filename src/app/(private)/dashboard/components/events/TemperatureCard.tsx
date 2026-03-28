export default function TemperatureCard({ value, min, max }: { value: number, min: number, max: number }) {
  const color =
    value > (max || 30)
      ? "text-red-500"
      : value < (min || 15)
      ? "text-blue-500"
      : "text-green-500";

  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-orange-100 to-red-100 dark:from-gray-800 dark:to-gray-900 text-center">
      <span className="text-xs text-gray-500 uppercase">Temperature</span>

      <div className={`text-2xl font-bold ${color}`}>
        {value}°C
      </div>
    </div>
  );
}