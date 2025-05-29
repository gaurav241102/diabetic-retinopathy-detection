# 👁️ RetinaScan: Diabetic Retinopathy Detection

A deep learning-powered web application that helps detect and classify Diabetic Retinopathy from retinal fundus images. Built with a FastAPI backend and React frontend.


## ✨ Key Features

- **5-Stage Classification**: Detects and grades Diabetic Retinopathy from No DR to Proliferative DR
- **Real-time Analysis**: Get instant predictions with confidence scores
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Developer Friendly**: Well-documented API with Swagger UI
- **Easy Deployment**: Docker support for hassle-free setup

## 🛠 Tech Stack

| Area | Technologies |
|------|-------------|
| **Frontend** | React 18, TypeScript, Tailwind CSS, Vite |
| **Backend** | FastAPI, Python 3.8+ |
| **ML/DL** | PyTorch, OpenCV |
| **Deployment** | Docker, GitHub Actions |
| **CI/CD** | GitHub Actions |

## 📸 Screenshots
![image](https://github.com/user-attachments/assets/781a87c3-c043-41d5-9d5e-537ac92371c8)
![image](https://github.com/user-attachments/assets/5b7b1ec7-4f74-4690-b05c-d7fdac7ad27b)
![image](https://github.com/user-attachments/assets/f876b0d9-285a-4e13-ad9f-fd4c16c8fedf)



## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn
- Git

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

## 💻 Local Development

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/gaurav241102/diabetic-retinopathy-detection.git
   cd diabetic-retinopathy-detection
   ```

2. **Set up Python environment**
   ```bash
   # Create and activate virtual environment
   python -m venv venv
   .\venv\Scripts\activate  # Windows
   # source venv/bin/activate  # Mac/Linux
   
   # Install dependencies
   cd backend
   pip install -r requirements.txt
   ```

3. **Start the backend server**
   ```bash
   uvicorn main:app --reload
   ```
   - API Docs: http://localhost:8000/docs
   - Health Check: http://localhost:8000/health

### Frontend Setup

1. **Install dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```
   - Access at: http://localhost:5173


## 🤝 Contributing

Contributions are what make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## 🙏 Acknowledgments

- [APTOS 2019 Blindness Detection](https://www.kaggle.com/c/aptos2019-blindness-detection) for the dataset

---

<div align="center">
  Built with ❤️ by Gaurav
</div>

## 📬 Contact

Gaurav Prakash - [@yourtwitter](https://x.com/bingie_brinjal) - gaurav31308@gmail.com

Project Link: [https://github.com/gaurav241102/diabetic-retinopathy-detection]

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
