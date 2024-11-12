import React from 'react';
import { STATUS_SCHOOL_YEAR_ENUM } from '../Enum/status-school-year.enum';

const StatusYearSchoolDirective = ({ status }) => {
  let text;
  switch (status) {
    case STATUS_SCHOOL_YEAR_ENUM.NOT_STARTED_YET:
      text = STATUS_SCHOOL_YEAR_ENUM.NOT_STARTED_YET_LABEL;
      break;
    case STATUS_SCHOOL_YEAR_ENUM.ONGOING:
      text = STATUS_SCHOOL_YEAR_ENUM.ONGOING_LABEL;
      break;
    case STATUS_SCHOOL_YEAR_ENUM.FINISHED:
      text = STATUS_SCHOOL_YEAR_ENUM.FINISHED_LABEl;
      break;
    default:
      text = 'No data';
  }

  return <div>{text}</div>;
};

export default StatusYearSchoolDirective;