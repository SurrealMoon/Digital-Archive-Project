import React from 'react';

const TextArea = ({ label, value, onChange, maxLength, placeholder, style }) => (
  <div style={{ marginBottom: '15px' }}>
    <label style={{ display: 'block', marginBottom: '5px' }}>
      {label}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      maxLength={maxLength}
      placeholder={placeholder}
      style={{
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '100%',
        boxSizing: 'border-box',
        fontSize: '14px',
        lineHeight: '1.5',
        ...style, // Merge any custom styles provided via props
      }}
    />
    {maxLength && (
      <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
        {value.length}/{maxLength} karakter
      </p>
    )}
  </div>
);

export default TextArea;
