@echo off
REM Build + deploy a producción (con APIs y SEO)
cd /d %~dp0
cd frontend
npx --yes vercel@latest build --prod || goto :error
npx --yes vercel@latest deploy --prebuilt --prod --yes || goto :error
echo ✅ Despliegue OK.
exit /b 0
:error
echo ❌ Error en build/deploy. Revisa el log.
exit /b 1
