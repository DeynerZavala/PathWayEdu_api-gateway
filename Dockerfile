# Usa la imagen oficial de Node.js
FROM node:22-alpine3.19 AS builder

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de configuración de la aplicación
COPY package*.json ./
COPY tsconfig.json ./

# Instala las dependencias
RUN npm install

# Copia los archivos fuente y compílalos
COPY src ./src
RUN npm run build

# Crear una imagen para producción
FROM node:22-alpine3.19
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Expone el puerto y define el comando de inicio
EXPOSE 3000
CMD ["node", "dist/main"]
