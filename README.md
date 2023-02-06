# Diagnostic Modality Integration API

Repository for the DMI API built using [Nest](https://github.com/nestjs/nest).

[![Build and Deploy - Staging](https://github.com/nominal-systems/dmi-api/actions/workflows/build-deploy-staging.yml/badge.svg?branch=main&event=push)](https://github.com/nominal-systems/dmi-api/actions/workflows/build-deploy-staging.yml)

## Installation

```bash
$ npm install
```

## Running the app
1. Create a `.env` file if setting up locally, or `.env.docker` if using docker-compose, if it doesn't already exist. Take a look at the `.env.example` file for reference.
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

Configuration is done though environment variables that can be set explicitly or read from a `.env` file in the root of this repository. See [.env.example](.env.example).

The following environment variables are accepted to configure the application:

| Name                | Description                                               |
|---------------------|-----------------------------------------------------------|
| `PORT`              | The port were the application will listen for connections |
| `JWT_SECRET_KEY`    | Secret for the JWT authentication                         |
| `SECRET_KEY`        | The secret key used for encryption                        |
| `ADMIN_USERNAME`    | The admin user name                                       |
| `ADMIN_PASSWORD`    | The admin user password                                   |
| `DATABASE_TYPE`     | RDBMS database engine type, e.g. "mysql"                  |
| `DATABASE_HOST`     | Database host                                             |
| `DATABASE_PORT`     | Database host port                                        |
| `DATABASE_DATABASE` | Database name                                             |
| `MONGO_URI`         | MongoDB connection URI                                    |
| `ACTIVEMQ_PROTOCOL` | ActiveMQ protocol, e.g. "mqtt"                            |
| `ACTIVEMQ_HOSTNAME` | ActiveMQ host                                             |                       
| `ACTIVEMQ_PORT`     | ActiveMQ port                                             |
| `ACTIVEMQ_USERNAME` | ActiveMQ username                                         |
| `ACTIVEMQ_PASSWORD` | ActiveMQ password                                         |
