import React, { useEffect, useState } from "react";
import PaginationAntd from "../../../../_Shared/Components/Pagination/Pagination";
import export_file from "../../../../assets/images/svg/export_file.svg"
import icon_plus from "../../../../assets/images/svg/icon_plus.svg"
import icon_edit from "../../../../assets/images/svg/icon_edit.svg"
import icon_delete from "../../../../assets/images/svg/icon_delete.svg"
import icon_eye from "../../../../assets/images/svg/icon_eye.svg"
import icon_assign_student from "../../../../assets/images/svg/icon_assign_teacher.svg"
import ModalReuse from "../../../../_Shared/Components/Modal-reuse/Modal-reuse";
import { useForm } from 'react-hook-form';
import ActionMenu from "../../../../_Shared/Components/Action-menu/Action-menu";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";

const Student = () => {
  // dịch đa ngôn ngữ
  const { t, i18n } = useTranslation();
  //modal 
  const [modalIsOpen, setModalIsOpen] = useState(false); // mở dal
  const [isEditMode, setIsEditMode] = useState(false); // mở modal edit
  const [currentData, setCurrentData] = useState(null); // dữ liệu truyền vào edit
  const [isModalVisible, setIsModalVisible] = useState(false); // mở modal confirm xóa
  // Sử dụng react-hook-form
  const { register, handleSubmit, formState: { errors }, watch, trigger,reset } = useForm({mode: "onChange"});

    
  const openModal = (editMode = false, data = null) => {
    setIsEditMode(editMode);
    setModalIsOpen(true); 
    if (editMode && data) {
      setCurrentData(data);
      reset({
        schoolYear: data.schoolYear, // example data fields
        status: data.status,
        startDate: data.startDate,
        endDate: data.endDate
      });
    }else{
      reset();
    }
  };
    
  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentData(null);
    reset();
  };
  
  const onSubmit = (data) => {
    if (isEditMode) {
      // Xử lý cập nhật dữ liệu khi đang chỉnh sửa
      console.log("Dữ liệu chỉnh sửa:", data);
    } else {
        // Xử lý thêm mới
        console.log("Dữ liệu thêm mới:", data);
    }
    closeModal();
  };

  // Hàm click thao tác 
  const handleMenuClick = (key, data) => {
    if (key === "edit") {
      openModal(true, data); // Pass the data for editing
    } else if (key === "delete") {
      console.log("Deleting: ", data);
    }
  };

  const menuItems = [
    { key: 'detail', label: 'Xem chi tiết', icon: icon_eye},
    { key: 'edit', label: 'Sửa thông tin', icon: icon_edit},
    { key: 'assign_to_parent', label: 'Gán phụ huynh cho học sinh', icon: icon_assign_student },
  ];

  // Dữ liệu hiển thị 
  const studentsInformation = [
    {
        id: 1,
        studentName: 'Nguyễn Duy Kiên',
        studentCode: "GV01",
        studentClass: '6a1',
        email: 'kiennd@gmail.com',
        phone: '03680215485',
        gender: 1,
        schoolYear: "2024-2028",
        status: 1,
        parent: "Duy Khánh"
    },
    // Thêm nhiều dữ liệu hơn ở đây
  ];

  //open delete modal
  const showDeleteModal = () => {
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    // Xử lý xóa bản ghi ở đây
    console.log('Đã xóa bản ghi');
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      {/* <header className="h-[100px] w-full"></header> */}
      <div className="pt-6rem bg-white h-100vh px-4">
            <h1 className="fs-16">Danh sách học sinh</h1>
            <p className="mt-2">Task/subtitle/subtitle</p>

            <div className="d-flex justify-content-between align-items-end mt-2">
              <p>Số lượng học sinh: <span>100 học sinh</span></p>
                <div className="d-flex">
                    <input placeholder={t('search')} className={`bg-color-white-smoke px-3 py-2 border-radius-10px w-300px`}/>
                    <button className="btn bg-color-blue text-color-white mx-3 d-flex align-items-center">{t('exportFileExcel')} <img className="ps-2" src={export_file}/></button>
                    <button className="btn bg-color-green-bold text-color-white d-flex align-items-center" onClick={() => openModal(false)}>{t('create')} <img className="ps-2" src={icon_plus}/></button>
                </div>
            </div>

            <div className="table-responsive mt-4">
                <table className="min-w-full table table-bordered border-collapse border border-gray-300">
                    <thead className="bg-color-blue text-white">
                        <tr>
                            <th className="w-5 text-center">{t('STT')}</th>
                            <th><span className="ps-10">Thông tin học sinh</span></th>
                            <th className="text-center">Liên hệ</th>
                            <th className="text-center w-10">Giới tính</th>
                            <th className="text-center">Niên khóa</th>
                            <th className="w-15 text-center">{t('status')}</th>
                            <th className="w-10 text-center">Phụ huynh</th>
                            <th className="w-10 text-center">{t('action')}</th>
                        </tr>
                    </thead>
                    <tbody>
                      {studentsInformation.map((item, index) => (
                        <tr className="align-middle" key={item.id}>
                            <td className="text-center">{index + 1}</td>
                            <td>
                                <span className="fw-700">{item.studentName}</span><br />
                                <span className="fw-700">Mã: {item.studentCode}</span> <br/>
                                <span className="fw-700">Lớp: {item.studentClass}</span>
                            </td>
                            <td>
                              <span>{item.email}</span><br/>
                              <span>SĐT: {item.phone}</span>
                            </td>
                            <td className="text-center">{item.gender}</td>
                            <td className="text-center">{item.schoolYear}</td>
                            <td className="text-center">{item.status}</td>
                            <td className="text-center">{item.parent}</td>
                            <td className="text-center">
                                <ActionMenu
                                    items={menuItems}
                                    onMenuClick={(key) => handleMenuClick(key, item)}
                                    onDelete={showDeleteModal}
                                />
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-end">
                <PaginationAntd></PaginationAntd>
            </div>
      </div>

      {/* modal  */}
      <ModalReuse isOpen={modalIsOpen} onClose={closeModal} title={isEditMode ? "Chỉnh sửa niên khóa" : "Thêm niên khóa"} width="80%">
      <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {/* Tên niên khóa */}
            <div className="col-12 col-md-6 mb-3">
              <label>Tên niên khóa:</label>
              <input type="text" className={`form-control ${errors.schoolYear ? 'is-invalid' : ''}`} {...register("schoolYear", { required: "Tên niên khóa là bắt buộc" })} placeholder="Tên niên khóa..."/>
              {errors.schoolYear && <div className="invalid-feedback">{errors.schoolYear.message}</div>}
            </div>

            {/* Trạng thái */}
            <div className="col-12 col-md-6 mb-3">
              <label>Trạng thái:</label>
              <select className={`form-control ${errors.status ? 'is-invalid' : ''}`} {...register("status", { required: "Trạng thái là bắt buộc" })} >
                <option value="1">Chưa diễn ra</option>
                <option value="2">Đã diễn ra</option>
                <option value="3">Đã kết thúc</option>
              </select>
              {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
            </div>

            {/* Ngày bắt đầu */}
            <div className="col-12 col-md-6 mb-3">
              <label>Ngày bắt đầu:</label>
              <input type="date" className={`form-control ${errors.startDate ? 'is-invalid' : ''}`} {...register("startDate", { required: "Ngày bắt đầu là bắt buộc" })} />
              {errors.startDate && <div className="invalid-feedback">{errors.startDate.message}</div>}
            </div>

            {/* Ngày kết thúc */}
            <div className="col-12 col-md-6 mb-3">
              <label>Ngày kết thúc:</label>
              <input type="date" className={`form-control ${errors.endDate ? 'is-invalid' : ''}`} {...register("endDate", { required: "Ngày kết thúc là bắt buộc" })}/>
              {errors.endDate && <div className="invalid-feedback">{errors.endDate.message}</div>}
            </div>
          </div>

          <hr className="mt-20"/>
          <div className="text-center mt-3">
            <button onClick={closeModal} className="btn bg-color-white-smoke me-3 w-100px">Đóng</button>
            <button type="submit" className="btn btn-primary w-100px">Lưu</button>
          </div>
        </form>
      </ModalReuse>

      <Modal
        title={<div style={{ color: 'red', textAlign: 'center' }}>Xóa dữ liệu - niên khóa</div>} 
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Có"
        cancelText="Không"
        centered={true}
      >
        <hr className="mt-2 mb-3" />
        <p>Bạn có chắc chắn muốn xóa niên khóa <span className="fw-700">K10.3</span> không?</p>
      </Modal>
    </div>
  );
};

export default Student;
