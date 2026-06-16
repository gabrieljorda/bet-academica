# Bet Acadêmica

Plataforma web de apostas esportivas desenvolvida como trabalho acadêmico de **Desenvolvimento Web Front-End**. O sistema simula uma casa de apostas com dois perfis de acesso — **administrador** e **usuário** — permitindo gerenciar eventos, realizar apostas e acompanhar estatísticas.

Repositório: [github.com/gabrieljorda/bet-academica](https://github.com/gabrieljorda/bet-academica)

## Sobre o projeto

A **Bet Acadêmica** é uma aplicação SPA (Single Page Application) construída com React e Vite. A API REST é simulada com **JSON Server**, consumindo dados persistidos em `db.json`.

### Funcionalidades

#### Perfil Administrador
- Dashboard com estatísticas gerais (eventos, apostas, usuários)
- Cadastro, edição e exclusão de eventos esportivos
- Encerramento de eventos com definição do resultado
- Processamento automático de apostas (vitórias, derrotas e atualização de saldo)
- Painel de estatísticas da plataforma

#### Perfil Usuário
- Dashboard pessoal com saldo, vitórias, derrotas e apostas pendentes
- Listagem de eventos abertos para apostas
- Realização de apostas com validação de saldo
- Histórico completo de apostas
- Ranking de usuários por saldo

## Tecnologias utilizadas

| Tecnologia | Uso |
|---|---|
| [React 18](https://react.dev/) | Interface e componentes |
| [Vite 5](https://vitejs.dev/) | Build tool e dev server |
| [React Router DOM 6](https://reactrouter.com/) | Roteamento e rotas protegidas |
| [Axios](https://axios-http.com/) | Requisições HTTP à API |
| [JSON Server](https://github.com/typicode/json-server) | API REST simulada |
| [Tailwind CSS 4](https://tailwindcss.com/) | Estilização |
| [React Icons](https://react-icons.github.io/react-icons/) | Ícones |
| [date-fns](https://date-fns.org/) | Formatação de datas |

## Estrutura do projeto

```
src/
├── components/
│   ├── Forms/          # Formulários de eventos e apostas
│   ├── Layout/         # Header, Footer e Layout principal
│   └── UI/             # Componentes reutilizáveis (Button, Card, Modal, Spinner)
├── contexts/
│   ├── AuthContext.jsx     # Autenticação e sessão do usuário
│   └── BettingContext.jsx  # Eventos, apostas e lógica de negócio
├── pages/
│   ├── Admin/          # Dashboard, gerenciamento e estatísticas
│   ├── User/           # Dashboard, eventos, histórico e ranking
│   └── Login.jsx       # Tela de login
├── routes/
│   ├── AppRoutes.jsx   # Definição de rotas
│   └── PrivateRoute.jsx # Proteção de rotas autenticadas
├── services/
│   ├── api.js          # Configuração do Axios
│   ├── authService.js  # Serviço de autenticação
│   ├── betService.js   # Serviço de apostas
│   └── eventService.js # Serviço de eventos
└── styles/
    └── globals.css     # Estilos globais e Tailwind
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [pnpm](https://pnpm.io/) (gerenciador de pacotes do projeto) ou [NPM]

## Como executar

### 1. Instalar dependências

```bash
npm install  ou pnpm i
```

### 2. Iniciar a API (JSON Server)

Em um terminal:

```bash
npm run server ou pnpm server  
```

A API ficará disponível em `http://localhost:3000`.

### 3. Iniciar o frontend

Em outro terminal:

```bash
npm run dev ou pnpm dev
```

A aplicação ficará disponível em `http://localhost:5173`.

## Credenciais de teste

| Perfil | E-mail | Senha |
|---|---|---|
| Administrador | admin@bet.com | 123 |
| Usuário | joao@email.com | 123 |
| Usuário | maria@email.com | 123 |

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev ou pnpm dev` | Inicia o servidor de desenvolvimento (Vite) |
| `npm run build ou pnpm build` | Gera a build de produção |
| `npm run preview ou pnpm preview` | Visualiza a build de produção localmente |
| `npm run server ou pnpm server ` | Inicia o JSON Server na porta 3000 |

## Modelo de dados

O arquivo `db.json` contém três coleções:

- **usuarios** — nome, e-mail, senha, perfil (`admin` ou `usuario`), saldo, vitórias, derrotas e total de apostas
- **eventos** — times, esporte, data, status (`aberto` ou `encerrado`), odds e resultado
- **apostas** — usuário, evento, palpite, valor, status (`pendente`, `ganhou` ou `perdeu`) e retorno

## Fluxo da aplicação

1. O usuário faz login com e-mail e senha
2. O sistema redireciona conforme o perfil (admin ou usuário)
3. Usuários visualizam eventos abertos e realizam apostas descontando o saldo
4. Administradores criam eventos e, ao encerrá-los, o sistema calcula ganhos/perdas automaticamente
5. O ranking exibe os usuários ordenados por saldo

## Autores

Trabalho desenvolvido na disciplina de Desenvolvimento Web Front-End.
