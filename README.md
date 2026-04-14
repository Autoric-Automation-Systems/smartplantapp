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
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas TypeScript-first

### Visualização de Dados
- **ApexCharts** - Gráficos interativos e modernos
- **Recharts** - Biblioteca de gráficos baseada em React
- **FullCalendar** - Calendário interativo para agendamentos
- **React Vector Maps** - Mapas geográficos interativos

### Backend & Autenticação
- **NextAuth.js** - Autenticação completa para Next.js
- **Vercel Postgres** - Banco de dados PostgreSQL
- **bcryptjs** - Hash de senhas seguro
- **Stripe** - Processamento de pagamentos
- **Nodemailer** - Envio de emails

### UI/UX
- **Heroicons** - Conjunto de ícones SVG
- **React Icons** - Biblioteca de ícones populares
- **Flatpickr** - Selecionador de datas/tempo
- **Swiper** - Slider/carrossel responsivo

## 📁 Estrutura do Projeto

```
smartplantapp/
├── public/              # Arquivos estáticos
│   ├── images/         # Imagens e logos
│   └── fonts/          # Fontes customizadas
├── src/
│   ├── app/            # Rotas da aplicação (App Router)
│   │   ├── (public)/   # Rotas públicas (landing page, login)
│   │   ├── (private)/  # Rotas privadas (dashboard, configurações)
│   │   └── api/        # Rotas da API
│   ├── components/     # Componentes reutilizáveis
│   │   ├── ui/         # Componentes de UI base
│   │   ├── form/       # Componentes de formulário
│   │   └── layout/     # Componentes de layout
│   ├── context/        # Contextos React (Theme, Sidebar)
│   ├── hooks/          # Hooks customizados
│   ├── icons/          # Ícones SVG customizados
│   ├── layout/         # Componentes de layout principal
│   ├── lib/            # Utilitários e configurações
│   └── query/          # Queries e definições de tipos
├── package.json        # Dependências e scripts
├── next.config.ts      # Configuração do Next.js
├── tailwind.config.js  # Configuração do Tailwind CSS
└── tsconfig.json       # Configuração do TypeScript
```

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js 18+ ou 20+
- npm, yarn ou pnpm
- PostgreSQL (para produção)

### Passos de Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/smartplantapp.git
   cd smartplantapp
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env.local
   ```
   Edite o arquivo `.env.local` com suas configurações:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/smartplant"
   NEXTAUTH_SECRET="sua-chave-secreta-aqui"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Execute as migrações do banco de dados**
   ```bash
   npx prisma db push
   ```

5. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```

6. **Acesse a aplicação**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📦 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria uma build de produção
- `npm start` - Inicia o servidor de produção
- `npm run lint` - Executa o ESLint para verificação de código

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

- Autenticação com JWT (JSON Web Tokens)
- Hash de senhas com bcrypt
- Proteção contra CSRF e XSS
- CORS configurado
- Rate limiting em endpoints críticos
- Validação de entrada em todos os formulários

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
- Todos os contribuidores e mantenedores das bibliotecas utilizadas

---

<div align="center">
  
**Desenvolvido com ❤️ pela equipe Autoric Automação e Sistemas**

*© 2026 Autoric Automação e Sistemas - Smart Plant App. Todos os direitos reservados.*

</div>