@echo off
setlocal enabledelayedexpansion

set JS_FILE="%~dp0\scheduler.js"

if "%~1" neq "_start_" (
  echo [INFO] - [Scheduler] - Starting in a new terminal...
  start /wait powershell /c "%~f0" _start_ %*
  echo [INFO] - [Scheduler] - Cleaning up temporary files...
  call "%~dp0delete-scheduled-tasks-temp-file.bat"
  exit /b
)

shift /1

set argCount=0
set isVerbose=

for %%x in (%*) do (
  if "%%~x"=="-v" (
    set isVerbose=true
  ) else if "%%~x"=="--verbose" (
    set isVerbose=true
  )
)

if defined isVerbose (
  echo [INFO] - [Scheduler] - Verbose mode activated.
  node %JS_FILE% --verbose
) else (
  node %JS_FILE%
)

exit
