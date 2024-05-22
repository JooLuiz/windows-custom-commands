:: Remove o arquivo temporário
@echo off
setlocal

if "%~1"=="" (
    set "csvTempFile=scheduled_tasks_temp.csv"
) else (
    set "csvTempFile=%~1"
)

if "%~2"=="" (
    set "jsonTempFile=scheduled_tasks_temp.json"
) else (
    set "jsonTempFile=%~2"
)

del %csvTempFile%
del %jsonTempFile%

endlocal
