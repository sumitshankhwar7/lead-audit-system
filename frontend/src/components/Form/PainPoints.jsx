import React from 'react';

const PainPoints = ({ data, setData }) => {
  const commonPains = [
    'Not enough leads',
    'Low quality leads',
    'High cost per lead',
    'Poor website conversion',
    'No time for marketing',
    'Difficult to track ROI',
    'Competitors winning online'
  ];

  const togglePain = (pain) => {
    const current = data.painPoints || [];
    const updated = current.includes(pain)
      ? current.filter(p => p !== pain)
      : [...current, pain];
    setData(prev => ({ ...prev, painPoints: updated }));
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-bold text-slate-800">Current Pain Points</h2>
        <p className="text-sm text-slate-500">Select the challenges you're currently facing.</p>
      </div>

      <div className="flex flex-wrap gap-3">
        {commonPains.map((pain) => (
          <button
            key={pain}
            type="button"
            onClick={() => togglePain(pain)}
            className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border ${
              data.painPoints?.includes(pain)
                ? 'bg-red-50 border-red-200 text-red-700 shadow-sm scale-105'
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            {pain}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PainPoints;
