import React, { useEffect, useState } from "react";
import export_file from "../../../../assets/images/svg/export_file.svg"
import icon_plus from "../../../../assets/images/svg/icon_plus.svg"
import icon_edit from "../../../../assets/images/svg/icon_edit.svg"
import icon_delete from "../../../../assets/images/svg/icon_delete.svg"
import icon_assign_teacher from "../../../../assets/images/svg/icon_assign_teacher.svg"
import ModalReuse from "../../../../_Shared/Components/Modal-reuse/Modal-reuse";
import { useForm } from 'react-hook-form';
import ActionMenu from "../../../../_Shared/Components/Action-menu/Action-menu";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import PaginationAntd from "../../../../_Shared/Components/Pagination/Pagination";
import { useNavigate } from 'react-router-dom';

const ClassStaff = () => {
  const { t, i18n } = useTranslation(); // dịch đa ngôn ngữ
  const navigate = useNavigate(); // Hook để điều hướng
  //modal 
  const [modalIsOpen, setModalIsOpen] = useState(false); // mở dal
  const [isEditMode, setIsEditMode] = useState(false); // mở modal edit
  const [currentData, setCurrentData] = useState(null); // dữ liệu truyền vào edit
  const [isModalVisible, setIsModalVisible] = useState(false); // mở modal confirm xóa
  // 
  const [modalAssignTeacherOpen, setModalAssignTeacherOpen] = useState(false); // mở modal gán giáo viên chủ nhiệm
  // Sử dụng react-hook-form
  const { register, handleSubmit, formState: { errors }, watch, trigger,reset } = useForm({mode: "onChange"});

    
  const openModal = (editMode = false, data = null) => {
    setIsEditMode(editMode);
    setModalIsOpen(true); 
    if (editMode && data) {
      console.log(data);
      setCurrentData(data);
      reset({
        className: data.className,
        status: data.status,
        teacherName: data.teacherName,
        teacherEmail: data.teacherEmail,
        schoolYearName: data.schoolYearName,
        schoolYearCode: data.schoolYearCode,
        grade: data.grade,
      });
    }else{
      reset();
    }
  };

  const openModalAssignTeacher = (editMode = false, data = null) => {
    setModalAssignTeacherOpen(true); 
  };
    
  const closeModal = () => {
    setModalIsOpen(false); //set modal mở thêm, sửa về false
    setModalAssignTeacherOpen(false);  // set modal gán giáo viên chủ nhiệm về false
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
    } else if( key === "assign_teacher"){
      openModalAssignTeacher(true, data);
    } else if( key === "assign_student"){
      navigate('/staff/class/assign_student/123456')
    }
  };

  const menuItems = [
    { key: 'edit', label: 'Chỉnh sửa', icon: icon_edit},
    { key: 'delete', label: 'Xóa', icon: icon_delete },
    { key: 'assign_teacher', label: 'Gán giáo viên', icon: icon_assign_teacher },
    { key: 'assign_student', label: 'Gán học sinh vào lớp', icon: icon_assign_teacher },
  ];

  // Dữ liệu hiển thị 
  const listClassData= [
    {
        id: 1,
        className: '6A',
        status: 2,
        teacherName: 'Nguyễn Duy kiên',
        teacherEmail: 'kiennd@gmail.com',
        schoolYearName: 'Khóa 18.3',
        schoolYearCode: 'K18.3',
        grade: 10,
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

  //footer modal
  const footerModal = () => {
    return <div className="text-center mt-3">
            <button onClick={closeModal} className="btn bg-color-white-smoke me-3 w-100px">Đóng</button>
            <button type="submit" className="btn btn-primary w-100px">Lưu</button>
          </div>
  }
  return (
    <div>
      {/* <header className="h-[100px] w-full"></header> */}
      <div className="pt-6rem bg-white h-100vh px-4">
            <h1 className="fs-16">Danh sách lớp học</h1>
            <p className="mt-2">Task/subtitle/subtitle</p>

            <div className="d-flex justify-content-between align-items-end mt-2">
              <p>Số lớp học: <span className="fw-700">32 lớp</span></p>
                <div className="d-flex">
                    <input placeholder={t('search')} className={`bg-color-white-smoke px-3 py-2 border-radius-10px w-300px`}/>
                    <button className="btn bg-color-green-bold text-color-white d-flex align-items-center" onClick={() => openModal(false)}>{t('create')} <img className="ps-2" src={icon_plus}/></button>
                </div>
            </div>

            <div className="table-responsive mt-4">
                <table className="min-w-full table table-bordered border-collapse border border-gray-300">
                    <thead className="bg-color-blue text-white">
                        <tr>
                            <th className="w-5 text-center">{t('STT')}</th>
                            <th><span className="ps-10">Thông tin lớp học</span></th>
                            <th className="text-center">Trạng thái</th>
                            <th className="text-center">Chủ nhiệm</th>
                            <th className="text-center">Niên khóa</th>
                            <th className="w-15 text-center">Khối học</th>
                            <th className="w-10 text-center">{t('action')}</th>
                        </tr>
                    </thead>
                    <tbody>
                      {listClassData.map((item, index) => (
                        <tr className="align-middle" key={item.id}>
                            <td className="text-center">{index + 1}</td>
                            <td>
                                <span className="fw-700">Lớp: {item.className}</span><br />
                            </td>
                            <td className="text-center">{item.status}</td>
                            <td className="text-center">
                              <span>{item.teacherName}</span> <br />
                              <span>{item.teacherEmail}</span>
                            </td>
                            <td className="text-center">
                              <span>{item.schoolYearName}</span> <br />
                              <span>Mã: {item.schoolYearCode}</span>
                            </td>
                            <td className="text-center">{item.grade}</td>
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
      <ModalReuse isOpen={modalIsOpen} onClose={closeModal} title={isEditMode ? "Chỉnh sửa lớp học" : "Thêm lớp học"} width="80%">
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
      {/* Tên lớp học */}
      <div className="col-12 col-md-6 mb-3">
        <label>Tên lớp học:</label>
        <input
          type="text"
          className={`form-control ${errors.className ? 'is-invalid' : ''}`}
          {...register("className", { required: "Tên lớp học bắt buộc" })}
          placeholder="Tên lớp học..."
        />
        {errors.className && <div className="invalid-feedback">{errors.className.message}</div>}
      </div>

      {/* Niên khóa */}
      <div className="col-12 col-md-6 mb-3">
        <label>Niên khóa:</label>
        <select
          className={`form-control ${errors.schoolYear ? 'is-invalid' : ''}`}
          {...register("schoolYear", { required: "Niên khóa là bắt buộc" })}
        >
          <option value="">Chọn niên khóa</option>
          <option value="2020-2021">2020-2021</option>
          <option value="2021-2022">2021-2022</option>
          <option value="2022-2023">2022-2023</option>
          <option value="2023-2024">2023-2024</option>
        </select>
        {errors.schoolYear && <div className="invalid-feedback">{errors.schoolYear.message}</div>}
      </div>

      {/* Chủ nhiệm */}
      <div className="col-12 col-md-6 mb-3">
        <label>Chủ nhiệm:</label>
        <select
          className={`form-control ${errors.teacher ? 'is-invalid' : ''}`}
          {...register("teacher", { required: "Chủ nhiệm là bắt buộc" })}
        >
          <option value="">Chọn chủ nhiệm</option>
          <option value="teacher1">Nguyễn Văn A</option>
          <option value="teacher2">Trần Thị B</option>
          <option value="teacher3">Lê Văn C</option>
        </select>
        {errors.teacher && <div className="invalid-feedback">{errors.teacher.message}</div>}
      </div>

      {/* Khối học */}
      <div className="col-12 col-md-6 mb-3">
        <label>Khối học:</label>
        <select
          className={`form-control ${errors.grade ? 'is-invalid' : ''}`}
          {...register("grade", { required: "Khối học là bắt buộc" })}
        >
          <option value="">Chọn khối học</option>
          <option value="10">Khối 10</option>
          <option value="11">Khối 11</option>
          <option value="12">Khối 12</option>
        </select>
        {errors.grade && <div className="invalid-feedback">{errors.grade.message}</div>}
      </div>

      {/* Năm học */}
      <div className="col-12 col-md-6 mb-3">
        <label>Năm học:</label>
        <select
          className={`form-control ${errors.academicYear ? 'is-invalid' : ''}`}
          {...register("academicYear", { required: "Năm học là bắt buộc" })}
        >
          <option value="">Chọn năm học</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
        {errors.academicYear && <div className="invalid-feedback">{errors.academicYear.message}</div>}
      </div>

      {/* Trạng thái */}
      <div className="col-12 col-md-6 mb-3">
        <label>Trạng thái:</label>
        <select
          className={`form-control ${errors.status ? 'is-invalid' : ''}`}
          {...register("status", { required: "Trạng thái là bắt buộc" })}
        >
          <option value="">Chọn trạng thái</option>
          <option value="1">Chưa diễn ra</option>
          <option value="2">Đang diễn ra</option>
          <option value="3">Đã kết thúc</option>
        </select>
        {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
      </div>
    </div>

          <div className="text-center mt-3">
            <button onClick={closeModal} className="btn bg-color-white-smoke me-3 w-100px">Đóng</button>
            <button type="submit" className="btn btn-primary w-100px">Lưu</button>
          </div>
        </form>
      </ModalReuse>

      <ModalReuse isOpen={modalAssignTeacherOpen} onClose={closeModal} title={"Gán giáo viên chủ nhiệm vào lớp 6a1"} width="80%" footerModal={footerModal()}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="fs-16">Danh sách lớp học</h1>

          <div className="d-flex justify-content-between align-items-end mt-2">
            <p>Số lượng: <span className="fw-700">32 giáo viên</span></p>
            <input placeholder={t('search')} className={`bg-color-white-smoke px-3 py-2 border-radius-10px w-400px`}/>
          </div>
          <table className="w-100 mt-5">
            <thead>
              <tr className="border-bottom">
                <th className="pb-3">#</th>
                <th className="pb-3">STT</th>
                <th className="pb-3">Họ tên giáo viên</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Giới tính</th>
                <th className="pb-3">Ngày sinh</th>
                <th className="pb-3">SĐT</th>
                <th className="pb-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-bottom align-middle">
                  <td className="py-3">
                    <input type="radio" />
                  </td>
                  <td className="py-3">01</td>
                  <td className="py-3">
                    <span>Nguyễn Duy Kiên</span> <br />
                    <span>ID: 0001</span>
                  </td>
                  <td className="py-3">
                    kiennd@gmail.com
                  </td>
                  <td className="py-3">Nam</td>
                  <td className="py-3">1/1/2024</td>
                  <td className="py-3">0365215485</td>
                  <td className="py-3">Chính thức</td>
                </tr>
                <tr className="border-bottom align-middle">
                  <td className="py-3">
                    <input type="radio" />
                  </td>
                  <td className="py-3">01</td>
                  <td className="py-3">
                    <span>Nguyễn Duy Kiên</span> <br />
                    <span>ID: 0001</span>
                  </td>
                  <td className="py-3">
                    kiennd@gmail.com
                  </td>
                  <td className="py-3">Nam</td>
                  <td className="py-3">1/1/2024</td>
                  <td className="py-3">0365215485</td>
                  <td className="py-3">Chính thức</td>
                </tr>
                <tr className="border-bottom align-middle">
                  <td className="py-3">
                    <input type="radio" />
                  </td>
                  <td className="py-3">01</td>
                  <td className="py-3">
                    <span>Nguyễn Duy Kiên</span> <br />
                    <span>ID: 0001</span>
                  </td>
                  <td className="py-3">
                    kiennd@gmail.com
                  </td>
                  <td className="py-3">Nam</td>
                  <td className="py-3">1/1/2024</td>
                  <td className="py-3">0365215485</td>
                  <td className="py-3">Chính thức</td>
                </tr>
                <tr className="border-bottom align-middle">
                  <td className="py-3">
                    <input type="radio" />
                  </td>
                  <td className="py-3">01</td>
                  <td className="py-3">
                    <span>Nguyễn Duy Kiên</span> <br />
                    <span>ID: 0001</span>
                  </td>
                  <td className="py-3">
                    kiennd@gmail.com
                  </td>
                  <td className="py-3">Nam</td>
                  <td className="py-3">1/1/2024</td>
                  <td className="py-3">0365215485</td>
                  <td className="py-3">Chính thức</td>
                </tr>
                <tr className="border-bottom align-middle">
                  <td className="py-3">
                    <input type="radio" />
                  </td>
                  <td className="py-3">01</td>
                  <td className="py-3">
                    <span>Nguyễn Duy Kiên</span> <br />
                    <span>ID: 0001</span>
                  </td>
                  <td className="py-3">
                    kiennd@gmail.com
                  </td>
                  <td className="py-3">Nam</td>
                  <td className="py-3">1/1/2024</td>
                  <td className="py-3">0365215485</td>
                  <td className="py-3">Chính thức</td>
                </tr>
              
              
               
            </tbody>
          </table>
          <div className="mt-4 d-flex justify-content-end mb-20">
            <PaginationAntd></PaginationAntd>
          </div>
          
        </form>
      </ModalReuse>

      {/* Mở modal xác nhận xóa */}
      <Modal
        title={<div style={{ color: 'red', textAlign: 'center' }}>Xóa dữ liệu - Lớp học</div>} 
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Có"
        cancelText="Không"
      >
        <hr className="mt-2 mb-3" />
        <p>Bạn có chắc chắn muốn xóa lớp học <span className="fw-700">6a1</span> không?</p>
      </Modal>
    </div>
  );
};

export default ClassStaff;
