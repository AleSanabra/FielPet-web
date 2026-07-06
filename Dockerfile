FROM node:22.14.0-alpine3.21

WORKDIR /app

# 3. Copia únicamente los archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./

# Instala Fontconfig y dependencias
RUN apk add --no-cache fontconfig ttf-dejavu

# 4. Instala las dependencias
RUN npm install        

COPY . .

# 4. Exponer el puerto en el que corre la app
EXPOSE 4000

# Configurar zona horaria en contenedor basado en Debian/Ubuntu
RUN ln -sf /usr/share/zoneinfo/America/Argentina/Buenos_Aires /etc/localtime \
    && echo "America/Argentina/Buenos_Aires" > /etc/timezone


# 5. Comando para iniciar la aplicación
CMD ["node", "index.js"]
