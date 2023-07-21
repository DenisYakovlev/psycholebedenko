FROM node:16-alpine 
WORKDIR /app
COPY . .
ENV REACT_APP_BOT_NAME=Psycholebedenko_bot
RUN npm ci
RUN npm run build