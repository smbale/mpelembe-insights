
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <i className="fas fa-newspaper text-white text-xl"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Mpelembe<span className="text-blue-600">Insights</span></h1>
            <p className="text-xs text-gray-500 font-medium">Article Analysis Engine</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Analyzer</a>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">History</a>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">About Mpelembe</a>
          <button className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
            Sign In
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
