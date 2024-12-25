import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const MonthYearPicker = ({ value, onChange }) => {
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (onChange) {
      const formattedDate = date
        ? `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`
        : ""; // Eğer tarih seçilmezse boş string gönder
      onChange(formattedDate);
    }
  };

  return (
    <div style={{ maxWidth: "300px", margin: "left", textAlign: "start" }}>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MMMM yyyy"
        showMonthYearPicker
        showFullMonthYearPicker
        className="month-picker"
        placeholderText="Tarama Dönemi Seçiniz"
      />
      {selectedDate && (
        <div style={{ marginTop: "15px" }}>
          Seçilen Dönem: {selectedDate.toLocaleString('tr-TR', { month: 'long', year: 'numeric' })}
        </div>
      )}
    </div>
  );
};

export default MonthYearPicker;
