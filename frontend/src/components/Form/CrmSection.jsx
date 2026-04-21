import React from 'react';
import Input from '../Common/Input';

const CrmSection = ({ data, setData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-bold text-slate-800">CRM & Automation</h2>
        <p className="text-sm text-slate-500">How do you manage and track your leads?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="label-text">Using a CRM system?</label>
            <div className="flex gap-4">
              {['yes', 'no'].map((val) => (
                <label key={val} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="usingCrm"
                    value={val}
                    checked={data.usingCrm === val}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-slate-300"
                  />
                  <span className="text-sm text-slate-700 capitalize">{val}</span>
                </label>
              ))}
            </div>
          </div>

          {data.usingCrm === 'yes' && (
            <Input
              label="Which CRM?"
              name="crmName"
              placeholder="e.g. HubSpot, Salesforce"
              value={data.crmName}
              onChange={handleChange}
            />
          )}
        </div>

        <div className="space-y-1">
          <label className="label-text">Lead Tracking Method</label>
          <select
            name="leadTrackingMethod"
            value={data.leadTrackingMethod}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Select Method</option>
            <option value="automated">Fully Automated</option>
            <option value="manual">Manual (Excel/Spreadsheet)</option>
            <option value="none">No formal tracking</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CrmSection;
