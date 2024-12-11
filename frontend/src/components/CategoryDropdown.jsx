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
        <optgroup label="Hak İhlali Türü">
          <option value="Aile ve Özel Yaşam Hakkı">Aile ve Özel Yaşam Hakkı</option>
          <option value="Ayrımcılık">Ayrımcılık</option>
          <option value="Basın Özgürlüğü">Basın Özgürlüğü</option>
          <option value="Kadına Karşı Şiddet ve Taciz">Kadına Karşı Şiddet ve Taciz</option>
          <option value="Çocuğa Karşı Şiddet ve Taciz">Çocuğa Karşı Şiddet ve Taciz</option>
          <option value="Örgütlenme Özgürlüğü">Örgütlenme Özgürlüğü</option>
          <option value="İşkence ve Kötü Muamele">İşkence ve Kötü Muamele</option>
          <option value="Eğitim Hakkı">Eğitim Hakkı</option>
          <option value="Düşünce ve İfade Özgürlüğü">Düşünce ve İfade Özgürlüğü</option>
        </optgroup>
      </select>
    </div>
  );
};

export default CategoryDropdown;
