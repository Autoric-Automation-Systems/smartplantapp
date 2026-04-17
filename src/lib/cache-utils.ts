import { unstable_cache } from 'next/cache';

// Cache para dados que raramente mudam (empresa, configurações, etc.)
export function createLongTermCache<T>(
  key: string,
  fetchFn: () => Promise<T>,
  revalidate = 3600 // 1 hora por padrão
) {
  return unstable_cache(
    async () => {
      return await fetchFn();
    },
    [key],
    { revalidate }
  );
}

// Cache para dados que mudam com frequência média (alarms, devices, etc.)
export function createMediumTermCache<T>(
  key: string,
  fetchFn: () => Promise<T>,
  revalidate = 300 // 5 minutos por padrão
) {
  return unstable_cache(
    async () => {
      return await fetchFn();
    },
    [key],
    { revalidate }
  );
}

// Cache para dados em tempo real (atualizações frequentes)
export function createShortTermCache<T>(
  key: string,
  fetchFn: () => Promise<T>,
  revalidate = 60 // 1 minuto por padrão
) {
  return unstable_cache(
    async () => {
      return await fetchFn();
    },
    [key],
    { revalidate }
  );
}

// Cache com tags para invalidação seletiva
export function createTaggedCache<T>(
  key: string,
  tags: string[],
  fetchFn: () => Promise<T>,
  revalidate: number | false = false // false para cache até ser invalidado pela tag
) {
  return unstable_cache(
    async () => {
      return await fetchFn();
    },
    [key, ...tags],
    { revalidate, tags }
  );
}

// Helper para criar cache com parâmetros
export function createParamCache<T, P extends any[]>(
  key: string,
  fetchFn: (...params: P) => Promise<T>,
  revalidate = 300
) {
  return (...params: P) => {
    const paramKey = `${key}-${JSON.stringify(params)}`;
    return unstable_cache(
      async () => {
        return await fetchFn(...params);
      },
      [paramKey],
      { revalidate }
    )();
  };
}

// Exemplo de uso:
/*
// Para dados de empresa (mudam raramente)
const getCachedCompany = createLongTermCache(
  'company-data',
  () => fetchCompanyById(id),
  86400 // 24 horas
);

// Para lista de alarms (muda com frequência)
const getCachedAlarms = createMediumTermCache(
  'alarms-list',
  () => fetchDataAllAlarms(),
  300 // 5 minutos
);

// Para dados com parâmetros
const getCachedDevice = createParamCache(
  'device',
  (deviceId: string) => fetchDeviceById(deviceId),
  600 // 10 minutos
);
*/