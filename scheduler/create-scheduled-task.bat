@echo off
setlocal

:: Parameters
set "schedulerName=%~1"
set "frequency=%~2"
set "startDate=%~3"
set "time=%~4"
set "command=%~5"
set "commandType=%~6"
set "day=%~7"

:: Log the parameters (for debugging)
echo Scheduler Name: %schedulerName%
echo Frequency: %frequency%
echo Start Date: %startDate%
echo Time: %time%
echo Command: %command%
echo Command Type: %commandType%
echo Day: %day%

:: Convert the start date from yyyy-MM-dd to MM/dd/yyyy (required by schtasks)
for /f "tokens=1-3 delims=-" %%a in ("%startDate%") do (
    set "startDate=%%c/%%b/%%a"
)

echo Start Date Modified: %startDate%

:: Define the frequency switch for schtasks
set "frequencySwitch="
if /i "%frequency%"=="unique" set "frequencySwitch=ONCE"
if /i "%frequency%"=="daily" set "frequencySwitch=DAILY"
if /i "%frequency%"=="weekly" set "frequencySwitch=WEEKLY"
if /i "%frequency%"=="monthly" set "frequencySwitch=MONTHLY"

if "%commandType%"=="file" (
    set "taskToRun=%command%"
) else (
    set "taskToRun=cmd /c %command%"
)

:: /IT in the end makes the job iterative with the user.
if "%frequencySwitch%"=="WEEKLY" (
    schtasks /create /tn "%schedulerName%" /tr "%taskToRun%" /sc %frequencySwitch% /d %day% /st %time% /sd %startDate% /IT
) else (
    schtasks /create /tn "%schedulerName%" /tr "%taskToRun%" /sc %frequencySwitch% /st %time% /sd %startDate% /IT
)

endlocal