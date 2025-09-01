@echo off
REM Nora — Inyecta la URL real de FRANQUICIADOS en el principal y despliega a PRODUCCIÓN
setlocal ENABLEDELAYEDEXPANSION
cd /d %~dp0
cd frontend

REM URL de producción de FRANQUICIADOS (pegada por Nora)
set FR_URL=https://frontend-franquiciados-m1wg9qhru-soluzzzs-projects.vercel.app

REM Vincula proyecto (si fuera necesario)
npx --yes vercel@latest link --yes

REM Limpia valores anteriores (no falla si no existen)
echo y | npx --yes vercel@latest env rm VITE_URL_FRANQUICIADOS production 2>nul
echo y | npx --yes vercel@latest env rm VITE_URL_FRANQUICIADOS preview 2>nul

REM Añade la URL para production y preview
echo %FR_URL% | npx --yes vercel@latest env add VITE_URL_FRANQUICIADOS production
echo %FR_URL% | npx --yes vercel@latest env add VITE_URL_FRANQUICIADOS preview

REM Despliegue a producción (cloud build)
npx --yes vercel@latest --prod --yes
