'use client';

import useSWR, { SWRConfiguration } from 'swr';
import { useEffect, useRef, useState, useCallback } from 'react';

// Configuração global do SWR
const swrConfig: SWRConfiguration = {
  revalidateOnFocus: false, // Não revalida quando a janela ganha foco
  revalidateOnReconnect: false, // Não revalida quando reconecta
  dedupingInterval: 60000, // Deduplica requisições por 60 segundos
  focusThrottleInterval: 60000, // Throttle de foco por 60 segundos
  errorRetryCount: 2, // Tenta apenas 2 vezes em caso de erro
};

// Fetcher genérico
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

// Hook para fetch otimizado com cache
export function useOptimizedFetch<T>(
  key: string | null,
  options?: SWRConfiguration
) {
  const mergedOptions = { ...swrConfig, ...options };
  return useSWR<T>(key, fetcher, mergedOptions);
}

// Hook para fetch com debounce (útil para search)
export function useDebouncedFetch<T>(
  key: string | null,
  delay = 300,
  options?: SWRConfiguration
) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [debouncedKey, setDebouncedKey] = useState<string | null>(key);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedKey(key);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [key, delay]);

  return useOptimizedFetch<T>(debouncedKey, options);
}

// Hook para fetch paginado
export function usePaginationFetch<T>(
  baseKey: string,
  page: number,
  limit: number,
  options?: SWRConfiguration
) {
  const key = `${baseKey}?page=${page}&limit=${limit}`;
  return useOptimizedFetch<{ data: T[]; total: number }>(key, options);
}

// Hook para fetch infinito (infinite scroll) - Corrigido para evitar cascading renders
export function useInfiniteFetch<T>(
  baseKey: string,
  pageSize = 20,
  options?: SWRConfiguration
) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { data: response, isLoading, error } = usePaginationFetch<T>(
    baseKey,
    page,
    pageSize,
    options
  );

  // Usar useCallback para evitar recriação da função
  const updateData = useCallback((newData: T[]) => {
    setData(prev => {
      // Evitar duplicação de dados
      const existingIds = new Set(prev.map(item => (item as any).id));
      const uniqueNewData = newData.filter(item =>
        !existingIds.has((item as any).id)
      );
      return [...prev, ...uniqueNewData];
    });
  }, []);

  // Efeito separado para atualização de dados
  useEffect(() => {
    if (response && response.data.length > 0) {
      // Usar requestAnimationFrame para evitar cascading renders
      requestAnimationFrame(() => {
        updateData(response.data);
        setHasMore(response.data.length === pageSize);

        // Marcar que a carga inicial foi concluída
        if (isInitialLoad) {
          setIsInitialLoad(false);
        }
      });
    }
  }, [response, pageSize, updateData, isInitialLoad]);

  const loadMore = useCallback(() => {
    if (hasMore && !isLoading) {
      setPage(prev => prev + 1);
    }
  }, [hasMore, isLoading]);

  const reset = useCallback(() => {
    setPage(1);
    setData([]);
    setHasMore(true);
    setIsInitialLoad(true);
  }, []);

  return {
    data,
    isLoading: isLoading && isInitialLoad,
    error,
    hasMore,
    loadMore,
    reset,
    page,
    isInitialLoad,
  };
}