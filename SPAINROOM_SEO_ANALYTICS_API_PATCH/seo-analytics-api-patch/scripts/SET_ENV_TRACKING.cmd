@echo off
REM Establece variables GA4/Sentry si las tienes (opcional)
cd /d %~dp0
cd frontend
npx --yes vercel@latest link --yes
set GAID=G-XXXXXXXXXX
set SENTRY_DSN=

if not "%GAID%"=="" echo %GAID% | npx --yes vercel@latest env add VITE_GA4_ID production
if not "%GAID%"=="" echo %GAID% | npx --yes vercel@latest env add VITE_GA4_ID preview
if not "%SENTRY_DSN%"=="" echo %SENTRY_DSN% | npx --yes vercel@latest env add VITE_SENTRY_DSN production
if not "%SENTRY_DSN%"=="" echo %SENTRY_DSN% | npx --yes vercel@latest env add VITE_SENTRY_DSN preview
