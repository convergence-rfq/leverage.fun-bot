#!/bin/bash
docker build --build-arg ADMIN_KEYPAIR="${ADMIN_KEYPAIR}" -t leveragefunbot .
