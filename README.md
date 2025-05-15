<div align="center">
  <h1>👁️ Diabetic Retinopathy Detection System</h1>
  <p>An AI-powered web application for automated detection and classification of Diabetic Retinopathy from retinal fundus images.</p>
  
  [![Python](https://img.shields.io/badge/Python-3.8+-blue?logo=python&logoColor=white)](https://www.python.org/)
  [![FastAPI](https://img.shields.io/badge/FastAPI-0.95.2-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
  [![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
  [![PyTorch](https://img.shields.io/badge/PyTorch-2.0.1-EE4C2C?logo=pytorch&logoColor=white)](https://pytorch.org/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  [![Demo](https://img.shields.io/badge/🚀-Live_Demo-FF6B6B?style=for-the-badge)](https://gaurav241102.github.io/diabetic-retinopathy-detection/)
  [![Report Bug](https://img.shields.io/badge/🐞-Report_Bug-red?style=for-the-badge)](https://github.com/gaurav241102/diabetic-retinopathy-detection/issues)
</div>

## 🎯 Overview

Diabetic Retinopathy is a diabetes complication that affects eyes. It's caused by damage to the blood vessels of the light-sensitive tissue at the back of the eye (retina). This project provides an automated solution for early detection of Diabetic Retinopathy using deep learning, making the screening process faster and more accessible.

### ✨ Features

- **Automated Grading**: Classifies retinal images into 5 stages of Diabetic Retinopathy
- **User-Friendly Interface**: Intuitive web interface for easy image upload and result visualization
- **Confidence Scoring**: Provides confidence levels for each prediction
- **Responsive Design**: Works on both desktop and mobile devices
- **Fast Processing**: Real-time predictions with high accuracy

## 🚀 Technologies Used

### Backend
- **FastAPI**: High-performance web framework for building APIs
- **PyTorch**: Deep learning framework for the classification model
- **OpenCV**: Image processing and preprocessing
- **Python 3.8+**: Core programming language

### Frontend
- **React 18**: Frontend library for building user interfaces
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: For client-side routing
- **Vite**: Fast build tool and development server

### Deployment
- **Docker**: Containerization for consistent environments
- **GitHub Actions**: CI/CD pipeline
- **Render/Heroku/Vercel**: Cloud deployment options

## 📁 Project Structure

```
diabetic-retinopathy-detection/
├── backend/                     # Python FastAPI backend
│   ├── main.py                  # FastAPI application entry point
│   ├── model.py                 # Deep learning model implementation
│   ├── preprocess.py            # Image preprocessing utilities
│   ├── requirements.txt         # Python dependencies
│   ├── trained_model.pth        # Trained PyTorch model
│   └── test_model.py            # Model testing script
├── frontend/                    # React frontend
│   ├── public/                  # Static files
│   └── src/
│       ├── components/         # Reusable UI components
│       ├── pages/               # Application pages
│       ├── App.tsx              # Main application component
│       └── main.tsx             # Application entry point
├── .github/                     # GitHub configurations
│   └── workflows/               # GitHub Actions workflows
├── .gitignore                   # Git ignore file
├── docker-compose.yml           # Docker Compose configuration
├── Dockerfile                   # Docker configuration
├── LICENSE                      # Project license
└── README.md                    # Project documentation
```

## 🛠️ Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn
- Git

### Local Development

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a Python virtual environment (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
   The API will be available at `http://localhost:8000`
   - API documentation: `http://localhost:8000/docs`
   - Health check: `http://localhost:8000/health`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The frontend will be available at `http://localhost:5173`

## 🐳 Docker Setup

You can also run the application using Docker:

1. Build and start the containers:
   ```bash
   docker-compose up --build
   ```

2. Access the application:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8000`

## 🚀 Deployment

### Backend Deployment

#### Option 1: Render (Recommended)
1. Push your code to a GitHub repository
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Set the following environment variables:
   - `PYTHON_VERSION`: 3.9
   - `PORT`: 10000
   - `MODEL_PATH`: ./trained_model.pth
5. Set the build command: `pip install -r requirements.txt`
6. Set the start command: `uvicorn main:app --host 0.0.0.0 --port 10000`

#### Option 2: Heroku
```bash
# Login to Heroku CLI
heroku login

# Create a new Heroku app
heroku create your-app-name

# Set Python buildpack
heroku buildpacks:set heroku/python

# Deploy your code
git push heroku main
```

### Frontend Deployment

#### Vercel (Recommended)
1. Push your frontend code to a GitHub repository
2. Import the repository on Vercel
3. Set the build command: `npm run build` or `yarn build`
4. Set the output directory: `dist`
5. Add environment variable: `VITE_API_URL` with your backend URL

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Dataset: [APTOS 2019 Blindness Detection](https://www.kaggle.com/c/aptos2019-blindness-detection)
- Thanks to all contributors who have helped improve this project

## 📬 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - your.email@example.com

Project Link: [https://github.com/yourusername/diabetic-retinopathy-detection](https://github.com/yourusername/diabetic-retinopathy-detection)
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173` (or another port if 5173 is in use)

## Usage

1. Open the frontend in your browser (default: `http://localhost:5173`)
2. Upload a retinal fundus image using the interface
3. The system will process the image and display the predicted DR grade

## API Endpoints

- `POST /predict/` - Accepts an image file and returns the predicted DR grade
  - Request: Form-data with key 'file' containing the image
  - Response: JSON with 'grade' and 'confidence' fields

## Notes

- The model expects retinal fundus images in JPG or PNG format
- For best results, use high-quality images with proper lighting and focus
- The system is designed for screening purposes only and should not replace professional medical diagnosis
