# 🌱 Smart Plant App

<div align="center">

![Smart Plant Logo](public/images/logo/logo.png)

**Sistema Integrado de Telemetria Industrial**(https://smartplant.app.br)  
*Monitoramento inteligente para plantas residenciais, comerciais e industriais*

[![Next.js](https://img.shields.io/badge/Next.js-16.0.10-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.17-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

</div>

## 📋 Visão Geral

O **Smart Plant App** é uma plataforma moderna e modular para monitoramento e controle de sistemas industriais, residenciais e comerciais. Desenvolvido com tecnologias de ponta, oferece uma solução completa de telemetria em tempo real.

### 🎯 Características Principais

- **💻 Interface Moderna**: Design responsivo com suporte a modo claro/escuro
- **📊 Dashboard em Tempo Real**: Visualização de dados com gráficos interativos
- **🔧 Sistema Modular**: Módulos especializados para diferentes tipos de monitoramento
- **🔐 Autenticação Segura**: Sistema de login com NextAuth.js
- **📱 Totalmente Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **🌐 Internacionalização**: Suporte a múltiplos idiomas (pt-BR padrão)

## 🏗️ Arquitetura do Sistema

### Módulos de Telemetria

| Módulo | Sigla | Descrição |
|--------|-------|-----------|
| **Smart Plant Production States** | SP-PS | Monitoramento de estados e contagem de produção |
| **Smart Plant Temperature Humidity** | SP-TH | Controle de temperatura e umidade em ambientes controlados |
| **Smart Plant Tank Level** | SP-TL | Monitoramento de nível de tanques e reservatórios |
| **Smart Plant Fluid Flow** | SP-FF | Medição e controle de fluxo de fluidos |
| **Smart Plant Inspection System** | SP-IS | Sistema de inspeção por imagem |

## 🚀 Tecnologias Utilizadas

### Frontend
- **Next.js 16** - Framework React com renderização híbrida
- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática para maior segurança
- **Tailwind CSS 4** - Framework CSS utility-first
- **Headless UI** - Componentes UI acessíveis e sem estilos
- **Zod** - Validação de esquemas TypeScript-first

### Visualização de Dados
- **ApexCharts** - Gráficos interativos e modernos
- **Recharts** - Biblioteca de gráficos baseada em React

### Backend & Autenticação
- **NextAuth.js v5** - Autenticação completa para Next.js (Credentials + Google)
- **Neon Postgres** - Banco de dados PostgreSQL serverless (`@neondatabase/serverless`)
- **bcryptjs** - Hash de senhas seguro
- **Nodemailer** - Envio de emails
- **Vercel Blob** - Armazenamento de arquivos/avatares

### UI/UX
- **Heroicons** - Conjunto de ícones SVG
- **React Icons** - Biblioteca de ícones populares

### Gerenciador de pacotes
- **pnpm** - O repositório mantém apenas `pnpm-lock.yaml`; use `pnpm` para instalar e rodar scripts.

## 📁 Estrutura do Projeto

```
smartplantapp/
├── public/              # Arquivos estáticos
│   ├── images/         # Imagens e logos
│   └── fonts/          # Fontes customizadas
├── src/
│   ├── app/            # Rotas da aplicação (App Router)
│   │   ├── (public)/   # Rotas públicas (landing page, login, termos)
│   │   ├── (private)/  # Rotas privadas (dashboard, configurações)
│   │   └── api/        # Rotas da API
│   ├── components/     # Componentes reutilizáveis
│   │   ├── auth/       # Formulários de autenticação
│   │   ├── common/     # Componentes compartilhados (breadcrumb, cards, skeleton)
│   │   ├── form/       # Componentes de formulário
│   │   ├── header/     # Header e dropdowns
│   │   └── ui/         # Componentes de UI base
│   ├── context/        # Contextos React (Theme, Sidebar)
│   ├── hooks/          # Hooks customizados
│   ├── icons/          # Ícones SVG customizados
│   ├── layout/         # Componentes de layout principal
│   ├── lib/            # Utilitários, sessão, autorização e configs
│   └── query/          # Acesso a dados (definitions/data/actions por entidade)
├── package.json        # Dependências e scripts
├── next.config.ts      # Configuração do Next.js
├── src/app/globals.css # Tema e estilos (Tailwind CSS 4 é CSS-first)
└── tsconfig.json       # Configuração do TypeScript
```

### Convenções de código

- **Server Actions** (`src/query/*/actions.ts`): nunca confiam em ids de tenant vindos do formulário.
  A empresa do usuário vem sempre da sessão (`CurrentCompanyId()`) e o alvo é verificado com os
  helpers de `src/lib/authz.ts` (`assertPlantInCompany`, `assertAreaInCompany`, ...).
- **Rotas de API** de usuário exigem sessão (`auth()`); rotas de dispositivos usam `DEVICE_API_KEY`.
- **Componentes**: arquivos em PascalCase (`CardPlant.tsx`); módulos de `src/lib` e `src/query` em camelCase.
- **Acesso a dados**: SQL apenas em `src/query/*` (tagged template do Neon, sempre parametrizado).
- **Navegação**: o menu lateral é de nível único (`src/layout/AppSidebar.tsx`), sem submenus.
- **Tema**: `next-themes` via `src/context/ThemeContext.tsx` — o tema é aplicado como classe
  `dark` no `<html>` antes da primeira pintura (sem flash) e persistido em `localStorage["theme"]`.
  Use sempre variantes `dark:` nos componentes novos.

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js 20+
- pnpm
- PostgreSQL (Neon)

### Passos de Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/Autoric-Automation-Systems/smartplantapp.git
   cd smartplantapp
   ```

2. **Instale as dependências**
   ```bash
   pnpm install
   ```

3. **Configure as variáveis de ambiente** (arquivo `.env.local`, nunca versionado)
   ```env
   DATABASE_URL="postgresql://usuario:senha@host/banco"   # Neon (pooled)
   NEXTAUTH_SECRET="chave-aleatoria"
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   AUTH_GOOGLE_ID="..."                                   # login com Google
   AUTH_GOOGLE_SECRET="..."
   EMAIL_USER="conta@gmail.com"                           # reset de senha (Nodemailer)
   EMAIL_PASS="senha-de-app"
   BLOB_READ_WRITE_TOKEN="..."                            # uploads (@vercel/blob)
   DEVICE_API_KEY="chave-dos-dispositivos"                # opcional, ver seção Segurança
   ```

4. **Inicie o servidor de desenvolvimento**
   ```bash
   pnpm dev
   ```

5. **Acesse a aplicação**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📦 Scripts Disponíveis

- `pnpm dev` - Inicia o servidor de desenvolvimento
- `pnpm build` - Cria uma build de produção
- `pnpm start` - Inicia o servidor de produção
- `pnpm lint` - Executa o ESLint para verificação de código
- `npx tsc --noEmit` - Verificação de tipos

## 🎨 Design System

### Cores Principais
- **Primária**: `#465FFF` (Azul Smart Plant)
- **Sucesso**: `#12B76A` (Verde)
- **Erro**: `#F04438` (Vermelho)
- **Aviso**: `#F79009` (Laranja)
- **Informação**: `#0BA5EC` (Azul claro)

### Tipografia
- **Fonte Principal**: Outfit (Google Fonts)
- **Tamanhos**: Sistema escalável com breakpoints responsivos

### Componentes
- **Botões**: Estilos consistentes com estados hover/focus
- **Formulários**: Validação em tempo real com feedback visual
- **Cards**: Containers com sombras e bordas arredondadas
- **Modais**: Overlays acessíveis com transições suaves

## 🔒 Segurança

- Autenticação com JWT (`next-auth` v5) — sessão de 7 dias, renovada a cada 2 horas
- Hash de senhas com bcrypt (custo 10)
- Tokens de redefinição de senha gerados com `crypto.randomBytes(32)`, válidos por 30 minutos e invalidados após o uso
- Autorização multiempresa: toda leitura/escrita é restrita à empresa do usuário (`src/lib/authz.ts`)
- Todas as queries usam parâmetros vinculados (tagged template do Neon) — sem concatenação de SQL
- Rotas de API de usuário exigem sessão; respostas 401 quando ausente
- Uploads limitados por tipo de conteúdo e usuário autenticado (`@vercel/blob`)
- Rotas de dispositivos (`/api/devices/heartbeat`, `/api/devices/events`, `/api/test`):
  protegidas por chave compartilhada quando `DEVICE_API_KEY` está definida
  (header `x-api-key` ou `Authorization: Bearer`). **Recomendado configurar em produção.**

Limitações conhecidas: não há rate limiting nem bloqueio por tentativas de login;
o cadastro pelo Google cria automaticamente uma empresa para novos usuários.

Consulte [SECURITY-REVIEW.md](./SECURITY-REVIEW.md) para o histórico de achados e correções.

## 📱 Responsividade

O sistema é totalmente responsivo com breakpoints:
- `2xsm`: 375px
- `xsm`: 425px
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px
- `3xl`: 2000px

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Suporte

Para suporte, entre em contato:
- **Email**: autoricbr@gmail.com
- **Site**: [autoric.com.br](https://autoric.com.br)

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/) pela incrível framework
- [Vercel](https://vercel.com/) pelo hosting e ferramentas
- [Tailwind CSS](https://tailwindcss.com/) pelo sistema de design
- [TailAdmin](https://tailadmin.com/) — o layout inicial deste projeto é derivado do template TailAdmin (MIT)
- Todos os contribuidores e mantenedores das bibliotecas utilizadas

---

<div align="center">
  
**Desenvolvido com ❤️ pela equipe Autoric Automação e Sistemas**

*© 2026 Autoric Automação e Sistemas - Smart Plant App. Todos os direitos reservados.*

</div>