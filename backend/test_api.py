import requests
import json
from pathlib import Path

# Configuration
API_URL = "http://localhost:8000"
TEST_IMAGE_PATH = "test_image.jpg"  # Replace with path to a test retinal image

def test_health_check():
    """Test the health check endpoint."""
    try:
        response = requests.get(f"{API_URL}/health")
        response.raise_for_status()
        print("✅ Health check passed")
        print(f"Response: {response.json()}")
        return True
    except Exception as e:
        print(f"❌ Health check failed: {str(e)}")
        return False

def test_prediction(image_path: str):
    """Test the prediction endpoint with an image."""
    if not Path(image_path).exists():
        print(f"❌ Test image not found: {image_path}")
        return False
    
    try:
        with open(image_path, "rb") as img_file:
            files = {"file": (Path(image_path).name, img_file, "image/jpeg")}
            response = requests.post(f"{API_URL}/predict/", files=files)
            response.raise_for_status()
            
            result = response.json()
            print("✅ Prediction test passed")
            print("Prediction results:")
            print(json.dumps(result, indent=2))
            return True
            
    except Exception as e:
        print(f"❌ Prediction test failed: {str(e)}")
        if hasattr(e, 'response') and e.response is not None:
            print(f"Response: {e.response.text}")
        return False

if __name__ == "__main__":
    print("=== Testing Diabetic Retinopathy Detection API ===\n")
    
    # Test health check
    if not test_health_check():
        exit(1)
    
    # Test prediction if image path is provided
    if Path(TEST_IMAGE_PATH).exists():
        print("\n=== Testing Prediction ===")
        test_prediction(TEST_IMAGE_PATH)
    else:
        print(f"\nℹ️  Test image not found at {TEST_IMAGE_PATH}. Skipping prediction test.")
        print("To test prediction, place a test image and update TEST_IMAGE_PATH.")
