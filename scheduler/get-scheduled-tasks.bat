@echo off
setlocal

chcp 65001 > nul

set "format=csv"

set batchDir=%~dp0

set "outputFile=%batchDir%\scheduled_tasks_temp.csv"

schtasks /query /fo %format% /v > %outputFile%

endlocal
