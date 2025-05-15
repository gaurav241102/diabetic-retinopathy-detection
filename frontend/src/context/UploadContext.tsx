
import React, { createContext, useContext, useState } from 'react';

interface AnalysisResult {
  id: string;
  imageUrl: string;
  grade: number;
  confidence: number;
  timestamp: string;
  patientId?: string;
}

interface UploadContextType {
  uploadImage: (file: File) => Promise<string>;
  getResult: (id: string) => Promise<AnalysisResult>;
  getHistory: () => Promise<AnalysisResult[]>;
  deleteResult: (id: string) => Promise<void>;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export const UploadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [results, setResults] = useState<AnalysisResult[]>([]);

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    
    // Use environment variable for API URL with fallback to localhost
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    const response = await fetch(`${apiUrl}/predict/`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Backend prediction failed.");
    }

    const result = await response.json(); // { grade: "Moderate", confidence: 0.91 }

    // Generate local ID for the result
    const id = Date.now().toString();
    const imageUrl = URL.createObjectURL(file);

    const newResult: AnalysisResult = {
      id,
      imageUrl,
      grade: mapGradeToNumber(result.grade),
      confidence: result.confidence,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem(id, JSON.stringify(newResult));
    setResults(prev => [...prev, newResult]);

    return id;
  };

  const mapGradeToNumber = (grade: string): number => {
    const map: Record<string, number> = {
      "No DR": 0,
      "Mild": 1,
      "Moderate": 2,
      "Severe": 3,
      "Proliferative DR": 4,
    };
    return map[grade] ?? 0;
  };

  const getResult = async (id: string): Promise<AnalysisResult> => {
    const local = localStorage.getItem(id);
    if (!local) throw new Error("Result not found.");
    return JSON.parse(local);
  };

  const getHistory = async (): Promise<AnalysisResult[]> => {
    return results;
  };

  const deleteResult = async (id: string): Promise<void> => {
    setResults(prev => prev.filter(r => r.id !== id));
    localStorage.removeItem(id);
  };

  return (
    <UploadContext.Provider value={{ uploadImage, getResult, getHistory, deleteResult }}>
      {children}
    </UploadContext.Provider>
  );
};

export const useUploadContext = () => {
  const context = useContext(UploadContext);
  if (context === undefined) {
    throw new Error('useUploadContext must be used within a UploadProvider');
  }
  return context;
};
