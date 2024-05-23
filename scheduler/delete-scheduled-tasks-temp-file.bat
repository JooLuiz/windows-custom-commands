:: Remove o arquivo temporário
@echo off
setlocal

set batchDir=%~dp0

set "csvTempFile=%batchDir%scheduled_tasks_temp.csv"

set "jsonTempFile=%batchDir%scheduled_tasks_temp.json"

del %csvTempFile%
del %jsonTempFile%

endlocal
