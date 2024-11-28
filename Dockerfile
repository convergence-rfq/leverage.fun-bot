FROM node:20-alpine

RUN apk add --no-cache curl bash

WORKDIR /app

RUN sh -c "$(curl -sSfL https://release.anza.xyz/edge/install)"
ENV PATH="/root/.local/share/solana/install/active_release/bin:$PATH"

RUN mkdir -p /root/.config/solana

ARG SOLANA_PRIVATE_KEY
RUN echo "${SOLANA_PRIVATE_KEY}" > /root/.config/solana/5kRot8UnMEqoDkAc72e7pqaEaF5hxGmbDNowMmPiCDmb.json && \
    chmod 600 /root/.config/solana/5kRot8UnMEqoDkAc72e7pqaEaF5hxGmbDNowMmPiCDmb.json

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

EXPOSE 8080

CMD [ "pnpm", "run", "start" ]
