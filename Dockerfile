FROM node:12-alpine

WORKDIR /app

ADD yarn.lock /app

RUN yarn --frozen-lockfile