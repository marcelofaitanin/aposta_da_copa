# 4. Estrutura de Diretórios e Arquivos

O projeto é dividido em duas aplicações independentes: **`backend/`** (Express +
Node) e **`frontend/`** (Angular), além da pasta **`docs/`** com a documentação.

```
Trabalho-Desenvolvimento-Web-III/
├── backend/            → API REST (Express + Node + Mongoose)
├── frontend/           → Aplicação Angular (SPA)
├── docs/               → Documentação do trabalho
├── .gitignore
└── README.md
```

---

## 🟢 Backend (Express / Node.js)

Organizado em **camadas** (rotas → controllers → models), um padrão clássico de
API REST que separa responsabilidades.

```
backend/
├── package.json              → Dependências e scripts (start, dev, seed)
├── .env.example              → Modelo de variáveis de ambiente
├── server.js                 → Ponto de entrada: conecta ao banco e sobe o servidor
└── src/
    ├── app.js                → Cria e configura a aplicação Express (middlewares, rotas)
    ├── config/
    │   └── db.js             → Conexão com o MongoDB (local, Atlas ou em memória)
    ├── models/               → Schemas do Mongoose (modelagem dos documentos)
    │   ├── User.js           → Coleção "users" (apostadores e admin)
    │   ├── Game.js           → Coleção "games" (jogos da Copa + odds)
    │   └── Bet.js            → Coleção "bets" (apostas)
    ├── controllers/          → Regras de negócio (o que cada rota faz)
    │   ├── authController.js → Registro, login e dados do usuário
    │   ├── gameController.js → Listar/criar/atualizar jogos e liquidar apostas
    │   └── betController.js  → Criar aposta e listar apostas do usuário
    ├── routes/               → Definição das rotas e quais middlewares aplicam
    │   ├── authRoutes.js     → /api/auth/*
    │   ├── gameRoutes.js     → /api/games/*
    │   └── betRoutes.js      → /api/bets/*
    ├── middleware/
    │   └── auth.js           → Validação do JWT (authRequired) e checagem de admin
    └── seed/
        └── seed.js           → Popula o banco com usuários e jogos da Copa 2026
```

**Fluxo de uma requisição:**
`server.js` → `app.js` (middlewares) → `routes/*` → `middleware/auth.js`
(se protegida) → `controllers/*` → `models/*` (Mongoose) → MongoDB.

---

## 🔴 Frontend (Angular)

Angular 22 com **componentes standalone**, **Signals** e **lazy loading** por
rota. O código da aplicação fica em `src/app`, dividido em `core/` (serviços e
infraestrutura) e `pages/` (telas).

```
frontend/
├── package.json              → Dependências e scripts (start = ng serve, build)
├── angular.json              → Configuração do workspace Angular
├── tsconfig*.json            → Configurações do TypeScript
└── src/
    ├── index.html            → Página HTML raiz (contém <app-root>)
    ├── main.ts               → Bootstrap da aplicação Angular
    ├── styles.css            → Tema/estilos globais
    └── app/
        ├── app.ts            → Componente raiz (navbar + <router-outlet>)
        ├── app.html          → Template do componente raiz
        ├── app.css           → Estilos do componente raiz
        ├── app.config.ts     → Providers (HttpClient, Router, interceptor)
        ├── app.routes.ts     → Definição das rotas (com guards e lazy loading)
        │
        ├── core/             → Infraestrutura compartilhada
        │   ├── api.config.ts                 → URL base da API
        │   ├── models/
        │   │   └── models.ts                 → Interfaces (User, Game, Bet, ...)
        │   ├── services/                     → Comunicação com a API
        │   │   ├── auth.service.ts           → Login, cadastro, estado do usuário
        │   │   ├── game.service.ts           → Jogos e liquidação
        │   │   └── bet.service.ts            → Apostas
        │   ├── guards/
        │   │   └── guards.ts                 → authGuard e adminGuard (proteção de rotas)
        │   └── interceptors/
        │       └── auth.interceptor.ts       → Injeta o token JWT nas requisições
        │
        └── pages/            → Telas (cada uma é um componente standalone)
            ├── login/        → login.ts / login.html / login.css
            ├── register/     → register.ts / register.html / register.css
            ├── games/        → games.ts / games.html / games.css  (lista + apostar)
            ├── my-bets/      → my-bets.ts / my-bets.html / my-bets.css
            └── admin/        → admin.ts / admin.html / admin.css  (registrar placar)
```

**Mapa de rotas (`app.routes.ts`):**

| Rota               | Componente | Proteção     |
| ------------------ | ---------- | ------------ |
| `/jogos`           | `Games`    | pública      |
| `/login`           | `Login`    | pública      |
| `/cadastro`        | `Register` | pública      |
| `/minhas-apostas`  | `MyBets`   | `authGuard`  |
| `/admin`           | `Admin`    | `adminGuard` |

---

## 🔗 Integração frontend ↔ backend

- O frontend (porta **4200**) consome a API (porta **3000**) via `HttpClient`.
- O **interceptor** (`auth.interceptor.ts`) adiciona automaticamente o cabeçalho
  `Authorization: Bearer <token>` nas requisições autenticadas.
- O backend libera o **CORS** para `http://localhost:4200`.
