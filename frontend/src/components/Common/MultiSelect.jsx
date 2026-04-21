import React from 'react';

const MultiSelect = ({ label, options, ...props }) => (
  <div className="form-group">
    {label && <label>{label}</label>}
    <select multiple {...props}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default MultiSelect;
