import React from 'react';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';

// Đặt cấu hình mặc định cho modal (tuỳ chọn)
Modal.setAppElement('#root');

const ModalReuse = ({ isOpen, onClose, title, children, width,footerModal }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={title}
      onCancel={onClose}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: width || 'auto',
          maxHeight: '90vh',
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
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '80vh',
        }}
      >
         {/* Icon đóng ở góc trên bên phải */}
         <div style={{ flexShrink: 0 }}>
            {/* Header của modal */}
            <button onClick={onClose} 
              style={{
                position: 'absolute', // Đặt vị trí tuyệt đối
                top: '10px',
                right: '10px',
                background: 'transparent', // Nền trong suốt
                border: 'none', // Không viền
                cursor: 'pointer', // Hiển thị con trỏ khi di chuột
              }}
              >
              <AiOutlineClose size={24} color="red" /> {/* Thay đổi kích thước và màu sắc của icon */}
            </button>
            <h2 className='text-center fs-20'>{title}</h2>
          </div>
          <hr className='my-3'/>
         
          <div
              style={{
                overflowY: 'auto', // Cuộn nội dung giữa
                overflowX: 'hidden', 
                flexGrow: 1, // Chiếm toàn bộ không gian giữa để cuộn
                padding: '10px',
                boxSizing: 'border-box',
              }}
              >
              {/* Nội dung của modal */}
              {children}
          </div>

          <div style={{ 
            flexShrink: 0,
            borderTop: '1px solid #ddd', // Đường kẻ phân cách footer
            padding: '10px',
            position: 'sticky', // Đảm bảo footer cố định ở phía dưới
            bottom: 0,
            backgroundColor: 'white',
           }}>
            {/* Footer của modal */}
            {footerModal}
          </div>
      </motion.div>
    </Modal>
  );
};

export default ModalReuse;
