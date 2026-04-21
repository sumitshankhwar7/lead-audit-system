import React from 'react';

const RecommendationsList = ({ recommendations }) => {
  const allRecos = [...recommendations.high, ...recommendations.medium, ...recommendations.low];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-3xl font-bold text-slate-900">Priority Recommendations</h3>
        <span className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-sm font-semibold">
          {allRecos.length} Total Suggestions
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allRecos.map((reco, index) => (
          <div key={index} className="glass-card p-6 rounded-2xl border-t-4 border-t-primary-500 transition-all hover:-translate-y-2 hover:shadow-2xl group">
            <div className="flex justify-between items-start mb-4">
              <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
                reco.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {reco.priority} Priority
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                Impact: {reco.impact}
              </span>
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
              {reco.service}
            </h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              {reco.description}
            </p>
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs font-bold text-primary-600">Learn More</span>
              <span className="text-xl">→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsList;
