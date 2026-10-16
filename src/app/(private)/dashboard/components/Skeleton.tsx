/** Esqueleto do dashboard: replica os níveis Planta > Área > Máquina. */
export default function DashboardSkeleton() {
    return (
        <div className="animate-pulse space-y-5" role="status" aria-label="Loading dashboard">
            {[0, 1].map((root) => (
                <div
                    key={root}
                    className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]"
                >
                    <div className="h-4 w-40 rounded-full bg-gray-200 dark:bg-gray-700" />
                    <div className="mt-4 space-y-3 pl-5">
                        {[0, 1].map((area) => (
                            <div
                                key={area}
                                className="rounded-xl border border-gray-100 p-4 dark:border-gray-800/60"
                            >
                                <div className="h-3.5 w-32 rounded-full bg-gray-200 dark:bg-gray-700" />
                                <div className="mt-3 grid grid-cols-1 gap-3 pl-5 2xl:grid-cols-2">
                                    {[0, 1].map((device) => (
                                        <div
                                            key={device}
                                            className="h-28 rounded-xl bg-gray-100 dark:bg-gray-800/60"
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
