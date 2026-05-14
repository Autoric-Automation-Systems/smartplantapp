import Image from "next/image";
import { InfoIntegrations } from "@/lib/infoIntegrations";

export const Integrations = () => {
    return (
        <section
            id="integrations"
            className="relative w-full overflow-hidden py-20 md:py-28 bg-gradient-to-bl from-gray-50 via-white to-blue-50/40 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20"
        >
            {/* Glows decorativos */}
            <div className="pointer-events-none absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-400/10 dark:bg-blue-500/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-cyan-400/10 dark:bg-cyan-500/10 blur-3xl" />

            <div className="container mx-auto px-4 xl:px-0 relative">
                <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        COMPATIBILIDADE
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                        Integração com <span className="text-blue-600 dark:text-blue-400">CLPs</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
                        Os principais CLPs do mercado são compatíveis com nosso sistema de telemetria
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {InfoIntegrations.map((integration) => (
                        <div key={integration.name} className="group relative">
                            {/* Aura gradiente no hover */}
                            <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-60 blur transition duration-500" />

                            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:-translate-y-1 flex flex-col overflow-hidden h-full">
                                {/* Header: logo da marca */}
                                <div className="flex items-center justify-center h-16 px-6 py-3 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/40 dark:to-gray-800">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={integration.logo}
                                            alt={`Logo ${integration.name}`}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>

                                {/* CLP em destaque */}
                                <div className="flex items-center justify-center px-6 py-8 flex-grow">
                                    <div className="relative w-full h-44 transition-transform duration-500 group-hover:scale-105">
                                        <Image
                                            src={integration.clp}
                                            alt={`CLP ${integration.name}`}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>

                                {/* Nome + selo */}
                                <div className="text-center px-6 pb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        {integration.name}
                                    </h3>
                                    <div className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-700 dark:text-blue-300">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Suporte oficial
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
