import torch
import os
from model import load_model, DRModel

def test_model_loading():
    print("Testing model loading...")
    model_path = "trained_model.pth"
    
    try:
        # Check if model file exists
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file not found at {model_path}. Please ensure the model file is in the backend directory.")
        
        # Load the model
        print("Loading model...")
        model = load_model(model_path)
        print("Model loaded successfully!")
        
        # Print model architecture
        print("\nModel architecture:")
        print(model)
        
        # Test a dummy input
        print("\nTesting with dummy input...")
        dummy_input = torch.randn(1, 3, 224, 224)
        output = model(dummy_input)
        print(f"Output shape: {output.shape}")
        print("Test completed successfully!")
        
    except Exception as e:
        print(f"Error during model loading: {str(e)}")
        raise

if __name__ == "__main__":
    test_model_loading()
