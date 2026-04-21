import React from 'react';

const RevenueOpportunity = ({ data }) => {
  return (
    <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden animate-slide-up">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        <div className="lg:col-span-1 border-r border-white/10 pr-8">
          <h2 className="text-2xl font-bold mb-2">Revenue Growth Opportunity</h2>
          <p className="text-slate-400">Based on your current lead gap and average deal size.</p>
          <div className="mt-8">
            <p className="text-sm font-semibold text-primary-400 uppercase tracking-widest mb-1">Estimated Annual Gap</p>
            <p className="text-5xl font-black text-white">{data.revenueGap}</p>
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <p className="text-slate-400 text-sm mb-1">Monthly Lead Gap</p>
            <p className="text-3xl font-bold text-primary-400">{data.leadGap}</p>
            <p className="text-xs text-slate-500 mt-2">Leads needed to hit targets</p>
          </div>
          
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <p className="text-slate-400 text-sm mb-1">Current Leads (Est.)</p>
            <p className="text-3xl font-bold text-slate-200">{data.currentLeads}</p>
            <p className="text-xs text-slate-500 mt-2">Based on current channels</p>
          </div>

          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <p className="text-slate-400 text-sm mb-1">Potential ROI</p>
            <p className="text-3xl font-bold text-emerald-400">{data.roi}</p>
            <p className="text-xs text-slate-500 mt-2">Estimated return on spend</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueOpportunity;
