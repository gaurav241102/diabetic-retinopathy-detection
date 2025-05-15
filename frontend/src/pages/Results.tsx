import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ZoomIn, ZoomOut, Download, Share, AlertTriangle, Clock } from 'lucide-react';
import { useUploadContext } from '../context/UploadContext';

interface GradingInfo {
  grade: number;
  label: string;
  description: string;
  color: string;
  recommendation: string;
  followUp: string;
}

const Results = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const { getResult } = useUploadContext();

  const [result, setResult] = useState<{
    id: string;
    imageUrl: string;
    grade: number;
    confidence: number;
    timestamp: string;
  } | null>(null);

  useEffect(() => {
    const fetchResult = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await getResult(id);
        setResult(data);
      } catch (err) {
        console.error('Error fetching result:', err);
        setError('Failed to load analysis results. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [id, getResult]);

  const handleZoomIn = () => {
    if (zoomLevel < 2) {
      setZoomLevel(zoomLevel + 0.25);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 0.5) {
      setZoomLevel(zoomLevel - 0.25);
    }
  };

  // Grading information
  const gradingInfo: Record<number, GradingInfo> = {
    0: {
      grade: 0,
      label: 'No DR',
      description: 'No visible signs of diabetic retinopathy',
      color: 'green',
      recommendation: 'Routine annual screening recommended',
      followUp: '12 months'
    },
    1: {
      grade: 1,
      label: 'Mild NPDR',
      description: 'Presence of microaneurysms only',
      color: 'blue',
      recommendation: 'Monitor for progression',
      followUp: '9-12 months'
    },
    2: {
      grade: 2,
      label: 'Moderate NPDR',
      description: 'More than just microaneurysms but less than severe NPDR',
      color: 'yellow',
      recommendation: 'Regular monitoring advised',
      followUp: '6-9 months'
    },
    3: {
      grade: 3,
      label: 'Severe NPDR',
      description: 'Any of: >20 hemorrhages in each quadrant, venous beading in ≥2 quadrants, or intraretinal microvascular abnormalities',
      color: 'orange',
      recommendation: 'Referral to ophthalmology recommended',
      followUp: '3-4 months'
    },
    4: {
      grade: 4,
      label: 'Proliferative DR',
      description: 'Neovascularization and/or vitreous/preretinal hemorrhage',
      color: 'red',
      recommendation: 'Urgent referral to ophthalmology required',
      followUp: 'Immediate'
    }
  };

  // Get the styling based on grade severity
  const getGradeStyling = (grade: number) => {
    const colors: Record<string, { bg: string, text: string, border: string }> = {
      'green': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
      'blue': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
      'yellow': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
      'orange': { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200' },
      'red': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' }
    };

    const info = gradingInfo[grade];
    return colors[info.color];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading analysis results...</p>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-xl mx-auto bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-700 mb-2">Error Loading Results</h2>
          <p className="text-red-600 mb-6">{error || 'Result not found'}</p>
          <Link 
            to="/upload" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Return to Upload
          </Link>
        </div>
      </div>
    );
  }

  const gradeInfo = gradingInfo[result.grade];
  const gradeStyling = getGradeStyling(result.grade);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/upload" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Upload
        </Link>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Analysis Results</h1>
            <span className="text-sm">{formatDate(result.timestamp)}</span>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Image Preview */}
              <div>
                <div className="bg-gray-100 rounded-lg overflow-hidden relative">
                  <div className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-md p-1 flex space-x-1 z-10">
                    <button
                      onClick={handleZoomIn}
                      className="p-1 hover:bg-gray-200 rounded"
                      aria-label="Zoom in"
                    >
                      <ZoomIn className="h-5 w-5 text-gray-700" />
                    </button>
                    <button
                      onClick={handleZoomOut}
                      className="p-1 hover:bg-gray-200 rounded"
                      aria-label="Zoom out"
                    >
                      <ZoomOut className="h-5 w-5 text-gray-700" />
                    </button>
                  </div>
                  
                  <div 
                    className="w-full h-72 flex items-center justify-center overflow-hidden transition-transform duration-200"
                    style={{ transform: `scale(${zoomLevel})` }}
                  >
                    <img 
                      src={result.imageUrl} 
                      alt="Retinal fundus" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between">
                  <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                    <Download className="h-4 w-4 mr-1" />
                    Download Image
                  </button>
                  <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                    <Share className="h-4 w-4 mr-1" />
                    Share Results
                  </button>
                </div>
              </div>
              
              {/* Results Information */}
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Diagnosis</h2>
                  <div className={`${gradeStyling.bg} ${gradeStyling.text} ${gradeStyling.border} border rounded-lg p-4 mb-4`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-bold">{gradeInfo.label}</span>
                      <span className="font-medium">Grade {gradeInfo.grade}</span>
                    </div>
                    <p>{gradeInfo.description}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center mb-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                      <h3 className="font-medium text-gray-800">Recommendation</h3>
                    </div>
                    <p className="text-gray-700 mb-2">{gradeInfo.recommendation}</p>
                    
                    <div className="flex items-center mt-3 text-gray-700">
                      <Clock className="h-4 w-4 mr-2 text-blue-500" />
                      <span>Follow-up in: <strong>{gradeInfo.followUp}</strong></span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-3">AI Analysis Details</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Confidence Score</h3>
                      <div className="mt-1 w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${result.confidence * 100}%` }}
                        ></div>
                      </div>
                      <div className="mt-1 text-right text-sm text-gray-600">
                        {(result.confidence * 100).toFixed(1)}%
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-gray-600 text-sm">
                        This analysis is provided as a screening tool and should not replace professional medical advice. Always consult with a healthcare provider for diagnosis and treatment decisions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Link
            to="/upload"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            Analyze Another Image
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Results;