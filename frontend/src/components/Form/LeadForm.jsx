import React, { useState } from 'react';
import Button from '../Common/Button';
import { validateEmail } from '../../utils/validators';

const LeadForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.businessName) newErrors.businessName = 'Business name is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500 bg-red-50' : 'border-slate-200'} focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none`}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.name}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-700 ml-1">Email ID</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500 bg-red-50' : 'border-slate-200'} focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none`}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.email}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-700 ml-1">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+91 98765 43210"
          className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-slate-200'} focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none`}
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.phone}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-700 ml-1">Business Name</label>
        <input
          type="text"
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
          placeholder="Your Company Pvt Ltd"
          className={`w-full px-4 py-3 rounded-xl border ${errors.businessName ? 'border-red-500 bg-red-50' : 'border-slate-200'} focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none`}
        />
        {errors.businessName && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.businessName}</p>}
      </div>

      <Button
        type="submit"
        loading={loading}
        className="w-full py-4 text-lg font-bold mt-4"
      >
        Continue to Audit
      </Button>
    </form>
  );
};

export default LeadForm;
