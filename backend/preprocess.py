import cv2
import os
from pathlib import Path

input_dir = Path('data/raw/IDRiD/B. Disease Grading/1. Original Images/a. Training Set')
output_dir = Path('data/processed/train')
output_dir.mkdir(parents=True, exist_ok=True)

for img_file in input_dir.glob('*.jpg'):
    img = cv2.imread(str(img_file))
    # Resize to 512x512, normalize, etc.
    img_resized = cv2.resize(img, (512, 512))
    cv2.imwrite(str(output_dir / img_file.name), img_resized)
print("Preprocessing done.")
import cv2
import os
from pathlib import Path

input_dir = Path('data/raw/IDRiD/B. Disease Grading/1. Original Images/a. Training Set')
output_dir = Path('data/processed/train')
output_dir.mkdir(parents=True, exist_ok=True)

for img_file in input_dir.glob('*.jpg'):
    img = cv2.imread(str(img_file))
    # Resize to 512x512, normalize, etc.
    img_resized = cv2.resize(img, (512, 512))
    cv2.imwrite(str(output_dir / img_file.name), img_resized)
print("Preprocessing done.")
