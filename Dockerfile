FROM node:20-alpine as base
# ================================
RUN npm install -g pnpm
WORKDIR /app
COPY .npmrc package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

FROM base as builder
# ================================
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM base as release
# ================================
ENV NODE_ENV=production
ENV REDIS_URL="redis://host.docker.internal:6379"
COPY --from=builder /app/dist ./

CMD ["node", "server/main.js"]