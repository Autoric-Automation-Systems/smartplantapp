import Image from "next/image";
import React from "react";

export default function GridShape() {
  return (
    <>
      {/* Grid superior direito */}
      <div className="absolute right-0 top-0 -z-10 w-full max-w-[200px] sm:max-w-[250px] xl:max-w-[400px] 2xl:max-w-[450px]">
        <div className="relative aspect-[540/254] w-full">
          <Image
            src="/images/shape/grid-01.svg"
            alt="Background grid pattern decorative element"
            fill
            className="object-contain"
            sizes="(max-width: 640px) 200px, (max-width: 1280px) 250px, 400px"
            priority={false}
            loading="lazy"
          />
        </div>
      </div>

      {/* Grid inferior esquerdo (rotacionado) */}
      <div className="absolute bottom-0 left-0 -z-10 w-full max-w-[200px] sm:max-w-[250px] xl:max-w-[400px] 2xl:max-w-[450px]">
        <div className="relative aspect-[540/254] w-full rotate-180">
          <Image
            src="/images/shape/grid-01.svg"
            alt="Background grid pattern decorative element rotated"
            fill
            className="object-contain"
            sizes="(max-width: 640px) 200px, (max-width: 1280px) 250px, 400px"
            priority={false}
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
}

