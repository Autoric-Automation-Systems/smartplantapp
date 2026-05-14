import Image from "next/image";
import temperatureTrend from "../../../../public/images/trends/temperatureTrend.png";
import statusTrend from "../../../../public/images/trends/statusTrend.png";

export const Trends = () => {
    return (
        <section
            id="trends"
            className="relative w-full overflow-hidden py-20 md:py-28 bg-gradient-to-br from-white via-blue-50/40 to-white dark:from-gray-950 dark:via-blue-950/10 dark:to-gray-950"
        >
            {/* Glows decorativos */}
            <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-400/10 dark:bg-blue-500/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-cyan-400/10 dark:bg-cyan-500/10 blur-3xl" />

            <div className="container mx-auto px-4 xl:px-0 relative">
                <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        ANALYTICS
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                        Acompanhe as tendências do seu{" "}
                        <span className="text-blue-600 dark:text-blue-400">processo</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
                        Dados históricos em tempo real para decisões mais rápidas e seguras
                    </p>
                </div>

                <div className="flex flex-col gap-20 md:gap-28">
                    {/* Tendências analógicas */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Tendências analógicas
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
                                Visualize o comportamento de variáveis como{" "}
                                <span className="font-semibold text-blue-600 dark:text-blue-400">temperatura, pressão e nível</span>{" "}
                                ao longo do tempo, com curvas precisas e leitura imediata.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Zoom em períodos específicos, comparação entre intervalos e exportação dos dados para análises mais profundas — tudo em uma única tela.
                            </p>
                        </div>
                        <div className="order-1 lg:order-2 relative group">
                            <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-200 dark:ring-gray-800 bg-white dark:bg-gray-900 transform group-hover:-translate-y-1 transition-transform duration-300">
                                {/* Browser chrome */}
                                <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                                    <div className="w-3 h-3 rounded-full bg-red-400" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                    <div className="w-3 h-3 rounded-full bg-green-400" />
                                </div>
                                <div className="relative w-full aspect-[16/9]">
                                    <Image
                                        src={temperatureTrend}
                                        alt="Gráfico de tendência de temperatura"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Histórico de status */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        <div className="order-1 relative group">
                            <div className="absolute -inset-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-200 dark:ring-gray-800 bg-white dark:bg-gray-900 transform group-hover:-translate-y-1 transition-transform duration-300">
                                <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                                    <div className="w-3 h-3 rounded-full bg-red-400" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                    <div className="w-3 h-3 rounded-full bg-green-400" />
                                </div>
                                <div className="relative w-full aspect-[16/9]">
                                    <Image
                                        src={statusTrend}
                                        alt="Gráfico de histórico de status"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="order-2">
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Histórico de status
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
                                Acompanhe a evolução de{" "}
                                <span className="font-semibold text-blue-600 dark:text-blue-400">estados digitais e eventos</span>{" "}
                                do processo, identificando rapidamente paradas, alarmes e transições críticas.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Linha do tempo clara e contínua, permitindo correlacionar eventos com as variáveis analógicas e diagnosticar a causa raiz de qualquer ocorrência.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
