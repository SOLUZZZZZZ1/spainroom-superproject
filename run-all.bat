@echo off 
title SpainRoom - Todo 
start "SpainRoom Backend" cmd /k "cd /d C:\spainroom\backend && call .venv\Scripts\activate && python app.py" 
timeout /t 2 >nul 
start "SpainRoom Frontend" cmd /k "cd /d C:\spainroom\frontend && npm run dev" 
echo Se han lanzado Backend y Frontend 
pause 
