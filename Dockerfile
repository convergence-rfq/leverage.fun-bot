FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++ gcc

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

EXPOSE 8080

CMD [ "pnpm", "run", "start" ]
