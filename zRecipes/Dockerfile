FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration production

# Etapa final con Node
FROM node:20-alpine

WORKDIR /app

# Instalar serve
RUN npm install -g serve

# Copiar archivos compilados
COPY --from=build /app/www ./www

EXPOSE 8100

CMD ["serve", "-s", "www", "-p", "8100", "--no-clipboard"]