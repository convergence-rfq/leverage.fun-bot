FROM 333356345985.dkr.ecr.ap-south-1.amazonaws.com/leveragefunbot:latest

WORKDIR /app

# RUN sh -c "$(curl -sSfL https://release.anza.xyz/edge/install)"
# ENV PATH="/root/.local/share/solana/install/active_release/bin:$PATH"

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

EXPOSE 8080

CMD [ "pnpm", "run", "start" ]
