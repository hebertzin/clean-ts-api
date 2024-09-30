## Authentication service

Basic API with functionalities related to user authentication, token validation, and hash generation.

It's very simple, ideal for those just starting out in backend development.
you can check how the project is structured in `docs/structure.md`.

## technologies used

- Node js
- Typescript
- Express
- Jwt
- Zod
- MongoDB
- Prettier
- Eslint
- Husky

## Functionalities

- [x] Create a user.
- [x] Log the user in by generating an access token.
- [x] Validate if the token is valid
- [x] Check if the token is present in the request header
- [ ] It is possible log out

## **Endpoints**

- **POST** `/api/v1/authentication/user/register`: Register a user
- **POST** `/api/v1/authentication/user/access-token` : Log in a user and generate a token access

## How to run this project?

- First clone this repository `git clone https://github.com/hebertsanto/API-authentication.git`
- Navigate to the project and install dependencies with the `npm install` or `npm i` command
- Create a `.env` file and configure the environment variables correctly, you can check in `.env.exemple` which variables are necessary for the project.
- Everything configured? Now you can run the command `npm run start:dev` and that's it!

## Deploy

The service is hosted on @render and will soon be integrated with a front end
