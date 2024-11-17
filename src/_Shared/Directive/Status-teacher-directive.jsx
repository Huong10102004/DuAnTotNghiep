import React from 'react';
import { STATUS_ACTIVE_ENUM } from '../Enum/status-active.enum';

const StatusTeacherDirective = (status) => {
  let statusLabel;
  const getStatusColor = (status) => {
    switch (status) {
        case STATUS_ACTIVE_ENUM.ACTIVE:
            statusLabel = STATUS_ACTIVE_ENUM.ACTIVE_LABEL;
            return '#15B500';
        case STATUS_ACTIVE_ENUM.UN_ACTIVE:
            statusLabel = STATUS_ACTIVE_ENUM.UN_ACTIVE_LABEL;
            return '#FB1B3E';
        default:
            statusLabel = '';
            return '';
    }
  }
  return (
    <button style={{ backgroundColor: getStatusColor(status), padding: '2px 0', border: 'none', borderRadius: '10px', color: 'white' }} className='w-100'>
      {statusLabel}
    </button>
  );
};

export default StatusTeacherDirective;