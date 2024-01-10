FROM node:20-alpine as development
WORKDIR /app
COPY package.json package.json
RUN npm install
CMD ["npm", "run", "dev"]

FROM node:20-alpine as dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install

FROM node:20-alpine as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine as prod-deps
WORKDIR /app
COPY package.json package.json
RUN npm install

FROM node:20-alpine as thumbnail-service
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist/config/envs.js ./dist/config
COPY --from=builder /app/dist/microservices/thumbnail ./dist/microservices/thumbnail
CMD ["node", "dist/microservices/thumbnail/main.js"]

FROM node:20-alpine as production
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
CMD ["npm", "run", "start-seed"]


