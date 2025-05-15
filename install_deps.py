import os
import sys
import subprocess
import platform

def check_python_version():
    """Check if Python version is 3.11 or higher."""
    major, minor = sys.version_info.major, sys.version_info.minor
    if major < 3 or (major == 3 and minor < 11):
        print(f"Error: Python 3.11 or higher is required. Found Python {major}.{minor}")
        sys.exit(1)

def get_pytorch_install_command():
    """Get the correct PyTorch installation command based on the platform."""
    system = platform.system().lower()
    if system == 'windows':
        # For Windows with CUDA 11.8
        return "torch torchvision --index-url https://download.pytorch.org/whl/cu118"
    elif system == 'linux':
        # For Linux with CUDA 11.8
        return "torch torchvision --index-url https://download.pytorch.org/whl/cu118"
    else:
        # For macOS
        return "torch torchvision"

def install_requirements():
    """Install the required Python packages."""
    print("Installing Python dependencies...")
    
    # First install pip
    subprocess.check_call([sys.executable, "-m", "pip", "install", "--upgrade", "pip"])
    
    # Install PyTorch with CUDA support
    print("Installing PyTorch with CUDA support...")
    torch_cmd = f"pip install {get_pytorch_install_command()}"
    subprocess.check_call(torch_cmd.split())
    
    # Install other requirements
    print("Installing other dependencies...")
    requirements = [
        "fastapi==0.109.2",
        "uvicorn==0.27.1",
        "python-multipart==0.0.9",
        "pillow==10.2.0",
        "numpy==1.26.4",
        "python-dotenv==1.0.1",
        "opencv-python-headless==4.9.0.80"
    ]
    
    for package in requirements:
        subprocess.check_call([sys.executable, "-m", "pip", "install", package])
    
    print("\n✅ All dependencies installed successfully!")

def main():
    try:
        check_python_version()
        install_requirements()
    except subprocess.CalledProcessError as e:
        print(f"\n❌ Error installing dependencies: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ An unexpected error occurred: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
