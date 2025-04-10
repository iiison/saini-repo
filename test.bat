@echo off
REM Navigate to the saini-repo directory on D drive
D:
cd \saini-repo

REM Start the development server
pnpm dev

REM Wait for 30 seconds
timeout /t 30 /nobreak

REM Open the browser with the given URL
start http://192.168.1.10:3000
