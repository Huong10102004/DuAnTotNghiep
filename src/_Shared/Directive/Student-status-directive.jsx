import React from 'react';
import { STATUS_STUDENT_STUDY_ENUM } from '../Enum/status-student-study.enum';

const studentStatusDirective = ({ status }) => {
  // Định nghĩa màu sắc theo status
  let statusLabel = "";
  const getStatusColor = (status) => {
    switch (status) {
      case STATUS_STUDENT_STUDY_ENUM.LEAVE_SCHOOL:
        statusLabel = STATUS_STUDENT_STUDY_ENUM.LEAVE_SCHOOL_LABEL
        return '#989797';
      case STATUS_STUDENT_STUDY_ENUM.STUDYING:
        statusLabel = STATUS_STUDENT_STUDY_ENUM.STUDYING_LABEL
        return '#15B500';
      case STATUS_STUDENT_STUDY_ENUM.NONE_CLASS:
        statusLabel = STATUS_STUDENT_STUDY_ENUM.NONE_CLASS_LABEL
        return '#FF4A4A';
      default:
        statusLabel = STATUS_STUDENT_STUDY_ENUM.NONE_CLASS_LABEL
        return '#FF4A4A';
    }
  };

  return (
    <button style={{ backgroundColor: getStatusColor(status), padding: '2px 0', border: 'none', borderRadius: '10px', color: 'white' }} className='w-100'>
      {statusLabel}
    </button>
  );
};

export default studentStatusDirective;