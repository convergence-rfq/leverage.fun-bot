#!/bin/bash
docker build --build-arg SOLANA_PRIVATE_KEY="$ADMIN_KEYPAIR" -t leveragefunbot .