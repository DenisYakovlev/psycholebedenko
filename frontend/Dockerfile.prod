FROM node:16-alpine 
WORKDIR /app
COPY . .
ENV REACT_APP_BOT_NAME=Psycholebedenko_bot
ENV REACT_APP_BACKEND_URL=https://api.psycholebedenko.online
RUN npm ci
RUN npm run build