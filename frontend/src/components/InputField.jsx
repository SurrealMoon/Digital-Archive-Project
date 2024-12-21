import React from "react";
import PropTypes from "prop-types";

function InputField({
  label,
  value = "", // Varsayılan değer olarak boş string
  onChange = () => {}, // Varsayılan olarak boş bir fonksiyon
  maxLength,
  placeholder,
  type = "text",
  style,
  className,
  list = null,
}) {
  return (
    <div style={{ marginBottom: "15px", ...style }} className={className}>
      {/* Label varsa göster */}
      {label && (
        <label style={{ marginBottom: "8px", display: "block" }}>{label}</label>
      )}

      {/* Input alanı */}
      <input
        type={type}
        value={value} // Artık defaultProps yerine function param. defaultlarını kullanıyoruz
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        placeholder={placeholder}
        list={list}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          boxSizing: "border-box",
          ...style,
        }}
        className={className}
      />
    </div>
  );
}

InputField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func, // Artık isRequired yerine varsayılan veriyoruz
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  list: PropTypes.string,
};

export default InputField;
