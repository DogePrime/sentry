FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm clean
RUN pnpm run build-cli

WORKDIR /app/apps/cli/dist
# RUN node node.js
