# Etapa de compilación
FROM node:22-alpine3.19 AS builder

# Directorio de trabajo
WORKDIR /usr/src/app

# Copiar archivos de dependencias y paquetes
COPY package*.json ./
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Compilar el proyecto
RUN npm run build

# Etapa de pruebas
FROM builder AS tester

# Ejecutar pruebas
RUN npm run test

# Etapa de producción final
FROM node:22-alpine3.19 AS production

WORKDIR /usr/src/app

# Solo copiar los archivos necesarios de la etapa de compilación
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# Exponer el puerto y definir comando de inicio
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
