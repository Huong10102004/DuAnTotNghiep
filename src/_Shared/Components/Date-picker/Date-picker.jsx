import React from 'react';
import { DatePicker, Space } from 'antd';

const DatePickerComponent = ({ onDateChange, placeholder }) => {
   const onChange = (date, dateString) => {
    if(onDateChange){
        onDateChange(Date.parse(dateString)/1000);
    }
   };
 
   return (
     <Space direction="vertical">
       <DatePicker
         format="YYYY-MM-DD" // Sử dụng format đơn giản
         onChange={onChange}
         className='form-control'
         placeholder={placeholder}
       />
     </Space>
   );
};
export default DatePickerComponent;