
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import AnalysisResultView from './components/AnalysisResultView';
import { analyzeArticle } from './services/geminiService';
import { AnalysisResult, SavedAnalysis } from './types';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [isUrl, setIsUrl] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<SavedAnalysis[]>([]);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeArticle(input, isUrl);
      setResult(data);
      
      const newHistoryItem: SavedAnalysis = {
        id: Date.now().toString(),
        url: isUrl ? input : 'Pasted Text',
        timestamp: Date.now(),
        data
      };
      setHistory(prev => [newHistoryItem, ...prev].slice(0, 10));
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred during analysis.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setResult(null);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Analyze Any Article
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get instant summaries, sentiment scores, and key takeaways from Mpelembe Network news or any web content.
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-12">
          <div className="flex border-b border-gray-100">
            <button 
              onClick={() => { setIsUrl(true); setInput(''); }}
              className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${isUrl ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <i className="fas fa-link mr-2"></i> Website URL
            </button>
            <button 
              onClick={() => { setIsUrl(false); setInput(''); }}
              className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${!isUrl ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <i className="fas fa-file-alt mr-2"></i> Paste Text
            </button>
          </div>
          
          <div className="p-6">
            {isUrl ? (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-400">https://</span>
                </div>
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="mpelembe.net/articles/some-news-piece"
                  className="w-full pl-16 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-800 placeholder-gray-400"
                />
              </div>
            ) : (
              <textarea 
                rows={6}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste the article content here..."
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-800 placeholder-gray-400 resize-none"
              />
            )}
            
            <div className="mt-6 flex items-center justify-between">
              <p className="text-xs text-gray-400">
                <i className="fas fa-info-circle mr-1"></i> Powered by Gemini 3 Flash
              </p>
              <button 
                onClick={handleAnalyze}
                disabled={isLoading || !input.trim()}
                className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] ${isLoading || !input.trim() ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 shadow-lg shadow-blue-200 hover:bg-blue-700'}`}
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-circle-notch fa-spin"></i>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-bolt"></i>
                    <span>Analyze Content</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-12 flex items-start space-x-3 text-red-700">
            <i className="fas fa-exclamation-triangle mt-1"></i>
            <div>
              <p className="font-bold">Analysis Failed</p>
              <p className="text-sm opacity-90">{error}</p>
            </div>
          </div>
        )}

        {/* Loading Skeleton Simulation */}
        {isLoading && (
          <div className="space-y-6 animate-pulse">
            <div className="h-48 bg-gray-200 rounded-2xl"></div>
            <div className="grid grid-cols-3 gap-6">
              <div className="h-64 bg-gray-200 rounded-2xl"></div>
              <div className="col-span-2 h-64 bg-gray-200 rounded-2xl"></div>
            </div>
          </div>
        )}

        {/* Results */}
        {result && !isLoading && (
          <div className="relative">
            <button 
              onClick={clearResults}
              className="absolute -top-6 right-0 text-sm text-gray-400 hover:text-blue-600 transition-colors"
            >
              <i className="fas fa-times mr-1"></i> Clear Result
            </button>
            <AnalysisResultView result={result} />
          </div>
        )}

        {/* Recent History Sidebar Concept (only shown if results exist elsewhere or empty state) */}
        {!result && !isLoading && history.length > 0 && (
          <div className="mt-20">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Recent History</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {history.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => setResult(item.data)}
                  className="flex flex-col p-4 bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all text-left group"
                >
                  <span className="text-xs text-gray-400 mb-1">{new Date(item.timestamp).toLocaleDateString()}</span>
                  <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 line-clamp-1">{item.data.title}</h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{item.url}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!result && !isLoading && history.length === 0 && (
          <div className="mt-20 text-center py-20 bg-blue-50/30 rounded-3xl border border-dashed border-blue-200">
             <i className="fas fa-search text-blue-200 text-6xl mb-6"></i>
             <p className="text-gray-400 font-medium italic">No recent analyses. Start by providing an article above.</p>
          </div>
        )}
      </main>

      {/* Footer Info */}
      <footer className="mt-20 border-t border-gray-100 py-10 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Mpelembe Insights. Built with Google Gemini 3 Flash.
        </p>
        <p className="text-xs text-gray-400 mt-2">
          An independent tool for analyzing regional Zambian news and education content.
        </p>
      </footer>
    </div>
  );
};

export default App;
