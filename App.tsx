import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import ExplorePage from './components/ExplorePage';
import ChatPage from './components/ChatPage';
import UploadPage from './components/UploadPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'explore':
        return <ExplorePage />;
      case 'profiles':
        return <div className="min-h-screen bg-slate-50 p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 mb-6">Profile Viewer</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 text-center">
              <h2 className="text-xl font-semibold text-slate-700 mb-2">Profile Analysis Interface</h2>
              <p className="text-slate-600">Interactive depth-time plots and parameter comparisons coming soon...</p>
            </div>
          </div>
        </div>;
      case 'chat':
        return <ChatPage />;
      case 'upload':
        return <UploadPage />;
      case 'catalog':
        return <div className="min-h-screen bg-slate-50 p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 mb-6">Data Catalog</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 text-center">
              <h2 className="text-xl font-semibold text-slate-700 mb-2">Float Metadata Browser</h2>
              <p className="text-slate-600">Searchable catalog of Argo floats and profiles coming soon...</p>
            </div>
          </div>
        </div>;
      case 'admin':
        return <div className="min-h-screen bg-slate-50 p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 mb-6">Admin Dashboard</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 text-center">
              <h2 className="text-xl font-semibold text-slate-700 mb-2">Pipeline Monitoring</h2>
              <p className="text-slate-600">System status, job queues, and data lineage monitoring coming soon...</p>
            </div>
          </div>
        </div>;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
    </div>
  );
}

export default App;