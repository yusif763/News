FROM node:20.9.0 AS builder

WORKDIR /app

COPY package.json .

RUN npm install
COPY . .

EXPOSE 8080

CMD [ "npm", "run", "dev" ]