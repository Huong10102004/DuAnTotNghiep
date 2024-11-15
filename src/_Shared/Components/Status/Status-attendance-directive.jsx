import React from 'react';
import { STATUS_CLASS_ATTENDANCE_ENUM } from '../../Enum/status-class-attendance';

const statusAttendanceDirective = ({ status }) => {
  // Định nghĩa màu sắc theo status
  console.log(status)
  let statusLabel = "";
  const getStatusColor = (status) => {
    switch (status) {
      case STATUS_CLASS_ATTENDANCE_ENUM.HAS_CHECKED:
        statusLabel = STATUS_CLASS_ATTENDANCE_ENUM.HAS_CHECKED_LABEL
        return '#00CB58';
      case STATUS_CLASS_ATTENDANCE_ENUM.NOT_YET_CHECKED:
        statusLabel = STATUS_CLASS_ATTENDANCE_ENUM.NOT_YET_CHECKED_LABEL
        return '#FF0000';
      default:
        statusLabel = STATUS_CLASS_ATTENDANCE_ENUM.NOT_YET_CHECKED_LABEL
        return '#FF0000';
    }
  };

  return (
    <button style={{ backgroundColor: getStatusColor(status), padding: '2px 0', border: 'none', borderRadius: '10px', color: 'white' }} className='w-100'>
      {statusLabel}
    </button>
  );
};

export default statusAttendanceDirective;