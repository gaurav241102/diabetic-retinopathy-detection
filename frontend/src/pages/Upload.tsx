import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload as UploadIcon, Image, FileWarning, CheckCircle, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { useUploadContext } from '../context/UploadContext';

const Upload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { uploadImage } = useUploadContext();

  const acceptedFileTypes = ['image/jpeg', 'image/png', 'image/tiff'];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    
    // Check file type
    if (!acceptedFileTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPEG, PNG, or TIFF)');
      return;
    }
    
    // Check file size
    if (file.size > maxFileSize) {
      toast.error('File is too large. Maximum size is 10MB');
      return;
    }
    
    setSelectedFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select an image to upload');
      return;
    }

    setIsUploading(true);
    
    try {
      // Call the upload function from context
      const resultId = await uploadImage(selectedFile);
      
      // Show success message
      toast.success('Image uploaded successfully!');
      
      // Redirect to results page
      navigate(`/results/${resultId}`);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Upload Retinal Image</h1>
          <p className="text-gray-600">
            Upload a high-quality retinal fundus image for automated diabetic retinopathy detection.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging 
                ? 'border-blue-500 bg-blue-50' 
                : selectedFile 
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
            }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input 
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/jpeg,image/png,image/tiff"
              onChange={(e) => {
                if (e.target.files) {
                  handleFileChange(e.target.files[0]);
                }
              }}
            />
            
            {!selectedFile ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <UploadIcon className="h-16 w-16 text-blue-500" />
                </div>
                <div>
                  <p className="text-lg font-medium">
                    Drag and drop your retinal image here
                  </p>
                  <p className="text-gray-500 mt-1">or</p>
                  <button
                    onClick={handleBrowseClick}
                    className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    disabled={isUploading}
                  >
                    Browse Files
                  </button>
                </div>
                <p className="text-sm text-gray-500">
                  Supported formats: JPEG, PNG, TIFF (max 10MB)
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
                <p className="text-lg font-medium text-green-700">
                  {selectedFile.name}
                </p>
                <p className="text-sm text-gray-600">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
                <button
                  onClick={handleClear}
                  className="text-red-600 hover:text-red-800 font-medium text-sm"
                  disabled={isUploading}
                >
                  Clear selection
                </button>
              </div>
            )}
          </div>

          {previewUrl && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Image Preview</h3>
              <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={previewUrl} 
                  alt="Retinal fundus preview" 
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
              className={`px-6 py-2 rounded-md font-medium flex items-center ${
                !selectedFile || isUploading 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isUploading ? (
                <>
                  <Loader className="h-5 w-5 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <UploadIcon className="h-5 w-5 mr-2" />
                  Upload Image
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-800 mb-3">Image Quality Guidelines</h3>
          <ul className="space-y-2 text-blue-700">
            <li className="flex items-start">
              <Image className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <span>Use clear, focused retinal fundus images with good illumination</span>
            </li>
            <li className="flex items-start">
              <Image className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <span>Ensure the entire retina is visible in the image</span>
            </li>
            <li className="flex items-start">
              <Image className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <span>Higher resolution images (≥ 2048 x 2048) provide better results</span>
            </li>
            <li className="flex items-start">
              <FileWarning className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <span>Avoid images with glare, excessive blurring, or poor focus</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Upload;