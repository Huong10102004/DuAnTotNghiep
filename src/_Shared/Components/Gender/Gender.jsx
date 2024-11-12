import React from 'react';
import { GENDER_ENUM } from '../../Enum/gender.enum';

const genderDirective = ({ status }) => {
  // Định nghĩa màu sắc theo status
  let statusLabel = "";
  const getStatusColor = (status) => {
    console.log(status);
    switch (status) {
      case GENDER_ENUM.NAM:
        statusLabel = GENDER_ENUM.NAM_LABEL
        return '#235DF4';
      case GENDER_ENUM.WOMAN:
        statusLabel = GENDER_ENUM.WOMAN_LABEL
        return '#F42355';
      default:
        statusLabel = GENDER_ENUM.NAM_LABEL
        return '#235DF4';
    }
  };

  return (
    <button style={{ backgroundColor: getStatusColor(status), padding: '2px 0', border: 'none', borderRadius: '10px', color: 'white' }} className='w-100'>
      {statusLabel}
    </button>
  );
};

export default genderDirective;