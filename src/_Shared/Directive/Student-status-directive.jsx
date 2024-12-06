import React from 'react';
import { STATUS_STUDENT_STUDY_ENUM } from '../Enum/status-student-study.enum';

const studentStatusDirective = ({ status }) => {
  let statusLabel = '';
  let statusColor = '';

  const numericStatus = Number(status);

  switch (numericStatus) {
    case STATUS_STUDENT_STUDY_ENUM.LEAVE_SCHOOL:
      statusLabel = STATUS_STUDENT_STUDY_ENUM.LEAVE_SCHOOL_LABEL;
      statusColor = '#989797'; // Màu xám
      break;

    case STATUS_STUDENT_STUDY_ENUM.STUDYING:
      statusLabel = STATUS_STUDENT_STUDY_ENUM.STUDYING_LABEL;
      statusColor = '#15B500'; 
      break;

    case STATUS_STUDENT_STUDY_ENUM.NONE_CLASS:
      statusLabel = STATUS_STUDENT_STUDY_ENUM.NONE_CLASS_LABEL;
      statusColor = '#FF4A4A'; 
      break;

    default:
      statusLabel = STATUS_STUDENT_STUDY_ENUM.NONE_CLASS_LABEL;
      statusColor = '#FF4A4A'; 
      break;

  }

  return (
    <button
      style={{
        backgroundColor: statusColor,
        padding: '2px 0',
        border: 'none',
        borderRadius: '10px',
        color: 'white',
      }}
      className="w-100"
    >
      {statusLabel}
    </button>
  );
};

export default studentStatusDirective;
