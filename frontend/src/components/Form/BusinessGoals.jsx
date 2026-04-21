import React from 'react';
import Input from '../Common/Input';

const BusinessGoals = ({ data, setData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-bold text-slate-800">Growth Goals</h2>
        <p className="text-sm text-slate-500">What are you looking to achieve?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input
          label="Monthly Revenue Target ($)"
          type="number"
          name="monthlyRevenueTarget"
          placeholder="e.g. 50000"
          value={data.monthlyRevenueTarget}
          onChange={handleChange}
        />
        
        <Input
          label="Required Leads/Month"
          type="number"
          name="requiredLeadsPerMonth"
          placeholder="e.g. 100"
          value={data.requiredLeadsPerMonth}
          onChange={handleChange}
        />

        <Input
          label="Average Deal Size ($)"
          type="number"
          name="averageDealSize"
          placeholder="e.g. 5000"
          value={data.averageDealSize}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default BusinessGoals;
