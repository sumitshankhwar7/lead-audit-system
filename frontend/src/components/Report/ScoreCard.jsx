import React from 'react';

const ScoreCard = ({ score, category }) => {
  const percentage = Number(((score / 100) * 100).toFixed(2));
  const colorClass = 
    score > 80 ? 'text-emerald-500 stroke-emerald-500' :
    score > 60 ? 'text-blue-500 stroke-blue-500' :
    score > 40 ? 'text-amber-500 stroke-amber-500' : 'text-red-500 stroke-red-500';

  const bgColorClass = 
    score > 80 ? 'bg-emerald-50' :
    score > 60 ? 'bg-blue-50' :
    score > 40 ? 'bg-amber-50' : 'bg-red-50';

  return (
    <div className={`p-8 rounded-3xl ${bgColorClass} flex flex-col items-center justify-center text-center shadow-inner h-full animate-fade-in`}>
      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Overall Audit Score</h3>
      
      <div className="relative w-48 h-48">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-slate-200"
          />
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={553}
            strokeDashoffset={553 - (553 * percentage) / 100}
            strokeLinecap="round"
            className={`${colorClass} transition-all duration-1000 ease-out`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-5xl font-black ${colorClass}`}>{Number(score).toFixed(1)}</span>
          <span className="text-slate-400 font-medium">/ 100</span>
        </div>
      </div>

      <div className={`mt-6 px-6 py-2 rounded-full font-bold text-lg ${colorClass} bg-white shadow-sm border border-white`}>
        {category} Status
      </div>
    </div>
  );
};

export default ScoreCard;
