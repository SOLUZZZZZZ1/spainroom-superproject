@echo off
REM Nora — Deploy franquiciados a PRODUCCIÓN con prebuilt correcto
setlocal ENABLEDELAYEDEXPANSION
cd /d %~dp0
cd frontend-franquiciados

REM Evita mismatch preview/prod
if exist .vercel\output rmdir /s /q .vercel\output

REM Build target=production
vercel build --prod || goto :error

REM Deploy prebuilt a producción
vercel deploy --prebuilt --prod --yes || goto :error

echo.
echo ✅ Franquiciados desplegado a PRODUCCIÓN correctamente.
exit /b 0

:error
echo.
echo ❌ Error durante el despliegue de franquiciados (PROD).
exit /b 1
