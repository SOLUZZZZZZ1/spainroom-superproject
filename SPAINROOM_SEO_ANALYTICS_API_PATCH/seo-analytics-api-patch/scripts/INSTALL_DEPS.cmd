@echo off
REM Instala dependencias para SEO/Analytics
cd /d %~dp0
cd frontend
npm i react-helmet-async @sentry/react
