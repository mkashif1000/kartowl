@echo off
echo Starting KartOwl Application...

REM Change to the backend directory and start the NestJS server
echo.
echo Starting Backend Server...
echo.

cd /d "%~dp0\kartowl-backend"

REM Start the backend in a new window
start "KartOwl Backend" cmd /k "npm run start:dev"

REM Wait a moment before starting the frontend
timeout /t 3 /nobreak >nul

REM Change to the frontend directory and start the Vite server
echo.
echo Starting Frontend Server...
echo.

cd /d "%~dp0\kartowl-frontend"

REM Start the frontend in a new window
start "KartOwl Frontend" cmd /k "npm run dev"

echo Both servers are starting...
echo Backend will be available at http://localhost:3000
echo Frontend will be available at http://localhost:5173
pause