# Security Review — Smart Plant App

Revisão de segurança e de qualidade aplicada ao repositório em produção.
Ferramentas/validações usadas: revisão estática dedicada de segurança, `tsc --noEmit`,
`eslint .`, `next build`, e conferência manual de cada achado no código.

## Achados e status

| # | Severidade | Arquivo | Linhas (originais) | Vulnerabilidade | Confiança | Status |
|---|------------|---------|--------------------|-----------------|-----------|--------|
| 1 | Alta | `src/query/plants/actions.ts`, `areas`, `machines`, `devices`, `configs`, `labels`, `users` | 40-41, 95 | Server Actions sem verificação de sessão/empresa: ids de tenant (`idcompany`, `idplant`, `idarea`, `idmachine`, `device_id`) vinham do formulário, e `updateData`/`deleteData` aceitavam qualquer id → criação/alteração/exclusão entre empresas | 9/10 | Corrigido |
| 2 | Alta | `src/query/users/actions.ts:110,118` + `profile/components/EditForm.tsx:63` | 110-149 | Escalada de privilégio: `role` enviado em input oculto era gravado sem verificação; `updateUserPassword(id, ...)` e `deleteData(id)` agiam em qualquer usuário | 9/10 | Corrigido |
| 3 | Média | `src/app/api/alarms/[id]/read/route.ts` | 12-16 | IDOR sem autenticação: `UPDATE alarms SET readed = true WHERE id = ${id}` para qualquer alarme | 8/10 | Corrigido |
| 4 | Média | `src/app/api/test/route.ts` | 5-18 | Endpoint de teste em produção: criava alarmes para qualquer `device_id` sem autenticação | 8/10 | Corrigido (gate por `DEVICE_API_KEY` + validação de payload) |
| 5 | Média | `src/app/api/machines/[id]/events/route.ts` + `src/query/events/data.ts` | 3-12 (rota) / 6-31 (query) | IDOR sem autenticação: telemetria de qualquer máquina, sem escopo de empresa | 7/10 | Corrigido |
| 6 | Média | `src/app/api/devices/{heartbeat,events}` | — | Escrita não autenticada, protegida apenas pelo MAC do dispositivo | 8/10 | Mitigado (gate opcional `DEVICE_API_KEY`) |
| 7 | Baixa | `src/query/companies/actions.ts` | 90-97 | `deleteCompany(id)` sem verificação e sem uso (código morto) | 9/10 | Removido |
| 8 | Baixa | `src/app/api/auth/confirm/route.ts` | 6-8 | `password.length` acessado antes de validar o tipo → erro 500; sem limite de tamanho | 8/10 | Corrigido |
| 9 | Baixa | `src/app/api/auth/send-link/route.ts` | 33-38 | Tokens de redefinição acumulavam indefinidamente (vários links válidos por usuário) | 7/10 | Corrigido (invalida tokens anteriores) |
| 10 | Baixa | `src/lib/auth.ts` | 118-140 | Conta criada pelo fluxo de convite (sem empresa) não concluía onboarding no primeiro login → app inutilizável para aquele e-mail | 6/10 | Corrigido (provisiona empresa no primeiro login) |
| 11 | Alta | `src/query/plants/data.ts` | 4-11 | `fetchDataPlants()` resolvia a empresa mas **não filtrava** no SQL: `/dashboard` e `/plants` listavam plantas de todas as empresas | — | Corrigido (`WHERE idcompany = ${idcompany}`) |
| 12 | Alta | `src/query/users/actions.ts` | 113-132 | Qualquer membro da empresa podia redefinir a senha de outro membro (inclusive admin) pela tela de edição de usuário → account takeover | — | Corrigido (senha só pelo próprio usuário ou por admin) |
| 13 | Alta | `src/query/configs/actions.ts`, `src/query/labels/actions.ts` | `createConfig`/`createLabel` | Funções exportadas em arquivo `'use server'` são endpoints públicos; o guard usado era *fail-open* (sem sessão, liberava) | — | Corrigido: movidas para `src/query/*/internal.ts` (não expostas) e consumidas pela rota de ingestão |
| 14 | Alta | `src/lib/authz.ts` | `assertDeviceInCompany` | Regressão introduzida nesta revisão: o guard exigia a cadeia device→planta e bloqueava a vinculação de dispositivos órfãos ("Add device") | — | Corrigido (`LEFT JOIN` + `idmachine IS NULL` liberado) |
| 15 | Alta | `src/lib/auth.ts` | `authorize` | Contas de convite (sem empresa) quebravam no login por senha; a correção anterior cobria apenas o Google | — | Corrigido (provisiona empresa também no login por credenciais) |
| 16 | Média | `src/query/**/data.ts` | `fetchById`/`fetchFiltered`/`fetchPages` | IDOR de leitura na página `/machines/[id]` e 18 funções de leitura sem escopo/uso | — | Corrigido: `machines.fetchById` escopado + `page` usa `notFound()`; 18 funções mortas removidas |
| 17 | Média | `src/app/api/user/route.ts` | 13-14 | Retornava o hash bcrypt da senha do próprio usuário via `SELECT *` | — | Corrigido (campo `password` removido da resposta) |
| 18 | Baixa | `src/app/(private)/(settings)/profile/components/EditForm.tsx` | 10 | Componente `'use client'` importava módulo de servidor (`@/lib/deleteUnusedFiles`) sem usar | — | Corrigido (import removido) |
| 19 | Baixa | `scripts/fix-currentcompanyid.js` | 26 | Script obsoleto que reintroduzia o import do módulo `optimized-utils` já removido | — | Removido |

