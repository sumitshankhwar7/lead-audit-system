import React from 'react';

const MarketingSection = ({ data, setData }) => {
  const fields = [
    { label: 'Do you use LinkedIn for B2B Networking?', name: 'usingLinkedIn' },
    { label: 'Do you use WhatsApp for Marketing?', name: 'usingWhatsApp' },
    { label: 'Do you run Email Marketing Campaigns?', name: 'usingEmailMarketing' },
    { label: 'Do you use a Professional Business Email (name@company.com)?', name: 'usingBusinessEmail' }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-bold text-slate-800">Digital Marketing</h2>
        <p className="text-sm text-slate-500">Tell us about your other digital communication channels.</p>
      </div>

      <div className="space-y-6">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col gap-3">
            <label className="text-sm font-semibold text-slate-700 ml-1">{field.label}</label>
            <select
              name={field.name}
              value={data[field.name] || ''}
              onChange={(e) => setData(prev => ({ ...prev, [field.name]: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-700 bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none appearance-none"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2364748b\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5em' }}
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketingSection;
