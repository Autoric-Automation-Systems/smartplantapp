import Image from "next/image";
import heroMobile from "../../../../public/images/hero/hero_mobile.png";
import heroDesktop from "../../../../public/images/hero/hero_desktop.png";

export const Hero = () => {

  return (
    <>
      {/* Seção Hero com imagem industrial */}
      <section className="relative w-full h-screen md:h-[85vh] overflow-hidden bg-gradient-to-br from-gray-900 to-black">
        <div className="absolute inset-0 opacity-40 md:hidden">
          <Image
            src={heroMobile}
            alt="Smart Plant App - Telemetria Industrial"
            fill
            priority
            sizes="100vw"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 opacity-40 hidden md:block">
          <Image
            src={heroDesktop}
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

    </>
  );
};