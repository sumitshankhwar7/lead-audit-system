import React from 'react';

const Input = ({ label, error, ...props }) => (
  <div className="space-y-1">
    {label && <label className="label-text">{label}</label>}
    <input
      className={`input-field ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
      {...props}
    />
    {error && <p className="text-xs text-red-500 mt-1 animate-fade-in">{error}</p>}
  </div>
);

export default Input;