### Áreas verificadas sem achados

- **Injeção de SQL**: todas as queries usam o tagged template do Neon com parâmetros vinculados
  (`src/lib/db.ts` e `src/query/**`). Nenhum `sql.unsafe`, concatenação ou interpolação de identificadores.
- **Segredos versionados**: `.env` nunca esteve no histórico do Git (`git log --all -- .env` vazio) e está no `.gitignore`.
- **Criptografia**: bcrypt (custo 10) para senhas; `crypto.randomBytes(32)` para tokens; comparação de chave de dispositivo com `crypto.timingSafeEqual`.
- **XSS / deserialização / SSRF / path traversal**: sem `dangerouslySetInnerHTML`, `eval`, `new Function`, `require` dinâmico, fetch de URL controlada pelo usuário ou caminho de arquivo controlado.
- **Uploads**: `@vercel/blob` com allowlist de `content-type` e `onBeforeGenerateToken` autenticado.

## Correções aplicadas

1. **`src/lib/authz.ts` (novo)** — helpers de autorização multiempresa:
   `assertPlantInCompany`, `assertAreaInCompany`, `assertMachineInCompany`, `assertDeviceInCompany`,
   `assertConfigInCompany`, `assertLabelInCompany`, `assertUserInCompany`, `assertCompanyIsCurrent`,
   `resolveRoleForWrite`, `markAlarmAsRead`, `guard` e `isDeviceRequestAuthorized`.
2. **Server Actions** — passaram a usar a empresa da sessão (`CurrentCompanyId()`) em vez do formulário,
   com verificação de posse do alvo antes de qualquer alteração; `UPDATE`/`DELETE` de usuários e plantas
   também restringem por `idcompany`.
3. **Papel do usuário** — só `admin`/`dev` conseguem alterar `role`; os demais mantêm o papel atual.
4. **Rotas de API** — `auth()` obrigatório (401 sem sessão) em `/api/alarms/[id]/read`, `/api/alarms/read-all`,
   `/api/alarms/recent`, `/api/devices/all` e `/api/machines/[id]/events`; consultas com escopo de empresa.
5. **Endpoints de dispositivo** — `isDeviceRequestAuthorized()` aceita `x-api-key` ou `Authorization: Bearer`;
   o gate só é aplicado quando `DEVICE_API_KEY` existe, preservando o comportamento atual dos dispositivos.
6. **Código morto com vulnerabilidade** — removidos `src/query/alarms/actions.ts`, `src/query/events/actions.ts`,
   `deleteCompany`, `updateUserPassword`, `deleteConfig`, `deleteLabel` e a rota `/api/alarms/optimized`.

## Limitações conhecidas (fora do escopo desta revisão)

- **Pool de dispositivos órfãos**: `devices` não possui coluna de empresa; um dispositivo sem
  `idmachine` não tem dono no schema. `/api/devices/new` (autenticado) lista esse pool para
  permitir a vinculação, e `assertDeviceInCompany` libera dispositivos órfãos. Restringir isso
  exige mudança de modelo de dados (ex.: `devices.idcompany` preenchido no registro por MAC).
- **Rate limiting / lockout** de login e de envio de link de senha não existem.
- **Cadastro pelo Google** cria automaticamente uma empresa nova para qualquer conta Google.
- **`deleteUnusedFiles()`** roda em `users/actions.ts` a cada edição de perfil e varre os blobs
  globalmente; hoje só remove arquivos não referenciados por nenhum usuário/empresa.

## Ações recomendadas para o deploy

1. Definir `DEVICE_API_KEY` no ambiente (Vercel) e atualizar os dispositivos para enviar `x-api-key`.
   Sem isso, os endpoints `/api/devices/*` e `/api/test` continuam abertos.
2. Remover do ambiente as chaves que não são mais usadas pelo código:
   `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`,
   `POSTGRES_*`, `PG*` (herdadas da integração antiga com `@vercel/postgres`).
3. Avaliar (não implementado aqui): rate limiting/lockout no login e no envio de link de senha,
   e restrição de domínios no provedor Google (hoje qualquer conta Google cria uma empresa nova).
4. A página `/signup` continua sendo o formulário do template (sem ação de cadastro real);
   o caminho de cadastro efetivo hoje é o convite por e-mail (`/api/auth/send-link`).
