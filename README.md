# ScanXtract
#####Software para la digitalizacion de documentos
---
###Instalacion con Docker
Requisitos:
    - Tener instalado docker (y docker compose en versiones viejas)
##### 1 - Contruir la imagen.
En el directorio raiz ejecutar
``docker build -t cliente-image:0.1 .``

##### 2 - Creacion y ejecucion del container.
``docker compose up`` 

o

``docker run -it -p 3000:3000 --name cliente cliente-image:0.1``

### Ejecucion con npm

``npm run startDev``
