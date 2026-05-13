# 🍪 Política de Cookies - Smart Plant App

**Última atualização:** 13 de maio de 2026

## 1. O Que São Cookies?

Cookies são pequenos arquivos de texto armazenados no seu navegador ou dispositivo. Eles permitem que websites lembrarem informações sobre você, como preferências e dados de sessão.

Um cookie típico contém:
- **Nome**: Identificador único
- **Valor**: Dados armazenados
- **Domínio**: Site que configurou o cookie
- **Caminho**: Seção do site onde o cookie é válido
- **Expiração**: Quando o cookie será deletado

---

## 2. Por Que Usamos Cookies?

O **Smart Plant App** usa cookies para:

### 2.1 Funcionalidade Essencial
- Manter você conectado à sua conta
- Lembrar suas preferências (tema, idioma)
- Processar transações de pagamento
- Proteger contra fraude e abuso

### 2.2 Análise e Performance
- Entender como você usa o Serviço
- Identificar problemas técnicos
- Otimizar a experiência do usuário
- Medir eficácia de features

### 2.3 Marketing e Publicidade
- Rastrear campanhas publicitárias
- Exibir conteúdo relevante
- Entender comportamento de conversão
- Personalizar comunicações

### 2.4 Segurança
- Detectar atividades suspeitas
- Prevenir acesso não autorizado
- Implementar autenticação multi-fator
- Proteger contra ataques

---

## 3. Tipos de Cookies Usados

### 3.1 Cookies Essenciais (Necessários)
**Consentimento:** Não requerido

| Nome | Propósito | Duração | Provedor |
|------|-----------|---------|----------|
| `__Host-authjs.csrf-token` | Token CSRF para NextAuth | Sessão | Smart Plant |
| `__Secure-authjs.session-token` | Token de sessão autenticada | 30 dias | NextAuth.js |
| `__Host-authjs.callback-url` | Callback URL após login | Sessão | NextAuth.js |
| `smartplant-session-id` | ID único de sessão | Sessão | Smart Plant |

**Impacto se bloqueados:** Você não conseguirá fazer login ou usar o Serviço.

### 3.2 Cookies de Preferência
**Consentimento:** Consentimento implícito (pode ser rejeitado)

| Nome | Propósito | Duração | Provedor |
|------|-----------|---------|----------|
| `smartplant-theme` | Tema preferido (claro/escuro) | 1 ano | Smart Plant |
| `smartplant-language` | Idioma preferido | 1 ano | Smart Plant |
| `smartplant-sidebar-state` | Estado da sidebar (aberta/fechada) | 30 dias | Smart Plant |
| `smartplant-notifications` | Preferências de notificação | 90 dias | Smart Plant |

**Impacto se bloqueados:** Você terá experiência padrão, perderá preferências personalizadas.

### 3.3 Cookies de Analytics
**Consentimento:** Consentimento explícito requerido

| Nome | Propósito | Duração | Provedor |
|------|-----------|---------|----------|
| `_ga` | Google Analytics - ID único do usuário | 2 anos | Google Analytics |
| `_ga_XXXXXXXXXX` | Google Analytics - Sessão | 2 anos | Google Analytics |
| `_gid` | Google Analytics - ID de sessão | 24 horas | Google Analytics |

**Dados coletados:**
- Páginas visitadas
- Duração de sessão
- Taxa de rejeição
- Origem de tráfego
- Dispositivo e navegador

**Impacto se bloqueados:** Não coletaremos dados de analytics, não afeta funcionalidade.

### 3.4 Cookies de Marketing
**Consentimento:** Consentimento explícito requerido

| Nome | Propósito | Duração | Provedor |
|------|-----------|---------|----------|
| `fbp` | Facebook Pixel - Rastreamento de conversão | 3 meses | Facebook |
| `_fbp` | Facebook - ID do navegador | 3 meses | Meta Platforms |
| `sb` | Facebook - Sincronização segura | Persistente | Meta Platforms |
| `stripe-mid` | Stripe - Rastreamento de merchant | 1 ano | Stripe |

**Dados coletados:**
- Eventos de conversão
- Comportamento de compra
- Interações com anúncios
- Dados demográficos

**Impacto se bloqueados:** Publicidade menos direcionada, mas sem impacto na funcionalidade.

### 3.5 Cookies de Terceiros
Alguns serviços incorporados podem configurar seus próprios cookies:

