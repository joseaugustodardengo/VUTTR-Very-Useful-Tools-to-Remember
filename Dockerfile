FROM node:lts-alpine

RUN mkdir /app

WORKDIR /app

COPY ./ /app

EXPOSE 3000

ENTRYPOINT ./init.sh
