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

:: Define the log file path in the same directory as the script
set "logDir=%~dp0logs"
if not exist "%logDir%" mkdir "%logDir%"
set "logFile=%logDir%\%schedulerName%_log.txt"

:: Mounts the command to run
if "%commandType%"=="file" (
    set "taskToRun=%command% > %logFile% 2>&1"
) else (
    set "taskToRun=powershell -NoProfile -ExecutionPolicy Bypass -Command . $PROFILE; %command% > %logFile% 2>&1"
)

echo Task to Run: %taskToRun%


:: /IT in the end makes the job iterative with the user.
:: /ru defines which user will be associated to execute this scheduler
:: /RL defines the permissions the scheduler will have, if setted to highest the terminal running the commando must be running as admin
:: /F Forces the creation of a new task, replacing any exsting task with the same name
:: /IT This parameter makes the task interactive, which means the task will show up in he user screen
:: All (or at lease some) of the parameters above must be editted to be in the job form and be passed to the schtask command if checked there.

if "%frequencySwitch%"=="WEEKLY" (
    schtasks /create /tn "%schedulerName%" /tr "%taskToRun%" /sc %frequencySwitch% /d %day% /st %time% /sd %startDate% /ru %USERNAME% /RL HIGHEST /F /IT
) else (
    schtasks /create /tn "%schedulerName%" /tr "%taskToRun%" /sc %frequencySwitch% /st %time% /sd %startDate% /ru %USERNAME% /RL HIGHEST /F /IT
)

endlocal