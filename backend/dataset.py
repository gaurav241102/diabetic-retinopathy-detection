import torch
from torch.utils.data import Dataset
import cv2
import pandas as pd
from pathlib import Path

class FundusDataset(Dataset):
    def __init__(self, csv_file, img_dir, transform=None):
        self.labels = pd.read_csv(csv_file)
        self.img_dir = Path(img_dir)
        self.transform = transform

    def __len__(self):
        return len(self.labels)

    def __getitem__(self, idx):
        img_name = self.labels.iloc[idx]['image_name'] + '.jpg'
        img_path = self.img_dir / img_name
        image = cv2.imread(str(img_path))
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        label = int(self.labels.iloc[idx]['grade'])
        if self.transform:
            image = self.transform(image=image)['image']
        image = torch.from_numpy(image).permute(2, 0, 1).float() / 255.0
        return image, label
