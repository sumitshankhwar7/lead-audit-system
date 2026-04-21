import React from 'react';

const Checkbox = ({ label, ...props }) => (
  <div className="form-group-checkbox">
    <input type="checkbox" {...props} />
    {label && <label>{label}</label>}
  </div>
);

export default Checkbox;
