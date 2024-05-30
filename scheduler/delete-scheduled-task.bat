@echo off
setlocal

:: Parameters
set "schedulerName=%~1"

:: Check if schedulerName is provided
if "%schedulerName%"=="" (
    echo [ERROR] - No scheduler name provided.
    exit /b 1
)

:: Log the parameters (for debugging)
echo Scheduler Name: %schedulerName%

:: Delete the scheduled task
schtasks /delete /tn "%schedulerName%" /f

:: Check if the task was deleted successfully
if %ERRORLEVEL% equ 0 (
    echo [SUCCESS] - The scheduled task "%schedulerName%" was deleted successfully.
) else (
    echo [ERROR] - Failed to delete the scheduled task "%schedulerName%".
    exit /b 1
)

endlocal
