# Node-Express-Mongoose

- **JWT** - It uses JWT Token for Authentication.
- **Middleware for easier async/await** - Catches errors from routes and throws them to express error handler to prevent app crash due to uncaught errors.

## Requirements

### To install and run the project, [NodeJS](https://nodejs.org/en) v8+ is required.

## Installing dependencies

```bash
 npm i
```

# Development

---

## Start dev server

```bash
npm run start
```

## Add test data to DB

```bash
npm run seed
```

Running the above commands results in

- 🌏**API Server** running at `http://localhost:8080`
- 🛢️**MongoDB** running at `mongodb://127.0.0.1:27017/sibersApi`

## Environment

To edit environment variables, create a file with name `.env` and copy the contents from `.env` to start with.

| Var Name  | Type   | Default                                 | Description                               |
| --------- | ------ | --------------------------------------- | ----------------------------------------- |
| NODE_ENV  | string | `development`                           | API runtime environment. eg: `production` |
| PORT      | number | `8080`                                  | Port to run the API server on             |
| MONGO_URL | string | `mongodb://127.0.0.1:27017/sibersApi`   | URL for MongoDB                           |
| SECRET    | string | `iAmSuperBoy`                           | JWT Token's Secret Key                    |

## [Prettier](https://prettier.io/) configuration was used for development

### To start formatting code using [prettier](https://prettier.io/), you need to run the command

```bash
npm run format
```

## To earn the application, libraries such as:

- ### Dependencies

  - `bcrypt`
  - `cookie-parser`
  - `cors`
  - `dotenv`
  - `express`
  - `jsonwebtoken`

- ### DevDependencies

  - `prettier`

## Project team

---

+ ####  Arsen Chernov - [GitHub](https://github.com/SwireLGD)