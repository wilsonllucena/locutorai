FROM node:18-alpine AS base
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=base /app .
EXPOSE 3000
CMD ["npm", "run", "start"]
