import React from 'react';

const Button = ({
  label,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-5 py-2 rounded  ${className}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
