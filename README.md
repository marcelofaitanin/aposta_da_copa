# ⚽ CopaApostas 2026 — Sistema Web de Gerenciamento de Apostas (MEAN Stack)

Sistema web para **gerenciamento de apostas nos jogos da Copa do Mundo 2026**,
desenvolvido com a stack **MEAN** (**M**ongoDB, **E**xpress, **A**ngular,
**N**ode.js). O usuário se cadastra, recebe moedas virtuais, aposta nos jogos
(a partir de **25/06/2026**) e acompanha seus resultados; o administrador
registra os placares e o sistema liquida as apostas automaticamente.

> 🔞 **Aviso:** projeto **acadêmico**. As apostas usam **moedas virtuais**, sem
> dinheiro real. Conteúdo meramente didático.

---

## 📑 Sumário

- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Como executar (passo a passo)](#-como-executar-passo-a-passo)
  - [1. Banco de dados (MongoDB)](#1-banco-de-dados-mongodb)
  - [2. Backend (Express + Node)](#2-backend-express--node)
  - [3. Frontend (Angular)](#3-frontend-angular)
- [Contas de teste](#-contas-de-teste)
- [Documentação do trabalho](#-documentação-do-trabalho)
- [Endpoints da API](#-endpoints-da-api)

---

## ✨ Funcionalidades

- **Cadastro e login** de usuários com autenticação **JWT**.
- **Listagem dos jogos** da Copa 2026 com cotações (odds) de Casa / Empate / Fora.
- **Apostas** com moedas virtuais: o saldo é debitado e a odd é "congelada".
- **Minhas apostas:** histórico com situação (pendente / ganha / perdida) e retorno.
- **Painel de administrador:** registrar placares e **encerrar jogos**, com
  **liquidação automática** das apostas (vencedores recebem o prêmio no saldo).
- Controle de acesso por **papéis** (usuário comum × administrador).

---

## 🛠 Tecnologias

| Camada      | Tecnologia                                   |
| ----------- | -------------------------------------------- |
| Banco       | MongoDB + Mongoose (ODM)                     |
| Backend     | Node.js + Express (API REST)                 |
| Frontend    | Angular 22 (standalone components + Signals) |
| Autenticação| JSON Web Token (JWT) + bcrypt                |

---

## 📁 Estrutura do projeto

```
Trabalho-Desenvolvimento-Web-III/
├── backend/         → API REST (Express + Node + Mongoose)
├── frontend/        → Aplicação Angular
├── docs/            → Documentação do trabalho (casos de uso, wireframes, etc.)
└── README.md        → Este arquivo
```

Detalhes completos em [`docs/estrutura-diretorios.md`](docs/estrutura-diretorios.md).

---

## ✅ Pré-requisitos

Instale antes de começar:

- **[Node.js](https://nodejs.org/)** 18+ (inclui o `npm`)
- **[Angular CLI](https://angular.dev/tools/cli)** — instale globalmente:
  ```bash
  npm install -g @angular/cli
  ```
- **[MongoDB Community Server](https://www.mongodb.com/try/download/community)** —
  rodando localmente (veja a etapa 1).
- **[Git](https://git-scm.com/)** (para clonar o repositório).

---

## 🚀 Como executar (passo a passo)

> 💡 Você vai precisar de **dois terminais abertos**: um para o backend e outro
> para o frontend.

Primeiro, clone o repositório:

```bash
git clone <URL-DO-SEU-REPOSITORIO>
cd Trabalho-Desenvolvimento-Web-III
```

### 1. Banco de dados (MongoDB)

Você tem **três opções**. Escolha **uma**:

#### Opção A — MongoDB local (padrão) ✅

Instale o **MongoDB Community Server**. No Windows ele já roda como serviço
automático. Para conferir/iniciar o serviço (PowerShell como administrador):

```powershell
Get-Service MongoDB          # deve aparecer "Running"
Start-Service MongoDB        # caso não esteja rodando
```

A URL padrão usada pelo projeto é `mongodb://127.0.0.1:27017/copaApostas`
(nenhuma configuração extra é necessária).

#### Opção B — Sem instalar nada (MongoDB em memória) 🧪

No arquivo `backend/.env`, defina `USE_MEMORY_DB=true`. O projeto sobe um
MongoDB temporário automaticamente. **Atenção:** os dados são apagados ao
reiniciar o servidor.

#### Opção C — MongoDB Atlas (nuvem) ☁️

Crie um cluster grátis no [Atlas](https://www.mongodb.com/atlas), pegue a
connection string e coloque em `backend/.env` na variável `MONGODB_URI`.

### 2. Backend (Express + Node)

No **primeiro terminal**:

```bash
cd backend

# 1. Instale as dependências
npm install

# 2. Crie o arquivo de configuração a partir do exemplo
#    (Windows PowerShell)
copy .env.example .env
#    (Linux/Mac/Git Bash)
cp .env.example .env

# 3. Popule o banco com os usuários e jogos da Copa 2026
npm run seed

# 4. Suba a API
npm start
```

A API ficará disponível em **http://localhost:3000**
(teste o healthcheck em http://localhost:3000/api/health).

### 3. Frontend (Angular)

No **segundo terminal**:

```bash
cd frontend

# 1. Instale as dependências
npm install

# 2. Suba o servidor de desenvolvimento
ng serve
#   (ou, sem o Angular CLI global:  npx ng serve)
```

Abra o navegador em **http://localhost:4200** 🎉

---

## 👤 Contas de teste

O `npm run seed` cria estas contas:

| Papel         | E-mail            | Senha      |
| ------------- | ----------------- | ---------- |
| Administrador | `admin@copa.com`  | `admin123` |
| Usuário       | `joao@email.com`  | `123456`   |
| Usuário       | `maria@email.com` | `123456`   |

> Você também pode criar uma conta nova pela tela de **Cadastro** (ganha
> R$ 1.000 em moedas virtuais).

---

## 📚 Documentação do trabalho

Todos os artefatos pedidos no enunciado estão na pasta [`docs/`](docs/):

| Item | Entregável                          | Arquivo                                                        |
| ---- | ----------------------------------- | ------------------------------------------------------------- |
| 1    | Casos de uso principais             | [`docs/casos-de-uso.md`](docs/casos-de-uso.md)                |
| 2    | Layout das telas (wireframes)       | [`docs/wireframes/`](docs/wireframes/)                        |
| 3    | Layout HTML                         | [`docs/layout-html/`](docs/layout-html/)                      |
| 4    | Estrutura de diretórios (Angular/Express) | [`docs/estrutura-diretorios.md`](docs/estrutura-diretorios.md) |
| 5    | README (este arquivo)               | `README.md`                                                   |
| 6    | Estrutura de dados no MongoDB       | [`docs/modelagem-mongodb.md`](docs/modelagem-mongodb.md)      |

---

## 🔌 Endpoints da API

| Método | Rota                      | Acesso  | Descrição                              |
| ------ | ------------------------- | ------- | -------------------------------------- |
| POST   | `/api/auth/register`      | Público | Cria conta e retorna token             |
| POST   | `/api/auth/login`         | Público | Autentica e retorna token              |
| GET    | `/api/auth/me`            | Usuário | Dados do usuário autenticado           |
| GET    | `/api/games`              | Público | Lista jogos (`?status=agendado`)       |
| GET    | `/api/games/:id`          | Público | Detalhe de um jogo                     |
| POST   | `/api/games`              | Admin   | Cria um jogo                           |
| PUT    | `/api/games/:id`          | Admin   | Atualiza um jogo                       |
| POST   | `/api/games/:id/result`   | Admin   | Registra placar e liquida apostas      |
| POST   | `/api/bets`               | Usuário | Cria uma aposta                        |
| GET    | `/api/bets/me`            | Usuário | Lista as apostas do usuário            |

As rotas protegidas exigem o cabeçalho `Authorization: Bearer <token>`.
