import React from 'react';
import Input from '../Common/Input';

const PaidAdsSection = ({ data, setData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const platforms = ['Google Ads', 'Facebook Ads', 'LinkedIn Ads', 'Instagram Ads'];

  const togglePlatform = (platform) => {
    const current = data.adPlatforms || [];
    const updated = current.includes(platform)
      ? current.filter(p => p !== platform)
      : [...current, platform];
    setData(prev => ({ ...prev, adPlatforms: updated }));
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-bold text-slate-800">Paid Advertising</h2>
        <p className="text-sm text-slate-500">Insights into your current ad spend and strategy.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="label-text">Are you currently running ads?</label>
            <div className="flex gap-4">
              {['yes', 'no'].map((val) => (
                <label key={val} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="runningAds"
                    value={val}
                    checked={data.runningAds === val}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-slate-300"
                  />
                  <span className="text-sm text-slate-700 capitalize">{val}</span>
                </label>
              ))}
            </div>
          </div>

          {data.runningAds === 'yes' && (
            <div className="space-y-2 animate-fade-in">
              <label className="label-text">Select Platforms</label>
              <div className="flex flex-wrap gap-2">
                {platforms.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => togglePlatform(p)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      data.adPlatforms?.includes(p)
                        ? 'bg-primary-50 border-primary-200 text-primary-700'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {data.runningAds === 'yes' && (
          <div className="animate-fade-in">
            <Input
              label="Estimated Monthly Ad Budget ($)"
              type="number"
              name="monthlyBudget"
              placeholder="e.g. 1000"
              value={data.monthlyBudget}
              onChange={handleChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaidAdsSection;
