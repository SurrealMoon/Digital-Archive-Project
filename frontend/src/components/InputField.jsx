import React from "react";
import PropTypes from "prop-types";

const InputField = ({
  label,
  value,
  onChange,
  maxLength,
  placeholder,
  type = "text",
  style,
  className,
  list = null,
}) => {
  return (
    <div style={{ marginBottom: "15px", ...style }} className={className}>
      {/* Label varsa göster */}
      {label && (
        <label style={{ marginBottom: "8px", display: "block" }}>{label}</label>
      )}
      {/* Input alanı */}
      <input
        type={type}
        value={value || ""} // Null safety için default değer
        onChange={(e) => onChange(e.target.value)} // Her zaman value döner
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
};

InputField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  list: PropTypes.string,
};

export default InputField;
