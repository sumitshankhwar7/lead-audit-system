import React from 'react';

const Radio = ({ label, ...props }) => (
  <div className="form-group-radio">
    <input type="radio" {...props} />
    {label && <label>{label}</label>}
  </div>
);

export default Radio;
