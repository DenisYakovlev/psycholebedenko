FROM node:alpine
WORKDIR /app
COPY package.json .
RUN yes | npm i
COPY . .