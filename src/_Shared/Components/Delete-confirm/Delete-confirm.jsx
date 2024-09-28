import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const DeleteConfirm = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        // Xử lý xóa bản ghi ở đây
        console.log('Đã xóa bản ghi');
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button type="danger" onClick={showModal}>
                Xóa
            </Button>
            <Modal
                title="Xác nhận xóa"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Có"
                cancelText="Không"
                centered
                transitionName="fade" // Thêm hiệu ứng fade
                maskTransitionName="fade" // Thêm hiệu ứng fade cho background
            >
                <p>Bạn có chắc chắn muốn xóa bản ghi này không?</p>
            </Modal>
        </>
    );
};

export default DeleteConfirm;