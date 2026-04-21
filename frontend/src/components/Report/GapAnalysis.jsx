import React from 'react';

const GapAnalysis = ({ gaps }) => {
  return (
    <div className="glass-card p-8 rounded-3xl h-full animate-fade-in">
      <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <span className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center text-lg">⚠️</span>
        Gap Analysis
      </h3>
      <div className="space-y-4">
        {gaps.map((gap, index) => (
          <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:shadow-md">
            <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
              gap.severity === 'Critical' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 
              gap.severity === 'High' ? 'bg-amber-500' : 'bg-blue-500'
            }`}></div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-slate-800">{gap.area}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  gap.severity === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-slate-200 text-slate-600'
                }`}>{gap.severity}</span>
              </div>
              <p className="text-sm text-slate-500">{gap.impact}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GapAnalysis;
