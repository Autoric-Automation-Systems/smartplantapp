import Image from "next/image";
import mobile1 from "../../../../public/images/mobile/mobile_1.png";
import mobile2 from "../../../../public/images/mobile/mobile_2.png";

const features = [
    {
        title: "Tempo real, sempre",
        description: "Veja humidade, temperatura, vazão e status dos equipamentos atualizando em tempo real, direto do CLP.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
    },
    {
        title: "Multi-equipamento",
        description: "Acompanhe vários ativos em um único dashboard, organizados por planta, linha ou área.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
        ),
    },
    {
        title: "Status e alarmes",
        description: "Identifique imediatamente equipamentos offline, em alarme ou em modo manual com indicadores visuais claros.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
        ),
    },
];

export const Mobile = () => {
    return (
        <section
            id="mobile"
            className="relative w-full overflow-hidden py-20 md:py-28 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-950 dark:via-blue-950/20 dark:to-gray-950"
        >
            {/* Glow decorativo */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-400/10 dark:bg-blue-500/10 blur-3xl" />

            <div className="container mx-auto px-4 xl:px-0 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Lado esquerdo: texto + features */}
                    <div>
                        <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                            APP RESPONSIVO
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                            Sua planta na palma da{" "}
                            <span className="text-blue-600 dark:text-blue-400">mão</span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10">
                            Acompanhe o processo de qualquer lugar, com a mesma experiência rica do desktop adaptada para o seu celular.
                        </p>

                        <ul className="space-y-6">
                            {features.map((feature) => (
                                <li key={feature.title} className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center shadow-md">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Lado direito: celulares sobrepostos */}
                    <div className="relative h-[520px] md:h-[600px] flex items-center justify-center">
                        {/* Celular 2 — atrás, deslocado pra direita e abaixo */}
                        <div className="absolute right-2 sm:right-8 lg:right-0 bottom-0 w-[200px] sm:w-[240px] md:w-[280px] aspect-[9/19] transform rotate-6 transition-transform duration-500 hover:rotate-3">
                            <div className="absolute inset-0 rounded-[2.5rem] bg-blue-500/20 blur-2xl" />
                            <Image
                                src={mobile2}
                                alt="Tela do app mostrando vazão mensal e status de produção"
                                fill
                                className="object-contain relative drop-shadow-2xl"
                            />
                        </div>

                        {/* Celular 1 — na frente, deslocado pra esquerda e acima */}
                        <div className="absolute left-2 sm:left-8 lg:left-0 top-0 w-[220px] sm:w-[260px] md:w-[300px] aspect-[9/19] transform -rotate-6 transition-transform duration-500 hover:-rotate-3">
                            <div className="absolute inset-0 rounded-[2.5rem] bg-cyan-500/20 blur-2xl" />
                            <Image
                                src={mobile1}
                                alt="Tela do app mostrando humidade e temperatura em tempo real"
                                fill
                                className="object-contain relative drop-shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
