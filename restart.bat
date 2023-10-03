@echo off
echo --------  REMOVING IMG AND CONTAINERS  ----------
docker stop react_app
docker stop core_web
docker rm react_app
docker rm core_web
docker image rm nebula-client-web
@REM npm cache clean --force
echo ------------------  BUILDING  ------------------
docker-compose -f docker-compose.dev.yml up -d --build
echo -------------------  IMAGES  -------------------
docker images
echo -----------------  CONTAINERS  -----------------
docker ps -a
echo --------------------  LOGS  --------------------
docker logs -f react_app