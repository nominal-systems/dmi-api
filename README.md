# Diagnostic Modality Integration API
## Description

Repository for the DMI API built using [Nest](https://github.com/nestjs/nest).

## Installation

```bash
$ npm install
```

## Running the app
1. Create a `.env` file if it doesn't already exist. Take a look at the `.env.example` file for reference.
2. Change credentials such as the Database password in the `docker-compose*.yaml` files as you see fit, and make sure it's the same password in the `.env` file.
3. Choose one of the methods below

### Docker
```bash
# Development
$ docker-compose -f docker-compose.dev.yml up -d

# Production
$ docker-compose up -d
```

The `development` docker compose will take less time to build than production, while also allowing file watching.

### Local

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
