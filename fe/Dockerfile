FROM node:latest as build

ENV REACT_APP_API_URL='http://api:3500/api'

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json ./app/package-lock.json

RUN npm install
COPY . .
RUN npm run build