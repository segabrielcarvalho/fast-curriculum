# Fast Curriculum

O Fast Curriculum é uma plataforma inovadora que auxilia candidatos a emprego na criação de currículos personalizados adaptados a descrições de vagas específicas. Ao inserir a descrição da vaga, o sistema gera um currículo personalizado usando as informações do usuário, otimizando suas chances no competitivo mercado de trabalho. Este repositório contém a API backend construída com Node.js, NestJS e GraphQL.

## Índice

- [Fast Curriculum](#fast-curriculum)
  - [Índice](#índice)
  - [Funcionalidades](#funcionalidades)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Como Começar](#como-começar)
    - [Pré-requisitos](#pré-requisitos)
    - [Instalação](#instalação)
  - [Configuração para a API](#configuração-para-a-api)
    - [Execução da API](#execução-da-api)
  - [Configuração para o Frontend](#configuração-para-o-frontend)
    - [Execução do Frontend](#execução-do-frontend)
  - [Configuração para o Painel Admin](#configuração-para-o-painel-admin)
    - [Execução do Painel](#execução-do-painel)
  - [Documentação da API](#documentação-da-api)
  - [Exemplos de Query e Mutation](#exemplos-de-query-e-mutation)
    - [Login](#login)
    - [Me (Pegar o usuário logado)](#me-pegar-o-usuário-logado)
  - [Documentação da API](#documentação-da-api-1)
  - [Exemplos de Query e Mutation](#exemplos-de-query-e-mutation-1)
    - [Login](#login-1)
    - [Me (Pegar o usuário logado)](#me-pegar-o-usuário-logado-1)
  - [Licença](#licença)

## Funcionalidades

-  **Autenticação e Autorização de Usuário**: Registro e login seguros com JWT.
-  **Gerenciamento de Perfil**: Usuários podem gerenciar suas informações pessoais, experiência profissional, educação e habilidades.
-  **Geração de Currículos**: Integração com a OpenAI para gerar currículos personalizados com base nas descrições de vagas.
-  **Notificações**: Notificações em tempo real e alertas por e-mail para ações importantes.

## Tecnologias Utilizadas

-  **Node.js**: Ambiente de execução JavaScript.
-  **NextJS 14**: Ambiente Web
-  **NestJS**: Framework progressivo para construir aplicações server-side eficientes e escaláveis com Node.js.
-  **GraphQL**: Linguagem de consulta para APIs, fornecendo uma alternativa mais eficiente e flexível ao REST.
-  **Prisma**: ORM de última geração para Node.js e TypeScript.
-  **TypeScript**: Superconjunto tipado do JavaScript que compila para JavaScript puro.
-  **JWT (jsonwebtoken)**: Para autenticação e autorização.
-  **Bcrypt**: Biblioteca para auxiliar na hash de senhas.
-  **Class Validator e Class Transformer**: Para validação e transformação de dados de requisição.
-  **Dotenv**: Carrega variáveis de ambiente de um arquivo `.env`.
-  **Nodemon**: Utilitário que monitora alterações no código-fonte e reinicia automaticamente o servidor.
-  **Jest**: Framework de testes para JavaScript.
-  **Docker**: Plataforma de conteinerização para ambientes de desenvolvimento e implantação consistentes.
-  **SDK do Mercado Pago**: Integração para processamento de pagamentos.
-  **API da OpenAI**: Integração para geração e análise de currículos.

## Como Começar

### Pré-requisitos

Para testar as funcionalidades básicas, como criação de usuário e login:

-  **Node.js** (versão 18 ou superior)
-  **Docker** e _Docker Compose_ (para conteinerização)
-  **pnpm** (versão 9 ou superior)

   Para testar as funcionalidades de geração de currículos e integração de pagamentos, você precisará de:

-  **Chave de API da OpenAI**
-  **Credenciais do Mercado Pago**

### Instalação

1. **Clone o repositório principal**:

   Primeiro, clone o repositório principal do projeto para o seu ambiente local:

   ```bash
   git clone https://github.com/segabrielcarvalho/fast-curriculum.git
   cd fast-curriculum
   ```

2. **Suba os containers Docker**:

   Suba os serviços do banco de dados e outros componentes necessários utilizando Docker. Garanta que o Docker esteja em execução:

   ```bash
   docker compose up
   ```

3. **Clone os repositórios das aplicações**:

   Crie um diretório para os módulos da aplicação e clone os repositórios:

   ```bash
   mkdir apps
   cd apps
   git clone https://github.com/segabrielcarvalho/fast-curriculum-api.git
   git clone https://github.com/segabrielcarvalho/fast-curriculum-web.git
   git clone https://github.com/segabrielcarvalho/fast-curriculum-admin-web.git
   ```

## Configuração para a API

4. **Entre na pasta da API**:

   Acesse o diretório da API para realizar a configuração:

   ```bash
   cd fast-curriculum-api
   ```

5. **Instale as dependências**:

   Instale todas as dependências necessárias utilizando o `pnpm`:

   ```bash
   pnpm install
   ```

6. **Configure as variáveis de ambiente**:

   Copie o arquivo `.env.example` para criar um novo arquivo `.env`:

   ```bash
   cp .env.example .env
   ```

   As variáveis para testes básicos já estão configuradas. Os módulos do Mercado Pago e da OpenAI permanecerão desativados até que as respectivas chaves sejam adicionadas.

7. **Execute as migrações do banco de dados**:

   Para criar a estrutura do banco de dados, execute as migrações:

   ```bash
   pnpm db:deploy
   ```

8. **Gere o cliente Prisma**:

   Gere o cliente Prisma para interação com o banco de dados:

   ```bash
   pnpm generate
   ```

9. **População inicial do banco de dados**:

   Popule o banco de dados com o usuário principal executando:

   ```bash
   pnpm db:seed
   ```

### Execução da API

-  **Modo de Desenvolvimento**:

   ```bash
   pnpm start:dev
   ```

-  **Modo de Produção**:

   ```bash
   pnpm build
   pnpm start:prod
   ```

## Configuração para o Frontend

1. **Entre na pasta do Frontend**:

   Acesse o diretório do frontend para realizar a configuração:

   ```bash
   cd ../fast-curriculum-web
   ```

2. **Instale as dependências**:

   Instale todas as dependências necessárias utilizando o `pnpm`:

   ```bash
   pnpm install
   ```

3. **Configure as variáveis de ambiente**:

   Copie o arquivo `.env.local.example` para criar um novo arquivo `.env.local` (os valores para desenvolvimento já estão configurados):

   ```bash
   cp .env.local.example .env.local
   ```

### Execução do Frontend

-  **Modo de Desenvolvimento**:

   ```bash
   pnpm start:dev
   ```

-  **Modo de Produção**:

   ```bash
   pnpm build
   pnpm start
   ```

## Configuração para o Painel Admin

1. **Entre na pasta do Admin**:

   Acesse o diretório do frontend para realizar a configuração:

   ```bash
   cd ../fast-curriculum-admin-web
   ```

2. **Instale as dependências**:

   Instale todas as dependências necessárias utilizando o `pnpm`:

   ```bash
   pnpm install
   ```

3. **Configure as variáveis de ambiente**:

   Copie o arquivo `.env.local.example` para criar um novo arquivo `.env.local` (os valores para desenvolvimento já estão configurados):

   ```bash
   cp .env.local.example .env.local
   ```

### Execução do Painel

-  **Modo de Desenvolvimento**:

   ```bash
   pnpm start:dev
   ```

-  **Modo de Produção**:

   ```bash
   pnpm build
   pnpm start
   ```

## Documentação da API

A API do Fast Curriculum utiliza **GraphQL**. Uma vez que a aplicação esteja em execução, você pode acessar o **GraphQL Playground** em:

```bash
http://localhost:3000/graphql
```

Explore as queries, mutations e subscriptions disponíveis.

## Exemplos de Query e Mutation

### Login

```graphql
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
```

### Me (Pegar o usuário logado)

```graphql
query Me {
  me {
    id
    isActive
    lastLogin
    name
    role
    email
    document
    createdAt
    avatarUrl
  }
}
```



## Documentação da API

A API do Fast Curriculum utiliza **GraphQL**. Uma vez que a aplicação esteja em execução, você pode acessar o **GraphQL Playground** em:

```bash
http://localhost:3000/graphql
```

Explore as queries, mutations e subscriptions disponíveis.

## Exemplos de Query e Mutation

### Login

```graphql
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
```

### Me (Pegar o usuário logado)

```graphql
query Me {
  me {
    id
    isActive
    lastLogin
    name
    role
    email
    document
    createdAt
    avatarUrl
  }
}
```

## Licença

Este projeto está licenciado sob a **Licença MIT**. Consulte o arquivo LICENSE para mais detalhes.
