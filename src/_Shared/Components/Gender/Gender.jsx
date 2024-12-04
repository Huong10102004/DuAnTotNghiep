import React from 'react';
import { GENDER_ENUM } from '../../Enum/gender.enum';

const genderDirective = ({ gender }) => {
  let genderLabel = "";
  const getGenderColor = (gender) => {
    const genderNumber = parseInt(gender, 10); 
    // console.log("Gender received:", genderNumber, typeof genderNumber); 

    switch (genderNumber) {
      case GENDER_ENUM.NAM:
        genderLabel = GENDER_ENUM.NAM_LABEL;
        return '#235DF4'; 
      case GENDER_ENUM.WOMAN:
        genderLabel = GENDER_ENUM.WOMAN_LABEL;
        return '#F42355'; 
      default:
        genderLabel = GENDER_ENUM.NAM_LABEL; 
        return '#235DF4';
    }
  };

  return (
    <button
      style={{
        backgroundColor: getGenderColor(gender),
        padding: '2px 0',
        border: 'none',
        borderRadius: '10px',
        color: 'white',
      }}
      className='w-100'>
      {genderLabel}
    </button>
  );
};

export default genderDirective;