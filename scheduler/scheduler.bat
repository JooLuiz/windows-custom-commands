@echo off
setlocal enabledelayedexpansion

set JS_FILE="%~dp0\scheduler.js"

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
  echo Verbose mode activated.
  node %JS_FILE% --verbose
) else (
  node %JS_FILE%
)

exit
