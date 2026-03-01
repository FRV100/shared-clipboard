# === Étape 1 : Frontend ===
FROM node:20-alpine AS frontend
WORKDIR /web

COPY web/package*.json ./
RUN npm install

COPY web/ .
RUN npm run build

# === Étape 2 : Backend ===
FROM oven/bun:alpine
WORKDIR /app

COPY backend/package.json backend/bun.lockb* ./
RUN bun install --production

COPY backend/ .
COPY --from=frontend /web/dist ./public

EXPOSE 3000
CMD ["bun", "src/index.js"]
