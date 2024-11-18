# Fast Curriculum API

O Fast Curriculum é uma plataforma inovadora que auxilia candidatos a emprego na criação de currículos personalizados adaptados a descrições de vagas específicas. Ao inserir a descrição da vaga, o sistema gera um currículo personalizado usando as informações do usuário, otimizando suas chances no competitivo mercado de trabalho. Este repositório contém a API backend construída com Node.js, NestJS e GraphQL.

## Índice

- [Fast Curriculum API](#fast-curriculum-api)
  - [Índice](#índice)
  - [Funcionalidades](#funcionalidades)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Como Começar](#como-começar)
    - [Pré-requisitos](#pré-requisitos)
    - [Instalação](#instalação)
    - [Execução](#execução)
  - [Documentação da API](#documentação-da-api)
  - [Exemplos de Query e Mutation](#exemplos-de-query-e-mutation)
    - [Login](#login)
    - [Me (Pegar o Usuario Logado)](#me-pegar-o-usuario-logado)
  - [Licença](#licença)

## Funcionalidades

-  **Autenticação e Autorização de Usuário**: Registro e login seguros com JWT.
-  **Gerenciamento de Perfil**: Usuários podem gerenciar suas informações pessoais, experiência profissional, educação e habilidades.
-  **Geração de Currículos**: Integração com a OpenAI para gerar currículos personalizados com base nas descrições de vagas.
-  **Notificações**: Notificações em tempo real e alertas por e-mail para ações importantes.

## Tecnologias Utilizadas

-  **Node.js**: Ambiente de execução JavaScript.
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

1. **Clone o repositório**:

   Primeiro, clone o repositório do projeto para o seu ambiente local:

   ```bash
   git clone https://github.com/segabrielcarvalho/fast-curriculum.git
   cd fast-curriculum
   ```

2. **Entre na Pasta da API**:

   Após clonar o repositório, navegue até a pasta da API para executar os próximos comandos:

   ```bash
   cd apps/api
   ```

3. **Instale as dependências**:

   Em seguida, instale todas as dependências necessárias usando o `pnpm`:

   ```bash
   pnpm install
   ```

4. **Configure as variáveis de ambiente**:

   Copie o arquivo `.env.example` para um novo arquivo `.env`:

   ```bash
   cp .env.example .env
   ```

   Neste arquivo `.env`, as variáveis para testes básicos (que não requerem sistemas externos) já estão configuradas. Os módulos do Mercado Pago e da OpenAI permanecerão desativados até que as respectivas chaves sejam adicionadas.

5. **Execute o Docker Compose**:

   Agora, suba os serviços do banco de dados e demais componentes necessários com Docker. Garanta que o Docker esteja em execução em sua máquina:

   ```bash
   docker-compose up -d
   ```

6. **Execute as migrações do banco de dados**:

   Para criar a estrutura do banco de dados, execute as migrações usando o comando abaixo:

   ```bash
   pnpm db:deploy
   ```

7. **Gere o Cliente Prisma**:

   Para gerar o cliente Prisma, execute o comando abaixo:

   ```bash
   pnpm generate
   ```

8. **População Inicial do Banco de Dados com Usuário Principal**

   Popule o banco de dados com o usuário principal executando:

   ```bash
   pnpm db:seed
   ```

### Execução

-  **Modo de Desenvolvimento**:

   ```bash
   pnpm start:dev
   ```

-  **Modo de Produção**:

   ```bash
   pnpm build
   pnpm start:prod
   ```

## Documentação da API

A API do Fast Curriculum utiliza **GraphQL**. Uma vez que a aplicação esteja em execução, você pode acessar o **GraphQL Playground** em:

```bash
http://localhost:3000/graphql
```

Aqui você pode explorar as queries, mutations e subscriptions disponíveis.

## Exemplos de Query e Mutation

### Login

```bash
mutation Login($email: String!, $password: String!) {
login(email: $email, password: $password) {
   token
   }
}
```

### Me (Pegar o Usuario Logado)

```bash
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
