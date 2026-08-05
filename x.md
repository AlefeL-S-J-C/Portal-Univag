# 🎓 Portal do Aluno - UNIVAG

Sistema completo e integrado de autenticação, seleção de cursos e acesso ao Portal do Aluno UNIVAG. Este projeto foca atualmente no desenvolvimento de um **Frontend moderno** (Vue.js 3, PrimeVue e Tailwind CSS), já estruturado e planejado para futura integração com um Backend robusto (.NET).

---

## 📋 Sumário
1. [Características Principais](#-características-principais)
2. [Tecnologias Utilizadas](#-tecnologias-utilizadas)
3. [Início Rápido (Quickstart)](#-início-rápido-quickstart)
4. [Estrutura do Projeto](#-estrutura-do-projeto)
5. [Fluxos da Aplicação](#-fluxos-da-aplicação)
   - [Autenticação e Primeiro Acesso](#1-autenticação-e-primeiro-acesso)
   - [Recuperação de Senha](#2-recuperação-de-senha)
   - [Seleção de Cursos e Dashboard](#3-seleção-de-cursos-e-dashboard)
6. [Integração Backend (Endpoints Planejados)](#-integração-backend-endpoints-planejados)
7. [Segurança e Configurações](#-segurança-e-configurações)

---

## 🚀 Características Principais

- ✅ **Sistema de Login Completo:** Validação de CPF e Senha.
- ✅ **Primeiro Acesso em 4 Etapas:** Identificação, Validação de Email, Criação de Senha Segura e Sucesso.
- ✅ **Recuperação de Senha Segura:** Fluxo com timer regressivo, envio de token por e-mail e redefinição com validação de força.
- ✅ **Seleção Inteligente de Cursos:** Listagem de cursos do aluno com bloqueio de acesso para matrículas trancadas/inativas (Acesso Limitado).
- ✅ **Dashboard Dinâmico:** Visualização de disciplinas, horários, documentos e notificações.
- ✅ **Design Responsivo e Acessível:** Adaptado para Mobile, Tablet e Desktop, com notificações Toast e barra de progresso.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Vue.js 3** + **Vite**
- **PrimeVue** (Componentes UI)
- **Tailwind CSS** (Estilização utilitária)
- **Axios** e **Vue Router**

### Backend (Planejado)
- **.NET 10** (ASP.NET Core Web API)
- **Autenticação JWT** (Bearer Tokens)

---

## ⚡ Início Rápido (Quickstart)

### Pré-requisitos
- Node.js 16+

### 1. Configurando o Frontend
```bash
# Clone ou extraia o projeto
cd portal-univag/frontend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Defina VITE_API_URL para a URL da API (mock ou local) em .env.local

# Inicie o servidor de desenvolvimento
npm run dev
```
O frontend estará rodando em `http://localhost:5173`.

---

## 🏗️ Estrutura do Projeto

### Frontend (Vue.js)
```text
src/
├── components/
│   ├── CourseCard.vue
│   └── steps/ (StepIdentification, StepPasswordRecoveryEmail, etc.)
├── pages/
│   ├── LoginPage.vue
│   ├── PrimeiroAcessoPage.vue
│   ├── PasswordRecoveryPage.vue
│   ├── CoursesPage.vue
│   ├── LimitedAccessPage.vue
│   └── DashboardPage.vue
├── services/
│   └── api.js
└── router.js
```

---

## 🔄 Fluxos da Aplicação

### 1. Autenticação e Primeiro Acesso
- O usuário insere CPF e Senha em `/login`.
- Se for o primeiro acesso (`/primeiro-acesso`), ele fornece CPF e Matrícula. O sistema simula o envio de um token de 6 dígitos para o e-mail cadastrado. Após validação, ele cria uma senha forte (mínimo 8 caracteres, maiúsculas, minúsculas, números e símbolos).

### 2. Recuperação de Senha
- Rota: `/recuperacao-senha`.
- O usuário informa o e-mail.
- Recebe um código com timer (10 minutos de expiração, UI com contagem de 59s para reenvio).
- Cria e confirma nova senha.
- Redirecionamento automático após 10 segundos na tela de sucesso.

### 3. Seleção de Cursos e Dashboard
- Após o login, o usuário vai para `/cursos`.
- São listados os cursos vinculados ao usuário.
- Se o curso estiver **Ativo**, o usuário clica e é direcionado ao `/dashboard`.
- Se o curso estiver **Trancado/Suspenso**, o usuário é levado para `/acesso-limitado` informando pendências.
- **LocalStorage:** Guarda o `token` JWT, `user` (dados básicos) e o `selectedCourse`.

---

## 🔗 Integração Backend (Endpoints Planejados)

Abaixo estão os endpoints previstos para futura integração. O frontend deve consumi-los via Axios.

### Autenticação & Recuperação
| Método | Rota | Descrição |
|--------|------|-------------|
| `POST` | `/api/auth/login` | Realiza login e retorna JWT Token e dados do usuário |
| `POST` | `/api/auth/validate` | Valida CPF e Matrícula no primeiro acesso |
| `POST` | `/api/auth/verify-token` | Valida código de 6 dígitos enviado por e-mail |
| `POST` | `/api/auth/create-password`| Cria a senha no primeiro acesso |
| `POST` | `/api/auth/password-recovery/request` | Solicita código para esqueci a senha |
| `POST` | `/api/auth/password-recovery/reset` | Redefine a senha com token temporário |
| `POST` | `/api/auth/logout` | Realiza logout e invalida sessão |

### Cursos & Perfil
| Método | Rota | Descrição |
|--------|------|-------------|
| `GET`  | `/api/users/profile` | Retorna dados completos do perfil autenticado |
| `GET`  | `/api/users/courses` | Lista cursos vinculados ao aluno autenticado |
| `POST` | `/api/courses/validate-access` | Valida se o aluno pode acessar o curso específico |

---

## 🔒 Segurança e Configurações

### Práticas Adotadas no Frontend
1. **Validação Rigorosa:** Verificação de força de senha, formato de e-mail e CPF no lado do cliente para melhor UX.
2. **Armazenamento de Sessão:** Gerenciamento de estado de usuário e cursos via LocalStorage (planejado migrar tokens para HttpOnly cookies quando o backend for acoplado).
3. **Proteção de Rotas:** Utilização do Vue Router com *Navigation Guards* para impedir acesso a páginas internas sem autenticação.

---
*Documentação do módulo de Frontend (Autenticação, Primeiro Acesso, Recuperação de Senha e Seleção de Cursos) do Portal UNIVAG.*
