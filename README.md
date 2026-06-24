# Modelagem MEAN — Apostas da Copa do Mundo 2026

Sistema WEB de gerenciamento de apostas dos jogos da Copa do Mundo 2026,
desenvolvido utilizando a stack **MEAN (MongoDB, Express, Angular e Node.js)**.

O usuário se cadastra, recebe moedas virtuais, aposta nos jogos da Copa (tabela
oficial da FIFA, a partir de 25/06/2026) e acompanha seus resultados. O
administrador registra os placares e o sistema liquida as apostas
automaticamente.

> Projeto **acadêmico**. As apostas utilizam **moedas virtuais**, sem dinheiro
> real. Conteúdo meramente didático.

## Tecnologias Utilizadas

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT) + bcrypt

### Frontend
- Angular
- TypeScript
- HTML5
- CSS3

### Controle de Versão
- Git
- GitHub

---

## Estrutura do Projeto

```text
Trabalho-Desenvolvimento-Web-III/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── betController.js
│   │   │   └── gameController.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── models/
│   │   │   ├── Bet.js
│   │   │   ├── Game.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── betRoutes.js
│   │   │   └── gameRoutes.js
│   │   ├── seed/
│   │   │   └── seed.js
│   │   └── app.js
│   ├── server.js
│   ├── .env.example
│   ├── package-lock.json
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/          (models, services, guards, interceptors)
│   │   │   ├── pages/         (login, register, games, my-bets, admin)
│   │   │   ├── app.config.ts
│   │   │   ├── app.routes.ts
│   │   │   ├── app.html
│   │   │   ├── app.css
│   │   │   └── app.ts
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   ├── angular.json
│   ├── package.json
│   └── package-lock.json
│
├── docs/                      (casos de uso, wireframes, modelagem MongoDB...)
├── .gitignore
└── README.md
```

---

## Pré-requisitos

Instale antes de começar:

- [Node.js](https://nodejs.org/) 18 ou superior (inclui o `npm`)
- [Angular CLI](https://angular.dev/tools/cli): `npm install -g @angular/cli`
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- [Git](https://git-scm.com/)

---

## Como Clonar o Projeto

```bash
git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
cd SEU-REPOSITORIO
```

---

## Instalação das Dependências

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

---

## Configuração do Banco de Dados

Na pasta `backend`, crie o arquivo `.env` a partir do exemplo:

```bash
# Windows (PowerShell)
copy .env.example .env

# Linux / Mac / Git Bash
cp .env.example .env
```

Em seguida, popule o banco com os usuários e os jogos da Copa 2026:

```bash
npm run seed
```

> A configuração padrão usa o MongoDB local
> (`mongodb://127.0.0.1:27017/copaApostas`). Para rodar **sem instalar o
> MongoDB**, defina `USE_MEMORY_DB=true` no `.env` (sobe um MongoDB em memória).

---

## Executando o MongoDB

### Iniciar o MongoDB

Execute o PowerShell como administrador:

```powershell
Start-Service MongoDB
```

### Verificar o Status do MongoDB

Execute o PowerShell como administrador:

```powershell
Get-Service MongoDB
```

---

## Executando o Backend

Abra um terminal na pasta `backend` e execute:

```bash
cd backend
npm run dev
```

O servidor será iniciado em:

```text
http://localhost:3000
```

Exemplo de rota disponível:

```text
http://localhost:3000/api/games
```

---

## Executando o Frontend

Abra um terminal na pasta `frontend` e execute:

```bash
cd frontend
ng serve
```

A aplicação será iniciada em:

```text
http://localhost:4200
```

---

## Contas de Teste

O comando `npm run seed` cria as seguintes contas:

| Papel         | E-mail            | Senha      |
| ------------- | ----------------- | ---------- |
| Administrador | `admin@copa.com`  | `admin123` |
| Usuário       | `joao@email.com`  | `123456`   |
| Usuário       | `maria@email.com` | `123456`   |

---

## Documentação do Trabalho

A modelagem completa está na pasta [`docs/`](docs/):

| Item | Entregável                                | Local                                                |
| ---- | ----------------------------------------- | ---------------------------------------------------- |
| 1    | Casos de uso principais                   | [`docs/casos-de-uso.md`](docs/casos-de-uso.md)       |
| 2    | Layout das telas (wireframes)             | [`docs/wireframes/`](docs/wireframes/)               |
| 3    | Layout HTML                               | [`docs/layout-html/`](docs/layout-html/)             |
| 4    | Estrutura de diretórios (Angular/Express) | [`docs/estrutura-diretorios.md`](docs/estrutura-diretorios.md) |
| 5    | README de execução                        | este arquivo                                         |
| 6    | Estrutura de dados no MongoDB             | [`docs/modelagem-mongodb.md`](docs/modelagem-mongodb.md) |

---

## Informações Acadêmicas

- **Professor:** _[preencher]_
- **Curso:** _[preencher]_
- **Disciplina:** Desenvolvimento Web III
- **Semestre:** 2026/1
