import React from 'react';

const Button = ({ children, onClick, type = 'button', loading = false, className = '' }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={loading}
    className={`btn-primary flex items-center justify-center gap-2 ${className}`}
  >
    {loading ? (
      <>
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        <span>Processing...</span>
      </>
    ) : (
      children
    )}
  </button>
);

export default Button;
