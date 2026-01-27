@echo off
echo Stopping KartOwl Application...

REM Kill any existing Node processes (this will stop both frontend and backend)
echo.
echo Stopping all Node processes...
echo.

taskkill /f /im node.exe 2>nul

echo.
echo All services have been stopped.
echo.
pause