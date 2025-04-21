# Angular 18 için Node tabanlı image kullanıyoruz
FROM node:20-alpine AS builder

# Uygulama dizinini oluştur
WORKDIR /app

# package.json ve package-lock.json kopyalanır
COPY package*.json ./

# Gerekli paketleri yükle
RUN npm install

# Proje dosyalarını kopyala
COPY . .

# Angular uygulamasını production için build et
RUN npm run build -- --configuration=production

# ----------------------------------------------
# Prod ortam için Nginx kullanarak serve edeceğiz
# ----------------------------------------------
FROM nginx:1.25-alpine

# Angular build çıktısı Nginx'in default dizinine kopyalanır
COPY --from=builder /app/dist/g-ai-lenus /usr/share/nginx/html

# Opsiyonel: custom Nginx config (isteğe bağlı)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