| Serviço | Cookies | Propósito | Política |
|---------|---------|----------|---------|
| **Stripe** | `stripe-mid`, `stripe-sid` | Processamento de pagamento | [stripe.com/privacy](https://stripe.com/privacy) |
| **Google Analytics** | `_ga*` | Analytics | [google.com/policies/privacy](https://policies.google.com/privacy) |
| **Facebook Pixel** | `fbp`, `_fbp` | Rastreamento de conversão | [facebook.com/privacy](https://facebook.com/privacy) |
| **Vercel Analytics** | `_vercel_jwt` | Performance analytics | [vercel.com/legal/privacy](https://vercel.com/legal/privacy) |

---

## 4. Consentimento de Cookie

### 4.1 Banner de Consentimento
Ao primeira visita, exibimos um banner informando sobre cookies. Você pode:
- **Aceitar Todos**: Aceita todos os tipos de cookies
- **Rejeitar Não-Essenciais**: Apenas cookies essenciais
- **Personalizar**: Escolher quais tipos aceitar

### 4.2 Renovação de Consentimento
Se não interagir com o banner por **12 meses**, ele reaparecerá para renovação de consentimento.

### 4.3 Revogação de Consentimento
Você pode revogar consentimento a qualquer tempo através de:
- Link "Preferências de Cookie" no footer
- Configurações de privacidade da conta
- Limpando cookies do navegador

---

## 5. Gerenciamento de Cookies

### 5.1 No Navegador

#### Google Chrome
1. Menu (⋮) → Configurações
2. Privacidade e segurança → Cookies
3. Gerenciar todos os cookies
4. Pesquise "smartplant" e delete conforme desejado

#### Firefox
1. Menu (≡) → Configurações
2. Privacidade & Segurança
3. Cookies e dados do site
4. Procure smartplant.app.br e delete

#### Safari
1. Preferências (⌘,) → Privacidade
2. Gerenciar dados do website
3. Procure smartplant.app.br
4. Delete ou "Remover Tudo"

#### Edge
1. Menu (⋯) → Configurações
2. Privacidade → Limpar dados de navegação
3. Marque "Cookies"
4. Selecione intervalo de tempo

### 5.2 Desabilitar Cookies
Você pode desabilitar cookies, mas isso afetará funcionalidade do Serviço:
- Não conseguirá fazer login
- Perderá preferências personalizadas
- Algumas features não funcionarão

### 5.3 Local Storage e Session Storage
Além de cookies, usamos:
- **localStorage**: Dados persistentes (tema, layout, etc.)
- **sessionStorage**: Dados temporários da sessão

Podem ser limpos junto com cookies nas configurações do navegador.

---

## 6. Web Beacons e Rastreamento

### 6.1 Web Beacons
Também usamos "web beacons" (pixels/gifs transparentes 1x1) para:
- Rastrear visualizações de email
- Confirmar recebimento de notificações
- Medir eficácia de campanhas

### 6.2 Rastreamento de URL
Links podem conter parâmetros de rastreamento como:
- `utm_source`: Origem do tráfego
- `utm_medium`: Meio de marketing
- `utm_campaign`: Nome da campanha
- `utm_content`: Conteúdo específico
- `utm_term`: Termo-chave

---

## 7. Do Not Track (DNT)

Se seu navegador enviar sinais "Do Not Track":
- Respeitamos a preferência para analytics
- Cookies essenciais continuarão sendo usados
- Alguns serviços de terceiros podem ignorar DNT

Vamos não processar sinais DNT para fins de conformidade LGPD - você deve usar as configurações de cookies deste site.

---

## 8. Dados Coletados via Cookies

### 8.1 Informações Técnicas
- Endereço IP (mascarado para analytics)
- Tipo e versão do navegador
- Sistema operacional
- Resolução de tela
- Idioma do navegador
- Data e hora de acesso

### 8.2 Informações Comportamentais
- Páginas visitadas
- Tempo em cada página
- Links clicados
- Eventos de conversão
- Histórico de busca
- Formulários preenchidos

### 8.3 Informações de Conta
- ID do usuário (anonimizado)
- Status de autenticação
- Plano de assinatura (não dados sensíveis)
- Preferências de conta

### 8.4 Dados Sensíveis **NÃO** Coletados
Nunca armazenamos em cookies:
- Senhas
- Números de cartão de crédito
- Informações médicas
- Dados biométricos
- Dados de localização (GPS)

---

## 9. Compartilhamento de Dados via Cookies

Dados coletados via cookies podem ser compartilhados com:

### 9.1 Serviços Analíticos
- **Google Analytics**: Para análise de uso agregado
- **Vercel Analytics**: Para performance do site

### 9.2 Plataformas de Publicidade
- **Facebook/Meta**: Para rastreamento de conversão
- **Google Ads**: Se campanhas estão ativas
- **Stripe**: Para rastreamento de transações

### 9.3 Provedores de Serviço
- **Vercel**: Hospedagem e CDN
- **NextAuth**: Autenticação

**Todos os terceiros possuem acordos de proteção de dados conformes com LGPD.**

---

## 10. Retenção de Cookies

| Tipo | Duração | Renovação |
|------|---------|-----------|
| **Essenciais** | 30 dias a Sessão | Automática a cada login |
| **Preferência** | 30-365 dias | Renovada a cada visita |
| **Analytics** | 2 anos | Renovada a cada visita |
| **Marketing** | 3 meses - 1 ano | Renovada a cada visita |

Cookies expiram automaticamente. Você pode deletá-los manualmente a qualquer tempo.

---

## 11. Segurança de Cookies

### 11.1 Sinalizadores de Segurança
Nossos cookies usam:
- **Secure**: Apenas transmitidos via HTTPS
- **HttpOnly**: Inacessível via JavaScript
- **SameSite**: Proteção contra CSRF

### 11.2 Proteção Contra Roubo
Cookies são criptografados e assinados. Temos:
- Proteção contra XSS
- Proteção contra CSRF
- Validação de integridade
- Rate limiting

---

## 12. Políticas de Cookies por País

### 12.1 Brasil (LGPD)
- Consentimento explícito requerido para cookies não-essenciais
- Direito de acesso, correção e deleção
- Notificação obrigatória de incidentes

### 12.2 União Europeia (GDPR/ePrivacy)
Se você acessar de país da UE:
- Consentimento explícito obrigatório
- Direito de portabilidade de dados
- Direito ao esquecimento

### 12.3 Califórnia (CCPA)
Se você é residente da Califórnia:
- Direito de saber dados coletados
- Direito de deletar dados
- Direito de não-venda de dados

---

## 13. Integrações e Rastreamento de Terceiros

### 13.1 Google Analytics 4
- **Propósito**: Análise de comportamento e conversão
- **Dados**: Páginas, eventos, demografia, conversão
- **Duração**: 2 anos
- **Opt-out**: [google.com/analytics/terms](https://www.google.com/analytics/terms)

### 13.2 Facebook Pixel
- **Propósito**: Rastreamento de conversão e retargeting
- **Dados**: Eventos de conversão, comportamento
- **Duração**: 90 dias
- **Opt-out**: [facebook.com/ads/preferences](https://www.facebook.com/ads/preferences)

### 13.3 Stripe Cookies
- **Propósito**: Segurança e fraude do pagamento
- **Dados**: Informações de transação (criptografadas)
- **Duração**: 1 ano
- **Política**: [stripe.com/privacy](https://stripe.com/privacy)

---

## 14. Mudanças nesta Política

Podemos atualizar esta Política de Cookies:
- Mudanças de baixo impacto: Notificação por email
- Mudanças de alto impacto: Solicitação de novo consentimento

A data de "Última atualização" acima reflete a versão atual.

---

## 15. Contato sobre Cookies

Para dúvidas sobre cookies:

📧 **Email**: privacidade@autoric.com.br  
🌐 **Website**: [https://smartplant.app.br](https://smartplant.app.br)  
📝 **Preferências**: Disponível no footer da aplicação

---

## 16. Ferramentas de Gerenciamento de Consentimento

### 16.1 Nossa Ferramenta
Acesse "Preferências de Cookie" no footer para:
- Visualizar todos os cookies armazenados
- Aceitar/rejeitar por categoria
- Deletar cookies específicos
- Revisar política completa

### 16.2 Ferramentas de Terceiros
Pode usar plataformas como:
- [cookiebot.com](https://www.cookiebot.com/)
- [onetrust.com](https://www.onetrust.com/)
- [iubenda.com](https://www.iubenda.com/)

---

<div align="center">

**Você controla seus cookies. Gerencie suas preferências a qualquer momento.**

© 2026 Autoric Automação e Sistemas. Todos os direitos reservados.

</div>
