## visão geral da api de autenticação

A API de Autenticação fornece um método seguro para autenticar usuários,
foi feita pra fortalecer meu conhecimento no desenvolvimento backend,
tem como funcionalidade

- [x] criar um usuário.
- [x] logar o usuário gerando um token de acesso.
- [ ] ter uma rota protegida que so permita quem estiver logado acessar o recuros.

## endpoints

### `/user`

- **Método:** POST
- **Descrição:** cria um novo usuário no sistema.
- **Parâmetros da Solicitação:**
  - `body`: nome,email, password
- **Exemplo de Resposta de Sucesso:**
- `status code 201`

  ```json
  {
    "msg": "user created successfully",
    "newUser": {
      "name": "nome usuário"
      "email": "email usuário",
      "password": "hash da senha"
   }
  }
  ```

### `/login`

- **Método** : POST
- **Descrição** : verifica se um usuário existe no banco de dados se existir loga no sistema, caso contrário exibe uma resposta informando o mesmo.
- **Parâmetros da Solicitação**
- `body`: email, password
- **Exemplos de Resposta de Sucesso**
- `status code 201`
- ```json
  {
    "msg": "user login and generated the token",
    "email": "email usuário",
    "token": "token de acesso do usuário"
  }
  ```
