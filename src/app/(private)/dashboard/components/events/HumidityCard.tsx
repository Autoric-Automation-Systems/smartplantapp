export default function HumidityCard({ value }: { value: number }) {
  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-gray-800 dark:to-gray-900 text-center">
      <span className="text-xs text-gray-500 uppercase">Humidity</span>

      <div className="text-2xl font-bold text-blue-500">
        {value}%
      </div>
    </div>
  );
}