## STAGE: Base ##
FROM node:24-alpine as base
WORKDIR /app
ARG GHP_TOKEN

COPY package*.json .npmrc ./

# npm is pinned to 11.x: npm 12 enforces the install-scripts policy and blocks
# argon2's node-pre-gyp install (no allowScripts config here yet), producing an
# image without the native binding that crashes at boot. Move to npm 12 only
# together with an allowScripts approval for argon2/sqlite3/msgpackr-extract.
RUN apk add --no-cache --virtual build-base &&\
    npm install -g npm@11 node-gyp &&\
    npm install &&\
    apk del build-base &&\
    npm un -g node-gyp &&\
    rm -rf /var/cache/apk/*

RUN wget https://github.com/eficode/wait-for/releases/latest/download/wait-for -O /wait-for &&\
    chmod +x /wait-for

COPY . .

RUN chmod +x ./scripts/wait-for-all.sh &&\
    rm .npmrc


## STAGE: Seed ##
FROM base as seed
ENV NODE_ENV=seed
CMD ["npm", "run", "seed"]

## STAGE: Development ##
FROM node:24-alpine as development
ENV NODE_ENV=development
WORKDIR /app

COPY --from=base /app /app

VOLUME [ "/app" ]
EXPOSE 3000
CMD ["npm", "run", "start:dev"]

## STAGE: Build ##
FROM base as build
ENV NODE_ENV=production

RUN npm run build &&\
    npm prune --production

## STAGE: Production ##
FROM node:24-alpine as production
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/scripts scripts
COPY --from=build /app/dist dist
COPY --from=build /app/public public
COPY --from=build /app/node_modules node_modules
COPY --from=build /app/package.json .

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
