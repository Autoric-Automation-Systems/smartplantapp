# Guia de Migração para Otimizações do Neon

## 📋 **Status Atual**

✅ **Otimizações Implementadas:**
1. Cache multi-nível (server-side, client-side, request-level)
2. Queries otimizadas (sem SELECT *, com paginação)
3. Hooks SWR para cache client-side
4. Componentes otimizados
5. TypeScript corrigido

⚠️ **Pendente:**
1. Migração de `@vercel/postgres` para `@neondatabase/serverless`
2. Atualização de todos os arquivos existentes

## 🚀 **Plano de Migração Passo a Passo**

### Fase 1: Preparação (15 minutos)
1. **Instalar dependências adicionais:**
   ```bash
   npm install swr
   ```

2. **Verificar configurações do Neon:**
   - Confirmar que `DATABASE_URL` está configurada no `.env.local`
   - Testar conexão com o banco

### Fase 2: Migração Gradual (Recomendado)

#### Opção A: Migração por Módulo (Recomendado)
1. **Começar pelo módulo de Alarms:**
   ```bash
   # 1. Atualizar imports em alarms
   sed -i 's/from .@vercel.postgres./from .@\/lib.db./g' src/query/alarms/*
   
   # 2. Testar página de alarms
   # 3. Se funcionar, prosseguir para próximo módulo
   ```

2. **Ordem sugerida:**
   - alarms → devices → machines → plants → companies → users

#### Opção B: Migração Completa (Rápida)
```bash
# Usar o script de migração
node scripts/migrate-to-neon.js --migrate
```

### Fase 3: Testes (30 minutos)
1. **Testar cada página:**
   - `/alarms-optimized` (já implementada)
   - `/dashboard`
   - `/devices`
   - `/machines`

2. **Verificar funcionalidades:**
   - CRUD operations
   - Paginação
   - Filtros e busca
   - Autenticação

## 🔧 **Arquivos Chave para Atualizar**

### 1. **Arquivo de Configuração do Banco**
```typescript
// src/lib/db.ts (JÁ CRIADO)
import { neon } from '@neondatabase/serverless';
export const sql = neon(process.env.DATABASE_URL!);
```

### 2. **Atualizar Imports**
```typescript
// ANTES
import { sql } from '@vercel/postgres';

// DEPOIS
import { sql } from '@/lib/db';
```

### 3. **Otimizar Queries**
```typescript
// ANTES
export async function fetchDataAllAlarms() {
  const data = await sql<Alarm>`
    SELECT * FROM public.alarms
    ORDER BY created_at DESC
  `;
  return data.rows;
}

// DEPOIS
export async function fetchDataAllAlarms(page = 1, limit = 50) {
  const offset = (page - 1) * limit;
  const data = await sql<Alarm>`
    SELECT id, device_id, message, created_at, readed
    FROM public.alarms
    ORDER BY created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `;
  return data.rows;
}
```

## 🧪 **Testes de Validação**

### 1. **Teste de Conexão**
```typescript
// test-connection.ts
import { sql } from '@/lib/db';

async function testConnection() {
  try {
    const result = await sql`SELECT NOW() as time`;
    console.log('✅ Conexão OK:', result[0].time);
  } catch (error) {
    console.error('❌ Erro de conexão:', error);
  }
}
```

### 2. **Teste de Performance**
```bash
# Antes da migração
curl -s -o /dev/null -w "%{time_total}s\n" http://localhost:3000/api/alarms

# Depois da migração  
curl -s -o /dev/null -w "%{time_total}s\n" http://localhost:3000/api/alarms/optimized
```

### 3. **Teste de Cache**
```typescript
// Verificar se cache está funcionando
console.log('Primeira requisição:', Date.now());
const data1 = await fetchData();
console.log('Segunda requisição (deve ser cache):', Date.now());
const data2 = await fetchData();
```

## 📊 **Métricas para Monitorar**

### 1. **No Dashboard do Neon:**
- Network transfer (deve reduzir 80-90%)
- Query count (deve reduzir 70-80%)
- Active connections (deve ser estável)

### 2. **Na Aplicação:**
- Tempo de resposta das páginas
- Uso de memória
- Hit rate do cache

### 3. **No Console do Navegador:**
- Network requests (devtools)
- Cache hits/misses

## 🚨 **Problemas Comuns e Soluções**

### 1. **Erro de Conexão**
```typescript
// Solução: Verificar DATABASE_URL
console.log('DB URL:', process.env.DATABASE_URL?.substring(0, 20) + '...');
```

### 2. **Queries Lentas**
```sql
-- Adicionar índices
CREATE INDEX idx_alarms_created_at ON alarms(created_at DESC);
CREATE INDEX idx_devices_idmachine ON devices(idmachine);
```

### 3. **Cache Não Funcionando**
```typescript
// Verificar chaves de cache
const cacheKey = `alarms-${page}-${limit}`;
// Certificar-se que a chave é única por parâmetros
```

### 4. **Pagination Quebrada**
```typescript
// Usar COUNT(*) para total correto
const total = await sql`SELECT COUNT(*) as count FROM table`;
```

## 🔄 **Rollback Plan**

### Se algo der errado:
1. **Reverter imports:**
   ```bash
   git checkout -- src/query/
   git checkout -- src/app/api/
   ```

2. **Reverter package.json:**
   ```bash
   npm install @vercel/postgres
   ```

3. **Restaurar .env:**
   ```bash
   cp .env.backup .env.local
   ```

## 📈 **Benefícios Esperados**

### Imediatos (24h):
- ✅ Redução de 80-90% no network transfer
- ✅ Melhoria de 30-50% no tempo de resposta
- ✅ Menor custo no plano do Neon

### Médio Prazo (1 semana):
- ✅ Experiência do usuário mais rápida
- ✅ Menor carga no banco de dados
- ✅ Escalabilidade melhorada

### Longo Prazo (1 mês):
- ✅ Arquitetura mais sustentável
- ✅ Facilidade de manutenção
- ✅ Base para mais otimizações

## 📞 **Suporte**

### Para Dúvidas:
1. **Documentação do Neon:** https://neon.tech/docs
2. **Exemplos no repositório:** `src/app/(private)/alarms-optimized/`
3. **Script de migração:** `scripts/migrate-to-neon.js`

### Monitoramento Contínuo:
```bash
# Logs de queries lentas
npm run dev 2>&1 | grep -i "slow\|error\|warning"

# Monitorar memória
node -e "console.log(process.memoryUsage())"
```

## 🎯 **Checklist Final**

- [ ] Testar página `/alarms-optimized`
- [ ] Migrar módulo por módulo
- [ ] Validar cada funcionalidade
- [ ] Monitorar métricas no Neon
- [ ] Ajustar cache baseado em uso
- [ ] Documentar resultados

## 📝 **Notas Importantes**

1. **Não migrar tudo de uma vez** - Comece com um módulo simples
2. **Manter backups** - Faça commit após cada módulo migrado
3. **Testar em staging** antes de produção
4. **Comunicar a equipe** sobre as mudanças
5. **Coletar feedback** dos usuários sobre performance

---

**Pronto para começar?** Execute o teste de conexão primeiro para garantir que tudo está configurado corretamente!