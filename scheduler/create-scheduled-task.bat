@echo off
setlocal

:: Define the task name and schedule parameters
set "taskname=ExecutarMeuScriptSemanalmente"
set "scriptpath=C:\caminho\para\meu_script.bat"
@REM set "schedule=12:00"   :: Hora no formato HH:MM (24 horas)(execução única)
set "time=12:00"   :: Hora no formato HH:MM (24 horas)(execução diária)
@REM set "day=MON"      :: Dia da semana (MON, TUE, WED, THU, FRI, SAT, SUN)
@REM set "day=15"       :: Dia do mês (1-31)

:: Define the date for the task
set "startdate=20/05/2024" :: Data no formato DD/MM/AAAA

:: Create the scheduled task (ONCE)
@REM schtasks /create /tn "%taskname%" /tr "\"%scriptpath%\"" /sc once /st %schedule% /sd %startdate% /f

:: Create the scheduled task to run daily
schtasks /create /tn "%taskname%" /tr "\"%scriptpath%\"" /sc daily /st %time% /f

:: Create the scheduled task to run weekly
@REM schtasks /create /tn "%taskname%" /tr "\"%scriptpath%\"" /sc weekly /d %day% /st %time% /f

:: Create the scheduled task to run monthly
@REM schtasks /create /tn "%taskname%" /tr "\"%scriptpath%\"" /sc monthly /d %day% /st %time% /f




endlocal
