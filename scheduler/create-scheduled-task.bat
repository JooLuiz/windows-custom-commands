@echo off
setlocal

:: Parameters
set "schedulerName=%~1"
set "frequency=%~2"
set "startDate=%~3"
set "taskTime=%~4"
set "command=%~5"
set "commandType=%~6"
set "day=%~7"
set "frequencySwitch="
set "logFile="
set "taskToRun="

:: Normalizes the task parameters
call "%~dp0normalize-params.bat"

:: /ru defines which user will be associated to execute this scheduler
:: /rp defines the password that will be used to perform the edit action
:: /RL defines the permissions the scheduler will have, if setted to highest the terminal running the commando must be running as admin
:: /F Forces the creation of a new task, replacing any exsting task with the same name
:: /IT This parameter makes the task interactive, which means the task will show up in he user screen
:: All (or at lease some) of the parameters above must be editted to be in the job form and be passed to the schtask command if checked there.
if /i "%frequencySwitch%"=="WEEKLY" (
    schtasks /create /tn "%schedulerName%" /tr "%taskToRun%" /sc %frequencySwitch% /d %day% /st %taskTime% /sd %startDate% /ru %USERNAME% /RL HIGHEST /F /IT
) else (
    schtasks /create /tn "%schedulerName%" /tr "%taskToRun%" /sc %frequencySwitch% /st %taskTime% /sd %startDate% /ru %USERNAME% /RL HIGHEST /F /IT
)

:: Check if the task was edited successfully
if %ERRORLEVEL% equ 0 (
    echo [SUCCESS] - The scheduled task "%schedulerName%" was created successfully with new start time %newStartTime%.
) else (
    echo [ERROR] - Failed to update the scheduled task "%schedulerName%".
)

endlocal