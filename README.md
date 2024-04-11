## visão geral da api de autenticação

Api básica possuindo funcionalidades relacionadas a autenticação de usuários, validação de token, e geração de hash.

Esta bem simples, ideal pra quem está começando no desenvolvimento backend.
você pode conferir como o projeto está estruturado em `docs/structure.md`.

## tecnologias utilizadas

- Node js
- Typescript
- Express
- Jwt
- Zod
- MongoDB
- Prettier
- Eslint
- Husky

  ## Funcionalidades

- [x] Criar um usuário.
- [x] Logar o usuário gerando um token de acesso.
- [x] Validar se o token é válido
- [x] Vlidar se o token está presente no header da requisição

## Como rodar este projeto ?

- Primeiro clone este reposiório `git clone https://github.com/hebertsanto/API-authentication.git`
- Navegue até o projeto e instale as dependências com o comando `npm install` ou `npm i`
- Crie um arquivo `.env` e configure as variáveis de ambiente corretamente, você pode conferir em `.env.exemple` quais são as variáveis necessárias para o projeto.
- Tudo configurado ? agora você pode rodar o comando `npm run dev` e pronto !
- Depois é so configurar a url do cluster no projeto com a sua url, que está no diretório `database/index.ts`
