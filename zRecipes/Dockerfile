FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration production

FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/www ./www

EXPOSE 8100

CMD ["serve", "-s", "www", "-p", "8100", "--no-clipboard"]