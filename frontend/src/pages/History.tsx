import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, AlertTriangle, Search, Filter, Trash2 } from 'lucide-react';
import { useUploadContext } from '../context/UploadContext';

interface HistoryItem {
  id: string;
  imageUrl: string;
  grade: number;
  timestamp: string;
  patientId?: string;
}

const gradeLables = [
  'No DR',
  'Mild NPDR',
  'Moderate NPDR',
  'Severe NPDR',
  'Proliferative DR'
];

const gradeColors = [
  'bg-green-100 text-green-800 border-green-200',
  'bg-blue-100 text-blue-800 border-blue-200',
  'bg-yellow-100 text-yellow-800 border-yellow-200',
  'bg-orange-100 text-orange-800 border-orange-200',
  'bg-red-100 text-red-800 border-red-200'
];

const History = () => {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGrade, setFilterGrade] = useState<number | null>(null);
  const { getHistory, deleteResult } = useUploadContext();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const data = await getHistory();
        setHistoryItems(data);
      } catch (err) {
        console.error('Error fetching history:', err);
        setError('Failed to load analysis history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [getHistory]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this analysis?')) {
      try {
        await deleteResult(id);
        setHistoryItems(historyItems.filter(item => item.id !== id));
      } catch (err) {
        console.error('Error deleting result:', err);
        setError('Failed to delete analysis');
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const filteredHistory = historyItems
    .filter(item => {
      const matchesSearch = searchQuery === '' || 
        (item.patientId && item.patientId.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesGrade = filterGrade === null || item.grade === filterGrade;
      return matchesSearch && matchesGrade;
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading analysis history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-xl mx-auto bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-700 mb-2">Error Loading History</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <Link 
            to="/upload" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go to Upload
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Analysis History</h1>
          
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search by patient ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select
                value={filterGrade !== null ? filterGrade : ''}
                onChange={(e) => setFilterGrade(e.target.value === '' ? null : Number(e.target.value))}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full appearance-none bg-white"
              >
                <option value="">All grades</option>
                {gradeLables.map((label, index) => (
                  <option key={index} value={index}>
                    {label} (Grade {index})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {historyItems.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 text-center">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-700 mb-2">No Analysis History</h2>
            <p className="text-gray-600 mb-6">
              You haven't analyzed any retinal images yet.
            </p>
            <Link 
              to="/upload" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Upload Your First Image
            </Link>
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 text-center">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-700 mb-2">No Matching Results</h2>
            <p className="text-gray-600">
              No analysis results match your current search or filter criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHistory.map(item => (
              <Link
                key={item.id}
                to={`/results/${item.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="relative h-40 bg-gray-200">
                  <img 
                    src={item.imageUrl}
                    alt="Retinal scan thumbnail" 
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={(e) => handleDelete(item.id, e)}
                    className="absolute top-2 right-2 p-1.5 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 text-red-500 hover:text-red-600 transition-colors"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div 
                      className={`${gradeColors[item.grade]} text-xs font-medium px-2 py-1 rounded-md border`}
                    >
                      {gradeLables[item.grade]}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDate(item.timestamp)}
                    </div>
                  </div>
                  
                  {item.patientId && (
                    <div className="text-sm text-gray-700">
                      <span className="font-medium">Patient ID:</span> {item.patientId}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
        
        {historyItems.length > 0 && (
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Showing {filteredHistory.length} of {historyItems.length} analyses
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;