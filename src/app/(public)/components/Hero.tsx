import Image from "next/image";
import heroImg from "../../../../public/images/hero/hero.png";
import logoSPPS from "../../../../public/images/logo/logo_SP-PS.png";
import logoSPTH from "../../../../public/images/logo/logo_SP-TH.png";
import logoSPTL from "../../../../public/images/logo/logo_SP-TL.png";
import logoSPFF from "../../../../public/images/logo/logo_SP-FF.png";
import logoSPIS from "../../../../public/images/logo/logo_SP-IS.png";

export const Hero = () => {
  const modules = [
    {
      name: "SP-PS",
      fullName: "Smart Plant Production States",
      description: "Monitoramento de estados e contagem de produção",
      logo: logoSPPS,
    },
    {
      name: "SP-TH",
      fullName: "Smart Plant Temperature Humidity",
      description: "Controle de temperatura e umidade em ambientes controlados",
      logo: logoSPTH,
    },
    {
      name: "SP-TL",
      fullName: "Smart Plant Tank Level",
      description: "Monitoramento de nível de tanques e reservatórios",
      logo: logoSPTL,
    },
    {
      name: "SP-FF",
      fullName: "Smart Plant Fluid Flow",
      description: "Medição e controle de fluxo de fluidos",
      logo: logoSPFF,
    },
    {
      name: "SP-IS",
      fullName: "Smart Plant Inspection System",
      description: "Sistema de inspeção por imagem",
      logo: logoSPIS,
    }
  ];

  return (
    <>
      {/* Seção Hero com imagem industrial */}
      <section className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden bg-gradient-to-br from-gray-900 to-black">
        <div className="absolute inset-0 opacity-40">
          <Image
            src={heroImg}
            alt="Smart Plant App - Telemetria Industrial"
            fill
            priority
            sizes="100vw"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Overlay industrial */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/70 to-transparent" />

        {/* Conteúdo sobre a imagem */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 xl:px-0">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                <span className="text-blue-400">Smart</span> Plant{" "}
                <span className="text-green-400">APP</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 mb-6 md:mb-8 leading-relaxed">
                Sistema integrado de <span className="font-semibold text-blue-300">telemetria</span> para plantas residenciais, comerciais e industriais
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/signin"
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-center">
                  Acessar Plataforma
                </a>

                <a
                  href="#modules"
                  className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 text-center">
                  Ver Módulos
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Indicador scroll */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Seção de Módulos */}
      <section id="modules" className="w-full bg-gray-50 dark:bg-gray-900 py-16 md:py-20">
        <div className="container mx-auto px-4 xl:px-0">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Módulos de <span className="text-blue-600 dark:text-blue-400">Telemetria</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Sistema modular completo para monitoramento e controle
            </p>
          </div>

          {/* Grid de módulos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module) => (
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
                      className="object-contain p-1"
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

                {/* Rodapé centralizado */}
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
              </div>
            ))}
          </div>

          {/* CTA Final */}
          <div className="mt-16 text-center">
            <div className="max-w-2xl mx-auto bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-8 md:p-10 border border-blue-100 dark:border-blue-800/30">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Plataforma Completa para Engenharia
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Integre todos os módulos em uma única solução para gestão completa de plantas residenciais, comerciais e industriais.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Solicitar Demonstração
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};