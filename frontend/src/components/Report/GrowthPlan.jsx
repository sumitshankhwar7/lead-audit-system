import React from 'react';

const GrowthPlan = ({ plan }) => {
  const phases = [
    { name: 'Phase 1: Immediate Wins', items: plan.shortTerm, color: 'primary' },
    { name: 'Phase 2: Scale', items: plan.midTerm, color: 'emerald' },
    { name: 'Phase 3: Optimize', items: plan.longTerm, color: 'indigo' }
  ];

  return (
    <div className="glass-card p-8 rounded-3xl h-full animate-fade-in">
      <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center text-lg">🚀</span>
        Growth Roadmap
      </h3>
      <div className="space-y-8 relative before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
        {phases.map((phase, i) => (
          <div key={i} className="relative pl-10">
            <div className={`absolute left-0 top-1 w-8 h-8 rounded-full bg-white border-2 border-${phase.color}-500 z-10 flex items-center justify-center text-xs font-bold text-${phase.color}-600`}>
              {i + 1}
            </div>
            <h4 className="font-bold text-slate-800 mb-3">{phase.name}</h4>
            <ul className="space-y-2">
              {phase.items.map((item, j) => (
                <li key={j} className="text-sm text-slate-500 flex items-center gap-2">
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  {item.service}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrowthPlan;
