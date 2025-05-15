import torch
import torchvision.transforms as transforms
from torchvision.models import resnet18
import torch.nn as nn
import torch.nn.functional as F
from typing import Dict, Any, Optional
from PIL import Image
import logging
import os

# Configure logging
logger = logging.getLogger(__name__)

# Class labels for Diabetic Retinopathy grades
CLASS_LABELS = ["No DR", "Mild", "Moderate", "Severe", "Proliferative DR"]

class DRModel(nn.Module):
    """Custom model for Diabetic Retinopathy classification.
    This matches the architecture of the saved model.
    """
    def __init__(self, num_classes: int = 5):
        super(DRModel, self).__init__()
        # Use a standard ResNet18 architecture without pretrained weights
        self.conv1 = nn.Conv2d(3, 64, kernel_size=7, stride=2, padding=3, bias=False)
        self.bn1 = nn.BatchNorm2d(64)
        self.relu = nn.ReLU(inplace=True)
        self.maxpool = nn.MaxPool2d(kernel_size=3, stride=2, padding=1)
        
        # Create the ResNet layers
        self.layer1 = self._make_layer(64, 64, 2, stride=1)
        self.layer2 = self._make_layer(64, 128, 2, stride=2)
        self.layer3 = self._make_layer(128, 256, 2, stride=2)
        self.layer4 = self._make_layer(256, 512, 2, stride=2)
        
        self.avgpool = nn.AdaptiveAvgPool2d((1, 1))
        self.fc = nn.Linear(512, num_classes)
        
    def _make_layer(self, in_channels, out_channels, blocks, stride=1):
        layers = []
        layers.append(ResidualBlock(in_channels, out_channels, stride))
        for _ in range(1, blocks):
            layers.append(ResidualBlock(out_channels, out_channels))
        return nn.Sequential(*layers)
    
    def forward(self, x):
        x = self.conv1(x)
        x = self.bn1(x)
        x = self.relu(x)
        x = self.maxpool(x)
        
        x = self.layer1(x)
        x = self.layer2(x)
        x = self.layer3(x)
        x = self.layer4(x)
        
        x = self.avgpool(x)
        x = torch.flatten(x, 1)
        x = self.fc(x)
        return x

class ResidualBlock(nn.Module):
    """Basic residual block for ResNet."""
    def __init__(self, in_channels, out_channels, stride=1):
        super(ResidualBlock, self).__init__()
        self.conv1 = nn.Conv2d(in_channels, out_channels, kernel_size=3, 
                             stride=stride, padding=1, bias=False)
        self.bn1 = nn.BatchNorm2d(out_channels)
        self.relu = nn.ReLU(inplace=True)
        self.conv2 = nn.Conv2d(out_channels, out_channels, kernel_size=3, 
                             stride=1, padding=1, bias=False)
        self.bn2 = nn.BatchNorm2d(out_channels)
        
        self.downsample = None
        if stride != 1 or in_channels != out_channels:
            self.downsample = nn.Sequential(
                nn.Conv2d(in_channels, out_channels, kernel_size=1, 
                         stride=stride, bias=False),
                nn.BatchNorm2d(out_channels)
            )
    
    def forward(self, x):
        identity = x
        
        out = self.conv1(x)
        out = self.bn1(out)
        out = self.relu(out)
        
        out = self.conv2(out)
        out = self.bn2(out)
        
        if self.downsample is not None:
            identity = self.downsample(x)
            
        out += identity
        out = self.relu(out)
        return out

def load_model(model_path: str = "trained_model.pth") -> nn.Module:
    """
    Load the trained model from the specified path.
    
    Args:
        model_path (str): Path to the saved model weights.
        
    Returns:
        nn.Module: The loaded model.
    """
    try:
        # Check if the model file exists
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file not found at {model_path}")
        
        # Create the model
        model = DRModel()
        
        # Load the state dict
        state_dict = torch.load(model_path, map_location=torch.device('cpu'))
        
        # Remove the final layer's weights and bias if size mismatch
        if 'fc.weight' in state_dict and state_dict['fc.weight'].shape != model.fc.weight.shape:
            print("Warning: Size mismatch in fc.weight. Using random initialization for the final layer.")
            del state_dict['fc.weight']
            del state_dict['fc.bias']
        
        # Load the state dict into the model
        model.load_state_dict(state_dict, strict=False)
        
        # Set the model to evaluation mode
        model.eval()
        
        logger.info("Model loaded successfully!")
        return model
        
    except Exception as e:
        logger.error(f"Error loading model: {str(e)}")
        logger.error(f"Model keys: {[k for k in model.state_dict().keys()][:5]}...")
        logger.error(f"State dict keys: {[k for k in state_dict.keys()][:5]}...")
        raise RuntimeError(f"Failed to load model: {str(e)}")

def predict_image(pil_img: Image.Image, model: nn.Module) -> Dict[str, Any]:
    """
    Make a prediction on a single image.
    
    Args:
        pil_img: Input PIL Image
        model: Loaded PyTorch model
        
    Returns:
        Dictionary containing prediction results:
        {
            'grade': str,  # Predicted DR grade
            'confidence': float,  # Confidence score (0-1)
            'class_probabilities': Dict[str, float]  # Probabilities for all classes
        }
    """
    try:
        # Define image transformations
        transform = transforms.Compose([
            transforms.Resize((512, 512)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406],
                             std=[0.229, 0.224, 0.225])
        ])
        
        # Preprocess image
        image_tensor = transform(pil_img).unsqueeze(0)
        
        # Make prediction
        with torch.no_grad():
            outputs = model(image_tensor)
            probs = F.softmax(outputs, dim=1)
            
            # Get top prediction
            confidence, pred_idx = torch.max(probs, dim=1)
            confidence = confidence.item()
            pred_idx = pred_idx.item()
            
            # Get probabilities for all classes
            class_probs = {CLASS_LABELS[i]: round(probs[0][i].item(), 4) 
                          for i in range(len(CLASS_LABELS))}
        
        return {
            "grade": CLASS_LABELS[pred_idx],
            "confidence": round(confidence, 4),
            "class_probabilities": class_probs
        }
        
    except Exception as e:
        logger.error(f"Error during prediction: {str(e)}")
        raise RuntimeError(f"Failed to process image: {str(e)}")
