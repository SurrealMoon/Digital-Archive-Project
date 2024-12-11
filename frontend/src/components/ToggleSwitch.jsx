import React from 'react';
import Switch from 'react-switch';
import { TbArrowsDownUp } from "react-icons/tb";

const ToggleSwitch = ({
  label,
  checked,
  onChange,
  showIcon = true,
  showLabel = true,
  showActivateText = true,  // Default value to true to show the text by default
}) => {

  const handleChange = (checked) => {
    onChange(checked);
  };

  return (
    <div className="flex items-center">
      {showIcon && (
        <TbArrowsDownUp
          size={24} // Icon size
          className="text-[#091e42] mr-2" // Icon color and margin
        />
      )}
      {showLabel && <span className="text-[#091e42] font-normal text-base mr-2">{label}</span>}
      <Switch
        onChange={handleChange}
        checked={checked}
        onColor="#3182ce"
        offColor="#d6d6d6"
        offHandleColor="#fff"
        handleDiameter={22} // Adjusted to match the design settings
        uncheckedIcon={false}
        checkedIcon={false}
        height={24} // Adjusted height
        width={60} // Adjusted width
        className="mx-2"
      />
      {showActivateText && ( // Conditional rendering based on the new prop
        <span className="text-[#091e42] font-normal text-base ml-2">Fragmanda Göster</span>
      )}
    </div>
  );
};

export default ToggleSwitch;
