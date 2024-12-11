import React from 'react';

const Dropdown = ({
  label,
  options,
  selected,
  onChange,
  style,
  className,
}) => {
  return (
    <div style={{ marginBottom: '15px', ...style }} className={className}>
      {label && <label style={{ marginBottom: '8px', display: 'block' }}>{label}</label>}
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '15px',
          border: '1px solid #ccc',
          boxSizing: 'border-box',
          ...style,
        }}
        className={className}
      >
        <option value="" disabled>Seç</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
