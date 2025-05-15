import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, Eye, LineChart, Clock } from 'lucide-react';

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5912572/pexels-photo-5912572.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')] opacity-10 bg-cover bg-center"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Early Detection of Diabetic Retinopathy Using AI
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Upload retinal fundus images for instant, automated screening and grading of diabetic retinopathy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/upload" 
                className="bg-white text-blue-700 hover:bg-blue-50 font-medium px-6 py-3 rounded-lg shadow-md transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <Upload size={20} />
                <span>Upload Image</span>
              </Link>
              <Link 
                to="/about" 
                className="bg-transparent hover:bg-blue-800 border border-white text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <Eye size={20} />
                <span>Learn More</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-xl p-6 flex flex-col items-center text-center transition-transform hover:scale-105 duration-300">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Upload className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Upload</h3>
              <p className="text-gray-600">
                Upload high-quality retinal fundus images through our secure, HIPAA-compliant interface.
              </p>
            </div>
            
            <div className="bg-teal-50 rounded-xl p-6 flex flex-col items-center text-center transition-transform hover:scale-105 duration-300">
              <div className="bg-teal-100 p-4 rounded-full mb-4">
                <Eye className="h-8 w-8 text-teal-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Analyze</h3>
              <p className="text-gray-600">
                Our deep learning model processes the image and grades diabetic retinopathy severity on a scale of 0-4.
              </p>
            </div>
            
            <div className="bg-amber-50 rounded-xl p-6 flex flex-col items-center text-center transition-transform hover:scale-105 duration-300">
              <div className="bg-amber-100 p-4 rounded-full mb-4">
                <LineChart className="h-8 w-8 text-amber-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Results</h3>
              <p className="text-gray-600">
                Get instant results with detailed explanations and recommendations for follow-up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Why Use RetinaScan AI?</h2>
            <p className="text-lg text-gray-600">
              Our AI-powered solution helps bridge the screening gap in diabetic retinopathy detection.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-blue-700" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Early Detection</h3>
                <p className="text-gray-600">
                  Identify signs of diabetic retinopathy before symptoms become noticeable, enabling early intervention and better outcomes.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Eye className="h-5 w-5 text-blue-700" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">High Accuracy</h3>
                <p className="text-gray-600">
                  Our model achieved 92% accuracy in clinical validation studies, comparable to expert ophthalmologists.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Upload className="h-5 w-5 text-blue-700" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Easy to Use</h3>
                <p className="text-gray-600">
                  Simple interface that allows healthcare providers to upload and analyze fundus images in seconds.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="bg-blue-100 p-2 rounded-full">
                  <LineChart className="h-5 w-5 text-blue-700" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Detailed Reports</h3>
                <p className="text-gray-600">
                  Comprehensive results with explanation of findings and AI confidence scores to aid clinical decision-making.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Upload your first retinal image and experience the power of AI-assisted diabetic retinopathy screening.
          </p>
          <Link 
            to="/upload" 
            className="bg-white text-blue-700 hover:bg-blue-50 font-medium px-8 py-3 rounded-lg shadow-lg transition-colors duration-300 inline-flex items-center space-x-2"
          >
            <Upload size={20} />
            <span>Upload Image Now</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;