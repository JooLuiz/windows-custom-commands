:: Remove o arquivo temporário
@echo off
setlocal

if "%~1"=="" (
    set "tempFile=scheduled_tasks_temp.txt"
) else (
    set "tempFile=%~1"
)

del %tempFile%

endlocal
