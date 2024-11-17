import { Pagination } from 'antd';
import React, { useState } from 'react';
const PaginationAntd = ({onPageChange,total}) => {
  const [current, setCurrent] = useState(1);
  const onChange = (page) => {
    // console.log(page);
    setCurrent(page);
    if(onPageChange){
      onPageChange(page);
    }
  };
  return <Pagination current={current} onChange={onChange} total={total} />;
};
export default PaginationAntd;