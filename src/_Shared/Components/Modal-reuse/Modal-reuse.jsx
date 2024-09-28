import React from 'react';
import Modal from 'react-modal';
import { motion } from 'framer-motion';

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
          width: width || 'auto',
          border: 'none', // Loại bỏ viền modal
          background: 'none', // Bỏ nền để sử dụng motion container
        },
        overlay: {
            backgroundColor:  'rgba(0, 0, 0, 0.75)', // Mặc định là màu đen mờ
          },
      }}
    >
       {/* Motion wrapper để tạo animation */}
        {/* Motion wrapper để tạo animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }} // Thời gian animation
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
        }}
      >
        <h2 className='text-center fs-20'>{title}</h2>
        <hr className='my-3'/>
        <div>{children}</div>
      </motion.div>
    </Modal>
  );
};

export default ModalReuse;
