FROM node:16-alpine 
WORKDIR /app
COPY . .
ENV REACT_APP_BOT_NAME=Psycholebedenko_bot
ENV REACT_APP_BACKEND_URL=http://localhost:8000
RUN npm ci
RUN npm run build