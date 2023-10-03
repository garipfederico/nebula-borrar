@echo off
setlocal enabledelayedexpansion

rem Lista de nombres de imágenes que quieres conservar
set "imagenes_a_mantener=nebuladocs-server:latest postgres:15-alpine nginx:stable"

rem Obtén una lista de todas las imágenes
for /f %%i in ('docker images -q') do (
    set "eliminar=1"
    for %%j in (%imagenes_a_mantener%) do (
        docker inspect -f "{{.Repository}}:{{.Tag}}" %%i | findstr /i /c:%%j > nul && (
            set "eliminar=0"
        )
    )
    if !eliminar! equ 1 (
        docker rmi -f %%i
    )
)

endlocal
docker images