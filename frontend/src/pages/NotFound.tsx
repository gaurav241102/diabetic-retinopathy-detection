import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Eye } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-blue-700 mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-800 mb-6">Page Not Found</p>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="bg-blue-600 text-white hover:bg-blue-700 font-medium px-6 py-3 rounded-lg shadow-md transition-colors duration-300 flex items-center justify-center"
          >
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <Link 
            to="/upload" 
            className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium px-6 py-3 rounded-lg shadow-sm transition-colors duration-300 flex items-center justify-center"
          >
            <Eye className="h-5 w-5 mr-2" />
            Upload Image
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;