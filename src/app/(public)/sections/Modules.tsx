import Image from "next/image";
import { InfoModules } from "@/lib/infoModules";

export const Modules = () => {
    return (
        <section id="modules" className="w-full bg-gray-50 dark:bg-gray-900 py-16 md:py-20">
            <div className="container mx-auto px-4 xl:px-0">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Módulos de <span className="text-blue-600 dark:text-blue-400">Telemetria</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                        Sistema modular completo para monitoramento e controle
                    </p>
                    <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                        Fabricação própria
                    </p>
                </div>

                {/* Grid de módulos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {InfoModules.map((module) => (
                        <div
                            key={module.name}
                            className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-500/30 dark:hover:border-blue-400/30 flex flex-col"
                        >
                            {/* Logo centralizado no topo */}
                            <div className="flex justify-center mb-2">
                                <div className="relative w-96 h-48 rounded-xl p-2">
                                    <Image
                                        src={module.logo}
                                        alt={`Logo ${module.name}`}
                                        fill
                                        className="object-contain p-1 rounded-lg group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </div>

                            {/* Nome e sigla centralizados */}
                            <div className="text-center mb-3">
                                <div className="inline-flex items-center gap-2 mb-2">
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{module.name}</span>
                                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                        Módulo
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                    {module.fullName}
                                </h3>
                            </div>

                            {/* Descrição */}
                            <p className="text-gray-600 dark:text-gray-400 mb-6 text-center flex-grow">
                                {module.description}
                            </p>

                            {/* Rodapé centralizado 
                            <div className="flex justify-center pt-4 border-t border-gray-100 dark:border-gray-700">
                                <a
                                    href={`/modules/${module.name.toLowerCase()}`}
                                    className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-1"
                                >
                                    Detalhes do Módulo
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </a>
                            </div>
                            */}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
