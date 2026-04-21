import React from 'react';
import Input from '../Common/Input';
import Select from '../Common/Select';

const BusinessInfo = ({ data, setData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-bold text-slate-800">Business Information</h2>
        <p className="text-sm text-slate-500">Tell us about your company and industry.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Business Name"
          name="businessName"
          placeholder="e.g. Acme Corp"
          value={data.businessName}
          onChange={handleChange}
          error={errors.businessName}
          required
        />
        
        <div className="space-y-1">
          <label className="label-text">Industry</label>
          <select
            name="industry"
            value={data.industry}
            onChange={handleChange}
            className={`input-field ${errors.industry ? 'border-red-500' : ''}`}
          >
            <option value="">Select Industry</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Technology">Technology</option>
            <option value="Technology">Food</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
          {errors.industry && <p className="text-xs text-red-500 mt-1">{errors.industry}</p>}
        </div>

        <div className="space-y-1">
          <label className="label-text">Business Type</label>
          <select
            name="businessType"
            value={data.businessType}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Select Business Type</option>
            <option value="B2B Services">B2B Services</option>
            <option value="B2B Product/SaaS">B2B Product/SaaS</option>
            <option value="B2C Services">B2C Services</option>
            <option value="B2C E-commerce">B2C E-commerce</option>
            <option value="D2C Brand">D2C Brand</option>
            <option value="Local Business">Local Business</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <Input
          label="Target Location"
          name="targetLocation"
          placeholder="e.g. USA, Worldwide"
          value={data.targetLocation}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default BusinessInfo;
