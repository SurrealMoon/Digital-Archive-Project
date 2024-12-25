import React from 'react';

const CategoryDropdown = ({
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
          borderRadius: '4px',
          border: '1px solid #ccc',
          boxSizing: 'border-box',
          ...style,
        }}
        className={className}
      >
        <option value="" disabled>Seç</option>
        <optgroup label="Hak İhlali Arşiv Kategori">
          <option value="Media Monitoring">Medya Taraması</option>
          <option value="NGO Data">STK Verileri</option>
          <option value="Bar Association Committees">Baro Komisyonları</option>
          <option value="Public Institutions">Kamu Kurumları</option>
        </optgroup>
      </select>
    </div>
  );
};

export default CategoryDropdown;
