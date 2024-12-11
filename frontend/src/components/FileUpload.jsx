import React from "react";

const FileUpload = ({ label, onChange, style }) => (
  <div style={{ marginBottom: "15px", ...style }}>
    {label && (
      <label style={{ marginBottom: "8px", display: "block" }}>{label}</label>
    )}
    <input
      type="file"
      onChange={(e) => onChange(e.target.files)}
      style={{
        display: "block",
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "8px",
      }}
    />
  </div>
);

export default FileUpload;
