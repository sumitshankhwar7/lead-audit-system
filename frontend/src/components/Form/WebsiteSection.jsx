import React from 'react';
import Input from '../Common/Input';

const WebsiteSection = ({ data, setData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-bold text-slate-800">Website Analysis</h2>
        <p className="text-sm text-slate-500">Your current digital storefront.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="label-text">Do you have a website?</label>
          <div className="flex gap-4">
            {['yes', 'no'].map((val) => (
              <label key={val} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="hasWebsite"
                  value={val}
                  checked={data.hasWebsite === val}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-slate-300"
                />
                <span className="text-sm text-slate-700 capitalize group-hover:text-primary-600 transition-colors">{val}</span>
              </label>
            ))}
          </div>
        </div>

        {data.hasWebsite === 'yes' && (
          <Input
            label="Website URL"
            name="websiteUrl"
            placeholder="https://example.com"
            value={data.websiteUrl}
            onChange={handleChange}
            error={errors.websiteUrl}
          />
        )}

        <div className="space-y-1">
          <label className="label-text">Monthly Traffic</label>
          <select
            name="monthlyTraffic"
            value={data.monthlyTraffic}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Select Traffic Range</option>
            <option value="0-1000">0 - 1,000</option>
            <option value="1000-5000">1,000 - 5,000</option>
            <option value="5000-20000">5,000 - 20,000</option>
            <option value="20000+">20,000+</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="label-text">Generating Leads from Website?</label>
          <div className="flex gap-4">
            {['yes', 'no'].map((val) => (
              <label key={val} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="generatingLeads"
                  value={val}
                  checked={data.generatingLeads === val}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-slate-300"
                />
                <span className="text-sm text-slate-700 capitalize group-hover:text-primary-600 transition-colors">{val}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteSection;
