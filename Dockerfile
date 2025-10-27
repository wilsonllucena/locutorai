# Dockerfile para desenvolvimento
FROM node:18-alpine

# Instalar dependências necessárias
RUN apk add --no-cache libc6-compat

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar resto do código
COPY . .

# Expor porta
EXPOSE 3000

# Comando padrão (será sobrescrito pelo docker-compose)
CMD ["npm", "run", "dev"]
