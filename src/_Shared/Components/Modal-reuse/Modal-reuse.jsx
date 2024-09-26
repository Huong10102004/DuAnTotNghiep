import React from 'react';
import Modal from 'react-modal';

// Đặt cấu hình mặc định cho modal (tuỳ chọn)
Modal.setAppElement('#root');

const ModalReuse = ({ isOpen, onClose, title, children, width=null }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={title}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: width || '1500px',
        },
        overlay: {
            backgroundColor:  'rgba(0, 0, 0, 0.75)', // Mặc định là màu đen mờ
          },
      }}
    >
      <h2>{title}</h2>
      <div>{children}</div>
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

export default ModalReuse;
