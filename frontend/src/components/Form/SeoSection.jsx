import React from 'react';

const SeoSection = ({ data, setData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const fields = [
    { label: 'Ranking for any Keywords?', name: 'rankingKeywords' },
    { label: 'Good Google Visibility?', name: 'googleVisibility' },
    { label: 'Google Business Listing?', name: 'googleBusinessListing' }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-800">SEO Status</h2>
      </div>

      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700">{field.label}</label>
            <div className="flex gap-4">
              {['yes', 'no'].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setData(prev => ({ ...prev, [field.name]: val }))}
                  className={`px-4 py-2 rounded-lg text-sm transition-all border ${
                    data[field.name] === val
                      ? 'bg-primary-50 border-primary-200 text-primary-700 ring-2 ring-primary-100'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <span className="capitalize">{val}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeoSection;
