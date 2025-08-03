@echo off
echo Starting Admin Panel Servers...
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm run dev"

echo Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak > nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "ng serve --open"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:4200
echo.
echo Press any key to exit this window...
pause > nul 