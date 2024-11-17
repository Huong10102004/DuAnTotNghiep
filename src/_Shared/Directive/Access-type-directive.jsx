import React from 'react';
import { ACCESS_TYPE_ENUM } from '../Enum/access-type.enum';

const AccessTypeDirective = (status) => {
  let text;
  switch (status) {
    case ACCESS_TYPE_ENUM.MANAGER:
      text = ACCESS_TYPE_ENUM.MANAGER_LABEL;
      break;
    case ACCESS_TYPE_ENUM.TEACHER:
      text = ACCESS_TYPE_ENUM.TEACHER_LABEL;
      break;
    case ACCESS_TYPE_ENUM.GUARDIAN:
      text = ACCESS_TYPE_ENUM.GUARDIAN_LABEl;
      break;
    default:
      text = '';
  }

  return <span>{text}</span>;
};

export default AccessTypeDirective;