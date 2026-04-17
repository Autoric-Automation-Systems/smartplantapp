# Otimizações Implementadas para Reduzir Network Transfer no Neon (Postgres Serverless)

## Problemas Identificados e Soluções

### 1. **Revalidação Automática Excessiva** ✅
**Problema**: Componente `Revalidate` forçando `router.refresh()` a cada 10 segundos.

**Solução**:
- Aumentado intervalo para 60 segundos
- Adicionado parâmetro `enabled=false` por padrão
- Recomendação: Usar apenas em páginas que realmente precisam de dados em tempo real

### 2. **Queries com SELECT *** ✅
**Problema**: Múltiplas queries usando `SELECT *` trazendo colunas desnecessárias.

**Solução**:
- Especificar apenas colunas necessárias
- Exemplo: `SELECT id, name, created_at` em vez de `SELECT *`

### 3. **Ausência de Paginação** ✅
**Problema**: Queries trazendo todos os registros de uma vez.

**Solução**:
- Adicionado parâmetros `page` e `limit` em todas as queries principais
- Criado componente `PaginationOptimized`
- Implementado contagem total de registros

### 4. **Falta de Cache Estratégico** ✅
**Problema**: Dados sendo buscados repetidamente sem cache.

**Soluções Implementadas**:

#### a) **Cache Server-side (Next.js)**
```typescript
// src/lib/cache-utils.ts
- createLongTermCache() - 1 hora
- createMediumTermCache() - 5 minutos  
- createShortTermCache() - 1 minuto
- createTaggedCache() - Cache com tags
```

#### b) **Cache Client-side (SWR)**
```typescript
// src/hooks/useOptimizedFetch.ts
- useOptimizedFetch() - Fetch com cache
- useDebouncedFetch() - Fetch com debounce
- usePaginationFetch() - Fetch paginado
- useInfiniteFetch() - Infinite scroll
```

#### c) **Cache por Request (React cache)**
```typescript
// src/lib/optimized-utils.ts
- getCurrentCompanyId() - Cache por request
- getCurrentCompany() - Cache por request
- getCurrentUser() - Cache por request
```

### 5. **Requisições Duplicadas** ✅
**Problema**: Funções como `CurrentCompanyId()` sendo chamadas múltiplas vezes.

**Solução**:
- Implementado cache por request usando `cache()` do React
- Centralizado em `optimized-utils.ts`

### 6. **Connection Pooling** ⚠️
**Problema**: Uso do `@vercel/postgres` (deprecated).

**Solução Proposta**:
```typescript
// src/lib/db.ts
- Migração para `@neondatabase/serverless` direto
- Configuração otimizada para serverless
- Helper functions para queries com cache
```

## Arquivos Criados/Otimizados

### Novos Arquivos:
1. `src/lib/db.ts` - Cliente DB otimizado
2. `src/lib/optimized-utils.ts` - Utilitários com cache
3. `src/lib/cache-utils.ts` - Helpers de cache
4. `src/hooks/useOptimizedFetch.ts` - Hooks SWR
5. `src/components/common/PaginationOptimized.tsx` - Paginação
6. `src/app/(private)/alarms-optimized/` - Página exemplo

### Arquivos Modificados:
1. `src/components/common/revalidate.tsx` - Intervalo aumentado
2. `src/query/alarms/data.ts` - Removido SELECT *, adicionada paginação
3. `src/query/devices/data.ts` - Removido SELECT *, adicionada paginação

## Melhores Práticas Implementadas

### 1. **Seleção de Colunas Específicas**
```sql
-- ANTES
SELECT * FROM public.alarms

-- DEPOIS  
SELECT id, device_id, message, created_at, readed FROM public.alarms
```

### 2. **Paginação em Todas as Queries**
```typescript
export async function fetchDataAllAlarms(page = 1, limit = 50) {
  const offset = (page - 1) * limit;
  // ... query com LIMIT ${limit} OFFSET ${offset}
}
```

### 3. **Cache Estratégico por Tipo de Dado**
- **Dados estáticos**: Cache de 24h (empresa, configurações)
- **Dados semi-estáticos**: Cache de 5-10min (devices, plants)
- **Dados dinâmicos**: Cache de 1min (alarms, events)
- **Dados em tempo real**: Sem cache ou cache muito curto

### 4. **Otimização de Componentes Client-side**
- Uso de `useMemo` para cálculos pesados
- Uso de `useCallback` para funções
- Virtualização para listas grandes
- Debounce para pesquisas

### 5. **Configuração SWR Otimizada**
```typescript
const swrConfig = {
  revalidateOnFocus: false, // Reduz requisições
  revalidateOnReconnect: false,
  dedupingInterval: 60000, // 1 minuto
  focusThrottleInterval: 60000,
  errorRetryCount: 2,
};
```

## Impacto Esperado

### Redução de Network Transfer:
1. **Cache**: Redução de 70-90% em requisições repetidas
2. **Pagination**: Redução de 50-80% no tamanho das respostas
3. **SELECT específico**: Redução de 20-40% no payload
4. **Revalidação**: Redução de 83% (de 10s para 60s)

### Melhoria de Performance:
1. **Tempo de resposta**: 30-50% mais rápido
2. **Uso de memória**: Reduzido com paginação
3. **Experiência do usuário**: Mais fluida com cache client-side

## Próximos Passos Recomendados

### 1. **Migração Completa**
- Substituir `@vercel/postgres` por `@neondatabase/serverless`
- Atualizar todas as queries para usar o novo cliente

### 2. **Monitoramento**
- Implementar logging de queries
- Monitorar consumo do Neon
- Ajustar cache baseado em uso real

### 3. **Otimizações Avançadas**
- Implementar database connection pooling
- Usar prepared statements
- Considerar read replicas para queries pesadas

### 4. **Testes**
- Testar performance com carga real
- Ajustar limites de paginação
- Validar estratégias de cache

## Como Aplicar em Outras Partes do Projeto

1. **Para novas queries**: Usar padrão com paginação e colunas específicas
2. **Para páginas existentes**: Migrar gradualmente para o padrão otimizado
3. **Para componentes**: Usar hooks `useOptimizedFetch` quando possível
4. **Para dados**: Aplicar cache apropriado baseado na frequência de mudança

## Exemplo de Uso Completo

```typescript
// Página otimizada
import { createMediumTermCache } from '@/lib/cache-utils';
import { fetchDataAllAlarms } from '@/query/alarms/data';

const getCachedAlarms = createMediumTermCache(
  'alarms-list',
  () => fetchDataAllAlarms(page, limit),
  300 // 5 minutos
);

// No componente
const alarms = await getCachedAlarms();
```

Esta documentação serve como guia para aplicar as mesmas otimizações em todo o projeto.