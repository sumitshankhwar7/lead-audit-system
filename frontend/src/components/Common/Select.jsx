import React from 'react';

const Select = ({ label, options, ...props }) => (
  <div className="form-group">
    {label && <label>{label}</label>}
    <select {...props}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default Select;
