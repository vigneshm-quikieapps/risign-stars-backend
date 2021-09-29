@echo off

for %%a in ("%~dp0..\..\..") do set "PATH_TWO_LEVELS_UP=%%~fa"
set MONGODB_BACKUP_DEV_URL_ENV_LINE=findstr MONGODB_URL %PATH_TWO_LEVELS_UP%\.env

FOR /F "tokens=*" %%i IN (' %MONGODB_BACKUP_DEV_URL_ENV_LINE% ') DO SET MONGODB_BACKUP_DEV_URL=%%i

set MONGODB_BACKUP_DEV_URL=%MONGODB_BACKUP_DEV_URL:~14,79%

mongodump --uri %MONGODB_BACKUP_DEV_URL% ../../../dump