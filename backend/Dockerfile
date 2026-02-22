# === Phase 1 : Base ===
FROM oven/bun:alpine
WORKDIR /app

# === Phase 2 : Dépendances ===
COPY package.json bun.lockb* ./
RUN bun install --production

# --- Phase 3 : Application ===
COPY . .

# --- Phase 4 : Runtime ===
EXPOSE 3000
CMD ["bun", "src/index.js"]
