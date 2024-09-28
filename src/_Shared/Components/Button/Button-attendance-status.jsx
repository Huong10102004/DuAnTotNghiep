import React from 'react';
import { STATUS_STUDEN_ENUM } from '../../Enum/status-student.enum';

const ButtonAttendanceStatus = ({ status }) => {
  // Định nghĩa màu sắc theo status
  let statusLabel = "";
  const getStatusColor = (status) => {
    switch (status) {
      case STATUS_STUDEN_ENUM.PRESENT:
        statusLabel = STATUS_STUDEN_ENUM.PRESENT_LABEL
        return '#15B500';
      case STATUS_STUDEN_ENUM.UN_PRESENT:
        statusLabel = STATUS_STUDEN_ENUM.UN_PRESENT_LABEL
        return '#FF0000';
      case STATUS_STUDEN_ENUM.UN_PRESENT_PER:
        statusLabel = STATUS_STUDEN_ENUM.UN_PRESENT_PER_LABEl
        return '#FF9800';
      case STATUS_STUDEN_ENUM.LATE:
          statusLabel = STATUS_STUDEN_ENUM.LATE_LABEL
          return '#FFC700';
      default:
        statusLabel = STATUS_STUDEN_ENUM.PRESENT_LABEL
        return '#15B500';
    }
  };

  return (
    <button style={{ backgroundColor: getStatusColor(status), padding: '2px 0', border: 'none', borderRadius: '10px', color: 'white' }} className='w-100'>
      {statusLabel}
    </button>
  );
};

export default ButtonAttendanceStatus;