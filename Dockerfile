# Etapa de construcción
FROM node:22-alpine3.19 AS builder

# Configura el directorio de trabajo en la etapa de construcción
WORKDIR /usr/src/app

# Copia solo los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala las dependencias de producción y desarrollo necesarias para compilar y ejecutar tests
RUN npm install

# Copia el resto del código fuente
COPY . .

# Compila el proyecto de TypeScript a JavaScript
RUN npm run build

# Etapa de pruebas
FROM builder AS tester
# Ejecuta las pruebas. Aquí puedes usar Jest o el comando de prueba de tu elección
RUN npm run test

# Etapa final: imagen ligera de solo producción
FROM node:22-alpine3.19

# Configura el directorio de trabajo en la imagen final
WORKDIR /usr/src/app

# Copia solo las dependencias de producción y el código compilado desde la etapa de construcción
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# Expone el puerto en el que corre la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación en producción
CMD ["node", "dist/main"]
