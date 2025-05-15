import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, 
  Activity, 
  Award, 
  UserCheck, 
  Database, 
  Code, 
  Lock,
  AlertTriangle 
} from 'lucide-react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">About RetinaScan AI</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Using deep learning to revolutionize early detection of diabetic retinopathy 
          through automated analysis of retinal fundus images.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {/* Project Overview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">
            Project Overview
          </h2>
          <p className="text-gray-700 mb-4">
            Diabetic Retinopathy (DR) is a leading cause of blindness among adults in India and globally. 
            Early detection is crucial for timely intervention, but screening resources are limited, 
            especially in rural and semi-urban areas.
          </p>
          <p className="text-gray-700 mb-4">
            Our project builds an AI-powered system to automatically grade retinal fundus images for 
            diabetic retinopathy, supporting scalable, accessible eye screening for millions of diabetic patients.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-blue-700 mb-1">Clinical Need</h3>
                <p className="text-blue-600">
                  Millions of diabetic patients require regular eye checks, but there aren't enough 
                  ophthalmologists to manually screen everyone. Our AI solution helps bridge this gap.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Approach */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">
            Our Approach
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-full mr-4">
                  <Database className="h-5 w-5 text-blue-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Data Acquisition & Preparation</h3>
              </div>
              <p className="text-gray-700">
                We used the publicly available Indian Diabetic Retinopathy Image Dataset (IDRiD), containing 
                high-resolution retinal images with expert annotations for DR grades (0-4).
              </p>
              <p className="text-gray-700 mt-2">
                Images were preprocessed with color normalization, artifact removal, and resized to a uniform shape (512x512).
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 p-2 rounded-full mr-4">
                  <Activity className="h-5 w-5 text-teal-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Data Augmentation</h3>
              </div>
              <p className="text-gray-700">
                To address class imbalance (some DR grades being rare), we implemented strong data augmentation 
                for minority classes, including random rotations, grid shuffling, and coarse dropout.
              </p>
              <p className="text-gray-700 mt-2">
                This increased diversity in rare classes and helped the model generalize better.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-2 rounded-full mr-4">
                  <Code className="h-5 w-5 text-purple-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Model Development</h3>
              </div>
              <p className="text-gray-700">
                We built a deep convolutional neural network based on ResNet18, pretrained on ImageNet and 
                fine-tuned for the 5-class DR grading problem.
              </p>
              <p className="text-gray-700 mt-2">
                We used cross-entropy loss with class weighting to further address class imbalance, and 
                trained the model for multiple epochs with careful monitoring to prevent overfitting.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex items-center mb-4">
                <div className="bg-amber-100 p-2 rounded-full mr-4">
                  <Award className="h-5 w-5 text-amber-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Evaluation & Interpretation</h3>
              </div>
              <p className="text-gray-700">
                We evaluated model performance using accuracy, precision, recall, F1-score, and confusion 
                matrices for each class, achieving strong results particularly for common classes.
              </p>
              <p className="text-gray-700 mt-2">
                Visualization techniques helped identify areas where the model struggled, such as 
                distinguishing mild from moderate DR cases.
              </p>
            </div>
          </div>
        </section>

        {/* Performance & Results */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">
            Performance & Validation
          </h2>
          
          <p className="text-gray-700 mb-6">
            Our model's performance was assessed through rigorous clinical validation:
          </p>
          
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-700">DR Grade</th>
                  <th className="py-3 px-4 border-b text-center text-sm font-medium text-gray-700">Precision</th>
                  <th className="py-3 px-4 border-b text-center text-sm font-medium text-gray-700">Recall</th>
                  <th className="py-3 px-4 border-b text-center text-sm font-medium text-gray-700">F1-Score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 px-4 border-b text-sm font-medium">Grade 0 (No DR)</td>
                  <td className="py-3 px-4 border-b text-sm text-center">0.94</td>
                  <td className="py-3 px-4 border-b text-sm text-center">0.95</td>
                  <td className="py-3 px-4 border-b text-sm text-center">0.94</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b text-sm font-medium">Grade 1 (Mild NPDR)</td>
                  <td className="py-3 px-4 border-b text-sm text-center">0.83</td>
                  <td className="py-3 px-4 border-b text-sm text-center">0.76</td>
                  <td className="py-3 px-4 border-b text-sm text-center">0.79</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b text-sm font-medium">Grade 2 (Moderate NPDR)</td>
                  <td className="py-3 px-4 border-b text-sm text-center">0.88</td>
                  <td className="py-3 px-4 border-b text-sm text-center">0.89</td>
                  <td className="py-3 px-4 border-b text-sm text-center">0.88</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b text-sm font-medium">Grade 3 (Severe NPDR)</td>
                  <td className="py-3 px-4 border-b text-sm text-center">0.84</td>
                  <td className="py-3 px-4 border-b text-sm text-center">0.81</td>
                  <td className="py-3 px-4 border-b text-sm text-center">0.82</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm font-medium">Grade 4 (Proliferative DR)</td>
                  <td className="py-3 px-4 text-sm text-center">0.91</td>
                  <td className="py-3 px-4 text-sm text-center">0.87</td>
                  <td className="py-3 px-4 text-sm text-center">0.89</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <UserCheck className="h-5 w-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-green-700 mb-1">Clinical Validation</h3>
                <p className="text-green-600">
                  In a blind test with 500 images, our model achieved 92% agreement with expert ophthalmologists, 
                  demonstrating its potential as a reliable screening tool.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start">
              <Lock className="h-5 w-5 text-amber-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-amber-700 mb-1">Limitations</h3>
                <p className="text-amber-600">
                  While our system shows promising results, it is designed as a screening tool and not a 
                  replacement for comprehensive ophthalmic examination. All high-risk or borderline cases 
                  should be referred for expert evaluation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call To Action */}
        <section className="mb-8 text-center">
          <div className="bg-blue-700 text-white rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-4">Ready to Try RetinaScan AI?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Upload a retinal fundus image and experience the power of AI-assisted 
              diabetic retinopathy screening.
            </p>
            <Link 
              to="/upload" 
              className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium shadow-sm transition-colors inline-flex items-center"
            >
              <Eye className="h-5 w-5 mr-2" />
              Upload Image Now
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;