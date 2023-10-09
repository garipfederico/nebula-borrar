@echo off
setlocal enabledelayedexpansion

rem Lista de nombres de contenedores que quieres conservar
set "contenedores_a_mantener=nebuladocs-server nebuladocs-database"

rem Obtén todos los IDs de contenedores en ejecución
for /f %%i in ('docker ps -q -a') do (
    set "eliminar=1"
    for %%j in (%contenedores_a_mantener%) do (
        docker inspect -f "{{.Name}}" %%i | findstr /i /c:%%j > nul && (
            set "eliminar=0"
        )
    )
    if !eliminar! equ 1 (
        docker stop %%i
    )
)

endlocal

docker ps -a
