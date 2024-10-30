# Usa la imagen oficial de Node.js como etapa de construcción
FROM node:22-alpine3.19 AS builder

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de configuración de la aplicación
COPY package*.json tsconfig*.json ./

# Instala solo las dependencias de producción
RUN npm install --only=production

# Copia el resto de los archivos fuente y compila el proyecto
COPY src ./src
RUN npm run build

# Crear una imagen ligera para producción
FROM node:22-alpine3.19

# Establece el directorio de trabajo en el contenedor final
WORKDIR /usr/src/app

# Copia los archivos compilados y las dependencias desde el builder
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Expone el puerto que usará la aplicación
EXPOSE 3000

# Define el comando de inicio
CMD ["node", "dist/main"]
