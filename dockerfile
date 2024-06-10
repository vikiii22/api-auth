# Establecer la imagen base
FROM node:22.2-alpine3.19

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios al contenedor
COPY . /app

# Instalar las dependencias
RUN npm install --force

# Exponer el puerto necesario
EXPOSE 3000

# Definir el comando de inicio del contenedor
CMD [ "npm", "run", "start"]