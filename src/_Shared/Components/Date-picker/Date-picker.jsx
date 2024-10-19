import React from 'react';
import { DatePicker, Space } from 'antd';
import moment from 'moment';

const DatePickerComponent = ({ onDateChange, placeholder }) => {
    const onChange = (date) => {
      if (onDateChange && date) {
        // Định dạng thành YYYY-MM-DD HH:mm:ss từ đối tượng date (moment)
        const formattedDate = date.format('YYYY-MM-DD HH:mm:ss');
        onDateChange(formattedDate); // Truyền chuỗi đã định dạng qua callback
    }
   };
 
   return (
     <Space direction="vertical">
       <DatePicker
         format="YYYY-MM-DD HH:mm:ss" // Sử dụng format đơn giản
         onChange={onChange}
         className='form-control'
         placeholder={placeholder}
         showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }} // Cho phép chọn cả giờ, phút, giây
       />
     </Space>
   );
};
export default DatePickerComponent;