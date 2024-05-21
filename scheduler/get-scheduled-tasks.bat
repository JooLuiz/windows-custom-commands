@echo off
setlocal

chcp 65001 > nul

if "%~1"=="" (
    set "format=csv"
) else (
    set "format=%~1"
)

set "outputFile=scheduled_tasks_temp.csv"

schtasks /query /fo %format% /v > %outputFile%

type %outputFile%

endlocal
