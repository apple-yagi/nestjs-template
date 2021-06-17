FROM node:12-stretch-slim AS builder

RUN yarn global add pkg

WORKDIR /app
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
RUN yarn install

COPY . /app
ENV NODE_ENV=production
RUN yarn build && \
    pkg --target node12-linux --output bin ./dist/main.js

FROM node:12-stretch-slim AS native-builder
WORKDIR /app
RUN yarn add grpc

FROM debian:stretch-slim
WORKDIR /app
COPY --from=builder /app/bin /app/bin
COPY --from=native-builder /app/node_modules /app/node_modules

EXPOSE 3000
CMD ["/bin"]