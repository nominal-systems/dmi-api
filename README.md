# Diagnostic Modality Integration API

Repository for the DMI API built using [Nest](https://github.com/nestjs/nest).

[![Build and Deploy - Staging](https://github.com/nominal-systems/dmi-api/actions/workflows/build-deploy-staging.yml/badge.svg?branch=main&event=push)](https://github.com/nominal-systems/dmi-api/actions/workflows/build-deploy-staging.yml)

## Installation

```bash
$ npm install
```

## Running the app
1. Create a `.env` file if it doesn't already exist. You can also provide environment specific files like `.env.dev` or `.env.docker` and set `NODE_ENV` accordingly. The application loads `.env.<NODE_ENV>` first (if present) and falls back to `.env`. See `.env.example` for reference.
2. Change credentials such as the Database password in the `docker-compose*.yaml` files as you see fit, and make sure it's the same password in the `.env` file.
3. Choose one of the methods below
4. Run `npm run migration:run` to sync the database

### Docker
```bash
# Production
$ docker-compose up -d

# Development (only MySQL, Mongo, ActiveMQ)
$ docker-compose up -d mysql mongo activemq
```

#### Customizing configuration and persistence location for ActiveMQ

By default data and configuration is stored inside the container and will be
lost after the container has been shut down and removed. To persist these
files you can mount these directories to directories on your host system:

    docker run -p 61616:61616 -p 8161:8161 \
               -v /your/persistent/dir/conf:/opt/activemq/conf \
               -v /your/persistent/dir/data:/opt/activemq/data \
               rmohr/activemq

ActiveMQ expects that some configuration files already exists, so they won't be
created automatically, instead you have to create them on your own before
starting the container. If you want to start with the default configuration you
can initialize your directories using some intermediate container:

    docker run --user root --rm -ti \
      -v /your/persistent/dir/conf:/mnt/conf \
      -v /your/persistent/dir/data:/mnt/data \
      rmohr/activemq:5.15.4-alpine /bin/sh

This will bring up a shell, so you can just execute the following commands
inside this intermediate container to copy the default configuration to your
host directory:

    chown activemq:activemq /mnt/conf
    chown activemq:activemq /mnt/data
    cp -a /opt/activemq/conf/* /mnt/conf/
    cp -a /opt/activemq/data/* /mnt/data/
    exit

The last command will stop and remove the intermediate container. Your
directories are now initialized and you can run ActiveMQ as described above.

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

## Building

### Docker image

In order to build the Docker image for the DMI API run:
```
npm run docker:build
```
Note that this script expects an environment variable `GHP_TOKEN` to be set with a valid GitHub Personal Access Token with [permissions to download packages](https://docs.github.com/en/packages/learn-github-packages/about-permissions-for-github-packages#about-scopes-and-permissions-for-package-registries) from GitHub Package Registry.

This will build a docker image `nominal-systems/dmi-api`.

## Configuration

Configuration is done through environment variables that can be set explicitly or loaded from environment files. When `NODE_ENV` is set, the application first looks for a `.env.<NODE_ENV>` file and then falls back to `.env`. The TypeORM CLI uses the same logic so migrations and other commands share the configuration. See [.env.example](.env.example).

The following environment variables are accepted to configure the application:

| Name                      | Description                                                                                                                                                     |
|---------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `PORT`                    | The port were the application will listen for HTTP connections.                                                                                                 |
| `JWT_SECRET_KEY`          | Symmetric key for signing/verifying the [JWT](https://jwt.io/) token for authentication.                                                                        |
| `SECRET_KEY`              | The raw key used for AES-256 CTR database encryption.                                                                                                           |
| `ADMIN_USERNAME`          | The admin user name. See [Admin User](https://nominal.stoplight.io/docs/dmi/users#admin-user) in the API documentation.                                         |
| `ADMIN_PASSWORD`          | The admin user password.                                                                                                                                        |
| `DATABASE_TYPE`           | RDBMS database engine type. Supported values: `mysql`.                                                                                                          |
| `DATABASE_HOST`           | Database host.                                                                                                                                                  |
| `DATABASE_PORT`           | Database host port. Default mysql port is 3306.                                                                                                                 |
| `DATABASE_DATABASE`       | Database name.                                                                                                                                                  |
 | `DATABASE_RUN_MIGRATIONS` | Whether to run database migrations of application startup. Should be set to `true` in productive environments.                                                  |
| `MONGO_URI`               | MongoDB connection URI string. See [Connection String URI Format](https://www.mongodb.com/docs/manual/reference/connection-string/) in MongoDB's documentation. |
| `ACTIVEMQ_PROTOCOL`       | ActiveMQ protocol. Supported values: `mqtt`.                                                                                                                    |
| `ACTIVEMQ_HOSTNAME`       | ActiveMQ broker host.                                                                                                                                           |                       
| `ACTIVEMQ_PORT`           | ActiveMQ broker port.                                                                                                                                           |
| `ACTIVEMQ_USERNAME`       | ActiveMQ username required by the broker, if any.                                                                                                               |
| `ACTIVEMQ_PASSWORD`       | ActiveMQ password required by the broker, if any.                                                                                                               |


## Application

### Mapped Routes

The following routes are mapped by the application

| Method | Path                                              | Security Scheme |
|--------|---------------------------------------------------|-----------------|
| POST   | `/users`                                          | Basic Auth      |
| GET    | `/users`                                          | Basic Auth      |
| GET    | `/users/:id`                                      | Basic Auth      |
| POST   | `/users/auth`                                     | Unsecured       |
| GET    | `/users/me`                                       | Bearer Auth     |
| PUT    | `/users/me/password`                              | Bearer Auth     |
| GET    | `/organizations/:id`                              | Bearer Auth     |
| POST   | `/organizations`                                  | Bearer Auth     |
| GET    | `/organizations/:id/keys`                         | Bearer Auth     |
| PUT    | `/organizations/:id/keys`                         | Bearer Auth     |
| GET    | `/providers`                                      | API Key         |
| GET    | `/providers/:id`                                  | API Key         |
| GET    | `/providers/:id/services`                         | API Key         |
| GET    | `/providers/configurations`                       | API Key         |
| GET    | `/providers/:id/configurations`                   | API Key         |
| POST   | `/providers/:id/configurations`                   | API Key         |
| GET    | `/providers/:providerId/configurations/:configId` | API Key         |
| DELETE | `/providers/:providerId/configurations/:configId` | API Key         |
| GET    | `/providers/:id/devices`                          | API Key         |
| GET    | `/providers/:id/refs`                             | API Key         |
| GET    | `/integrations`                                   | API Key         |
| GET    | `/integrations/:id`                               | API Key         |
| POST   | `/integrations`                                   | API Key         |
| DELETE | `/integrations/:id`                               | API Key         |
| GET    | `/practices`                                      | API Key         |
| GET    | `/practices/:id`                                  | API Key         |
| POST   | `/practices`                                      | API Key         |
| DELETE | `/practices/:id`                                  | API Key         |
| GET    | `/orders`                                         | API Key         |
| GET    | `/orders/:id`                                     | API Key         |
| POST   | `/orders/:id/tests`                               | API Key         |
| DELETE | `/orders/:id/tests/:testCode`                     | API Key         |
| GET    | `/orders/:id/result.json`                         | API Key         |
| GET    | `/orders/:id/result.pdf`                          | API Key         |
| GET    | `/orders/:id/report`                              | API Key         |
| POST   | `/orders`                                         | API Key         |
| DELETE | `/orders/:id`                                     | API Key         |
| GET    | `/events`                                         | API Key         |
| GET    | `/event-subscriptions`                            | API Key         |
| GET    | `/event-subscriptions/:id`                        | API Key         |
| POST   | `/event-subscriptions`                            | API Key         |
| DELETE | `/event-subscriptions/:id`                        | API Key         |
| GET    | `/reports/:id`                                    | API Key         |
| GET    | `/refs/sexes`                                     | API Key         |
| GET    | `/refs/sexes/:providerId`                         | API Key         |
| GET    | `/refs/species`                                   | API Key         |
| GET    | `/refs/species/:providerId`                       | API Key         |
| GET    | `/refs/breeds`                                    | API Key         |
| GET    | `/refs/breeds/:providerId`                        | API Key         |
