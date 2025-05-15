@echo off
echo Starting Diabetic Retinopathy Detection Frontend...

:: Check if node_modules exists
if not exist "node_modules" (
    echo Installing Node.js dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo Error: Failed to install Node.js dependencies.
        pause
        exit /b 1
    )
)

echo Starting development server...
echo The application will open in your default browser shortly.

echo.
echo If the browser doesn't open automatically, please visit:
echo http://localhost:5173
echo.

call npm run dev

pause
