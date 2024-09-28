import React from 'react';
import { Dropdown, Button } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

const ActionMenu = ({ items, onMenuClick, onDelete=null }) => {
  const menuItems = items.map((item) => ({
    key: item.key,
    label: (
      <span className='d-flex align-items-center py-1 ps-3 pe-4 border w-100'
        onClick={() => item.key==="delete" ? onDelete(item.key) : onMenuClick(item.key)} // Gọi hàm onMenuClick với key khi click vào mục
        style={{ cursor: 'pointer' }}
      >
        <img src={item.icon} className='w-20px h-18px me-2' /> <b>{item.label}</b>
      </span>
    ),
  }));

  return (
    <Dropdown menu={{ items: menuItems }} trigger={['click']}>
      <Button type="text" icon={<EllipsisOutlined />} />
    </Dropdown>
  );
};

export default ActionMenu;