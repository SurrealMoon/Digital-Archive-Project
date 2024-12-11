import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const MonthYearPicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div style={{ maxWidth: "300px", margin:"left", textAlign:"start" }}>
      <h3>Tarama Dönemi Seç</h3>
      
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="MMMM yyyy" 
        showMonthYearPicker 
        showFullMonthYearPicker
        className="month-picker"
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
