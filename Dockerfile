
FROM node:20-alpine as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:20-alpine as thumbnail-microservice
WORKDIR /app
COPY --from=builder /app .
CMD ["node", "dist/microservices/thumbnail/main.js"]

FROM node:20-alpine as nodepop-adv-app
WORKDIR /app
COPY --from=builder /app .
CMD ["npm", "start"]

# FROM node:20-alpine as development
# WORKDIR /app
# COPY package.json package.json
# RUN npm install
# CMD ["npm", "run", "dev"]

# FROM node:20-alpine as dev-deps
# WORKDIR /app
# COPY package.json package.json
# RUN npm install

# FROM node:20-alpine as builder
# WORKDIR /app
# COPY --from=dev-deps /app/node_modules ./node_modules
# COPY . .
# RUN npm run build

# FROM node:20-alpine as prod-deps
# WORKDIR /app
# COPY package.json package.json
# RUN npm install

# FROM node:20-alpine as thumbnail-builder
# WORKDIR /app
# COPY --from=prod-deps /app/node_modules ./node_modules
# COPY . .

# FROM node:20-alpine as thumbnail-service
# WORKDIR /app
# COPY --from=prod-deps /app/node_modules ./node_modules
# COPY --from=builder /app/dist ./dist
# CMD ["node", "dist/microservices/thumbnail/main.js"]

# FROM node:20-alpine as production
# WORKDIR /app
# COPY --from=prod-deps /app/node_modules ./node_modules
# COPY --from=builder /app/dist ./dist
# CMD ["npm", "start"]


