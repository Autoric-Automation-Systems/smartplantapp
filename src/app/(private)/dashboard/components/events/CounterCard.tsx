export default function CounterCard({ value }: { value: number }) {
  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-center">
      <span className="text-xs text-gray-500 uppercase">Count</span>

      <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
        {value}
      </div>
    </div>
  );
}