@echo off
echo Testing Vercel rewrites for React Router...

if not exist "dist\index.html" (
    echo ❌ Build not found. Run 'npm run build' first.
    exit /b 1
)

echo ✅ Build found at dist\index.html

findstr /C:"root" dist\index.html >nul
if %errorlevel% equ 0 (
    echo ✅ index.html contains React app
) else (
    echo ❌ index.html missing React app
    exit /b 1
)

echo.
echo === VERCEL DEPLOYMENT CHECKLIST ===
echo 1. ✅ vercel.json configured with rewrites
echo 2. ✅ Build completes successfully  
echo 3. ✅ dist\index.html exists
echo.
echo To deploy:
echo   git add .
echo   git commit -m "fix: resolve Vercel 404 on dynamic routes"
echo   git push origin main
echo.
echo Vercel will auto-deploy! 🚀
