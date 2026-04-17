'use client';

import { SWRConfig } from 'swr';

// Configuração global do SWR
const swrConfig = {
  // Não revalida automaticamente
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  
  // Configurações de cache
  dedupingInterval: 60000, // 1 minuto
  focusThrottleInterval: 60000, // 1 minuto
  
  // Tratamento de erros
  errorRetryCount: 2,
  errorRetryInterval: 5000, // 5 segundos
  
  // Configurações de performance
  keepPreviousData: true,
  revalidateIfStale: false,
  
  // Fetcher padrão
  fetcher: async (url: string) => {
    const res = await fetch(url);
    
    if (!res.ok) {
      const error = new Error('Failed to fetch data');
      // @ts-ignore
      error.status = res.status;
      throw error;
    }
    
    return res.json();
  },
};

interface SWRProviderProps {
  children: React.ReactNode;
}

export default function SWRProvider({ children }: SWRProviderProps) {
  return (
    <SWRConfig value={swrConfig}>
      {children}
    </SWRConfig>
  );
}