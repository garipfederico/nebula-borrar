
# Opcion 1 DESDE aca
# Funcionando con serve. Usar los siguientes dos comandos.
# docker build -t cliente-image:0.1 .
# docker run -it -p 3000:3000 --name cliente cliente-image:0.1

# FROM node:16-alpine as builder

# WORKDIR /usr/src/app

# # ENV PATH /usr/src/app/node_modules/.bin:$PATH

# COPY package.json ./

# RUN npm i
# COPY . .
# RUN npm run build

# EXPOSE 3000
# RUN npm install -g serve
# CMD ["serve", "-s", "build"]
# CMD ["npm", "run", "startDev"]

# Opcion 1 HASTA aca




# OPCION 2 DESDE ACA
# Tutorial de 14 de agosto aprox react con nginx
#  docker run -it -p 3000:80 --name cliente cliente-image:nginx
# Funciona con el puerto 80 ya que es el predeterminado de nginx

#STEP 1 BUILD OF REACT PROJECT
FROM node:16-alpine as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

#STEP 2 CREATE NGINX SERVER
FROM nginx:1.19.0-alpine AS prod-stage
COPY --from=build /app/build /usr/share/nginx/html
expose 80
CMD ["nginx","-g","daemon off;"]

# OPCION 2 HASTA ACA


# # Utiliza una imagen base oficial de Node.js en su variante "alpine"
# FROM node:19.0-alpine
# EXPOSE 3000

# # Establece el directorio de trabajo dentro del contenedor
# WORKDIR /usr/src/app

# # Agrega el directorio /usr/src/app/node_modules/.bin al $PATH
# ENV PATH /usr/src/app/node_modules/.bin:$PATH

# # Copia el archivo package.json al directorio de trabajo
# COPY package.json .

# # Copia el archivo package-lock.json al directorio de trabajo
# COPY package-lock.json .

# # Instala las dependencias de la aplicación utilizando npm
# RUN npm install --production

# # Copia todos los archivos del proyecto al directorio de trabajo
# COPY . .


# FROM node:16-alpine as builder
# WORKDIR /app

# COPY package.json ./
# RUN npm i
# COPY . .

# # RUN npm run build

# EXPOSE 3000


# CMD ["npm", "startDev"]

