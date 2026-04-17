'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Revalidate({
  children,
  interval = 60000, // Aumentado para 60 segundos (1 minuto)
  enabled = false, // Desabilitado por padrão - habilitar apenas onde necessário
}: {
  children: React.ReactNode;
  interval?: number;
  enabled?: boolean;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!enabled) return;
    const intervalId = setInterval(() => {
      router.refresh(); // revalida silenciosamente
    }, interval);

    return () => clearInterval(intervalId);
  }, [router, interval, enabled]);
  return <>{children}</>;
}

