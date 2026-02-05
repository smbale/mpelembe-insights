
import React from 'react';
import { AnalysisResult } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface AnalysisResultViewProps {
  result: AnalysisResult;
}

const AnalysisResultView: React.FC<AnalysisResultViewProps> = ({ result }) => {
  const chartData = [
    { name: 'Positive', value: result.sentimentScore },
    { name: 'Negative', value: 100 - result.sentimentScore },
  ];

  const COLORS = ['#3B82F6', '#EF4444'];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider">
            {result.category}
          </span>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span><i className="far fa-clock mr-1"></i> {result.readingTime}</span>
            <span><i className="fas fa-brain mr-1"></i> {result.complexity}</span>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{result.title}</h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-6 italic border-l-4 border-blue-200 pl-4">
          {result.summary}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {result.tags.map((tag, idx) => (
            <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-lg">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sentiment Analysis */}
        <div className="md:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
            <i className="fas fa-smile-beam mr-2 text-blue-500"></i> Sentiment
          </h3>
          <div className="h-48 w-full flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="text-center mt-2">
              <span className={`text-2xl font-bold ${result.sentiment === 'Positive' ? 'text-blue-600' : 'text-red-600'}`}>
                {result.sentiment}
              </span>
              <p className="text-xs text-gray-500">{result.sentimentScore}% Positive Tone</p>
            </div>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
            <i className="fas fa-list-check mr-2 text-blue-500"></i> Key Insights
          </h3>
          <ul className="space-y-4">
            {result.keyTakeaways.map((point, idx) => (
              <li key={idx} className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-gray-700">{point}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Entities Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold mb-6 text-gray-800 flex items-center">
          <i className="fas fa-tags mr-2 text-blue-500"></i> Mentioned Entities
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">People</h4>
            <div className="flex flex-wrap gap-2">
              {result.entities.people.length > 0 ? result.entities.people.map((p, i) => (
                <span key={i} className="text-sm px-3 py-1 bg-purple-50 text-purple-700 rounded-md border border-purple-100">{p}</span>
              )) : <span className="text-gray-400 italic text-sm">None detected</span>}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Locations</h4>
            <div className="flex flex-wrap gap-2">
              {result.entities.locations.length > 0 ? result.entities.locations.map((l, i) => (
                <span key={i} className="text-sm px-3 py-1 bg-green-50 text-green-700 rounded-md border border-green-100">{l}</span>
              )) : <span className="text-gray-400 italic text-sm">None detected</span>}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Organizations</h4>
            <div className="flex flex-wrap gap-2">
              {result.entities.organizations.length > 0 ? result.entities.organizations.map((o, i) => (
                <span key={i} className="text-sm px-3 py-1 bg-orange-50 text-orange-700 rounded-md border border-orange-100">{o}</span>
              )) : <span className="text-gray-400 italic text-sm">None detected</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResultView;
