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
## Building and pushing the Docker image to Amazon ECR

Build the Docker image
```bash
docker build -t diagnostic-modality-integration-api .
```

Tag the built image with `DockerTag` so you can push it to this repository
```bash
docker tag diagnostic-modality-integration-api:${DockerTag} ${AWSAccountId}.dkr.ecr.us-east-2.amazonaws.com/diagnostic-modality-integration-api:${DockerTag}
```

Retrieve an authentication token and authenticate your Docker client to your registry using the AWS CLI
```bash$
aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin ${AWSAccountId}.dkr.ecr.us-east-2.amazonaws.com
```

Push the image to the AWS ECR repository:
```bash
docker push ${AWSAccountId}.dkr.ecr.us-east-2.amazonaws.com/diagnostic-modality-integration-api:${DockerTag}
```

## Integration Engine

### Events

The API Service can message the Integration Engine by pushing Events with the following structure:
- `id` UUID that identifies the event.
  - Type: String
  - Required
- `version` Version of the event schema.
  - Type: String
  - Required
- `type` Describes the type of event related to the originating occurrence.
  - Type: String
  - Required
- `data` Event-specific data. This MAY include a property `providerConfiguration` with specific credentials/endpoints/parameters related to the provider (as specified in the [Provider Configuration](https://linestudio.stoplight.io/docs/diagnostic-modality-integration/docs/providers/readme.md#how-to-configure-a-provider)), MAY include a `integrationOptions` property with the integration specific parameters created when an [integration is configured](https://linestudio.stoplight.io/docs/diagnostic-modality-integration/docs/getting-started.md#5-connect-the-practice-with-a-provider) and MAY include a property `payload` with any specific payload included in the User's originating request.
  - Type: Object
  - Optional 
  
For example, the event object generated to create an Order for Zoetis could look like:

```json
{
  "id": "28986494-8038-11eb-9439-0242ac130002",
  "version": "1.0.0",
  "type": "zoetis-v1.orders.create",
  "data": {
    "providerConfiguration": {
      "url": "https://qa.vetscanconnect.zoetis.com",
      "partnerId": "partner-id",
      "partnerToken": "TOKEN"
    },
    "integrationOptions": {
      "clientId": "f1cc5ab3-c563-47be-86f8-837e14a2228f"
    },
    "payload": {
      "integrationId": "<yourIntegrationId>",
      "patient": {
        "id": "659242ae-39ae-4b80-a543-3ab7a1ba2c41",
        "lastName": "Snow",
        "firstname": "John",
        "species": "CANINE",
        "sex": "FEMALE_INTACT",
        "birthdate": "2020-10-10",
        "breed": "BOXER",
        "weight": 10.0,
        "weightUnits": "KG"
      },
      "client": {
        "id": "c9dc355c-73b5-4258-b0b6-88784bbffc76",
        "lastName": "Corleone",
        "firstName": "Michael"
      },
      "notes": "Some notes here",
      "tests": [
        {
          "code": "HEM"
        }
      ],
      "veterinarian": {
        "id": "c9dc355c-73b5-4258-b0b6-88784bbffc76",
        "lastName": "Böse",
        "firstName": "Hannah"
      },
      "technician": "John Smith",
      "editable": false
    }
  }
}
```

#### Event types

Event types are specified in a hierarchical manner, according to the following hierarchy:
- Provider ID
  - Resource
    - Operation
    
The following are valid examples of event types:
- zoetis-v1.orders.create
- zoetis-v1.orders.cancel
- zoetis-v1.orders.tests.cancel
