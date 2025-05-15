@echo off
echo Starting Diabetic Retinopathy Detection Backend...

:: Check if virtual environment exists
if not exist "venv" (
    echo Error: Virtual environment not found. Please run setup.bat first.
    pause
    exit /b 1
)

:: Activate the virtual environment and start the server
call venv\Scripts\activate.bat
if %ERRORLEVEL% NEQ 0 (
    echo Error: Failed to activate virtual environment.
    pause
    exit /b 1
)

echo Starting FastAPI server at http://localhost:8000
echo Press Ctrl+C to stop the server

python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload

pause
