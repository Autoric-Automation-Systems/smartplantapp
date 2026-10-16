export default function MachineSkeleton() {
    return (
        <div className="animate-pulse space-y-4" role="status" aria-label="Loading machine">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="h-4 w-40 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div className="mt-4 h-52 rounded-xl bg-gray-100 dark:bg-gray-800/60" />
            </div>
        </div>
    );
}
