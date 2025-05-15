import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, HeartPulse, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Eye size={24} className="text-blue-400" />
              <span className="text-xl font-bold text-white">RetinaScan AI</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Automated early detection of diabetic retinopathy using deep learning on retinal fundus images.
            </p>
            <div className="flex items-center space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <HeartPulse size={20} className="text-red-500" />
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/upload" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Upload Image
                </Link>
              </li>
              <li>
                <Link to="/history" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Analysis History
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-blue-400 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www.mayoclinic.org/diseases-conditions/diabetic-retinopathy/symptoms-causes/syc-20371611" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Diabetic Retinopathy Info
                </a>
              </li>
              <li>
                <a 
                  href="https://www.nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases/diabetic-retinopathy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  NIH Resources
                </a>
              </li>
              <li>
                <a 
                  href="https://idrid.grand-challenge.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  IDRiD Dataset
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>© {currentYear} RetinaScan AI. All rights reserved.</p>
          <p className="mt-1">
            This tool is designed to assist healthcare professionals and should not replace professional medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;