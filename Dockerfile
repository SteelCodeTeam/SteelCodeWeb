# ============================================
# STAGE 1 — Build
# ============================================
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration production

# ============================================
# STAGE 2 — Serve
# ============================================
FROM nginx:alpine AS runner

# Configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia el build de Angular
COPY --from=builder /app/dist/pag-web/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
