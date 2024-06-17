@echo off

:: Convert the start date from yyyy-MM-dd to MM/dd/yyyy (required by schtasks)
if not "%startDate%"=="" (
    for /f "tokens=1-3 delims=-" %%a in ("%startDate%") do (
        set "startDate=%%c/%%b/%%a"
    )
)

:: Define the frequency switch for schtasks
if not "%frequency%"=="" (
    if /i "%frequency%"=="unique" set "frequencySwitch=ONCE"
    if /i "%frequency%"=="daily" set "frequencySwitch=DAILY"
    if /i "%frequency%"=="weekly" set "frequencySwitch=WEEKLY"
    if /i "%frequency%"=="monthly" set "frequencySwitch=MONTHLY"
)

:: Define the log file path in the same directory as the script
set "logDir=%~dp0logs"
if not exist "%logDir%" mkdir "%logDir%"
set "logFile=%logDir%\%schedulerName%_log.txt"

:: Mounts the command to run
if not "%command%"=="" (
    if "%commandType%"=="file" (
        set "taskToRun=%command% > %logFile% 2>&1"
    ) else (
        set "taskToRun=powershell -NoProfile -ExecutionPolicy Bypass -Command . $PROFILE; %command% > %logFile% 2>&1"
    )
)

::Echos task parameters variables
echo Scheduler Name: %schedulerName%
echo Frequency: %frequency%
echo Frequency Switch: %frequencySwitch%
echo Start Date: %startDate%
echo Task Time: %taskTime%
echo Command: %command%
echo Command Type: %commandType%
echo Day: %day%
echo Start Date Modified: %startDate%
echo Log file: %logFile%
echo Task to Run: %taskToRun%