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
import  { ApiService } from '../../../../Services/ApiService'
import NotificationCustom from "../../../../_Shared/Components/Notification-custom/Notification-custom";
import Loading from "../../../../_Shared/Components/Loading/Loading";
import { GRADE_ENUM } from "../../../../_Shared/Enum/grade.enum";
import { STATUS_CLASS_ENUM } from "../../../../_Shared/Enum/status-class-enum";

const ClassStaff = () => {
  const [loading, setLoading] = useState(false);
  //Lấy dữ liệu call api
  const [data, setData] = useState([]);
  const [dataSchoolYear, setDataSchoolYear] = useState([]);
  const [dataAcademic, setDataAcademic] = useState([]);
  const [dataTeacher, setDataTeacher] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const { t, i18n } = useTranslation(); // dịch đa ngôn ngữ
  const navigate = useNavigate(); // Hook để điều hướng
  //modal 
  const [modalIsOpen, setModalIsOpen] = useState(false); // mở dal
  const [isEditMode, setIsEditMode] = useState(false); // mở modal edit
  const [currentData, setCurrentData] = useState(null); // dữ liệu truyền vào edit
  const [isModalVisible, setIsModalVisible] = useState(false); // mở modal confirm xóa
  // 
  const [modalAssignTeacherOpen, setModalAssignTeacherOpen] = useState(false); // mở modal gán giáo viên chủ nhiệm
  const [notification, setNotification] = useState({ type: '', message: '' });
  // Sử dụng react-hook-form
  const { register, handleSubmit, formState: { errors }, watch, trigger,reset } = useForm({mode: "onChange"});

  useEffect(() => {
    // Gọi API khi component mount
    const fetchData = async () => {
      setLoading(true);
      try {
        let dataRequest = {
          school_year_id: localStorage.getItem('schoolYearCurrent') ?? '',
          page: 1,
          size: 10,
          search: ''
        }
        const responseData = await ApiService(`manager/class?school_year_id=${dataRequest.school_year_id}&page=${dataRequest.page}&size=${dataRequest.size}&search=${dataRequest.search}`, 'GET');
        setData(responseData.data.classes);
        setTotalItems(responseData.data.totalItems)
      } catch (error) {
        setLoading(true);
        setNotification({ type: 'error', message: 'Có lỗi liên quan đến hệ thống',title: 'Lỗi' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const getFormData = async () => {
    setLoading(true);
    try {
      const responseData = await ApiService(`manager/class/form`, 'GET');
      setDataAcademic(Array.isArray(responseData.data.academics) ? responseData.data.academics : []);
      setDataSchoolYear(Array.isArray(responseData.data.schoolYears) ? responseData.data.schoolYears : []);
      setDataTeacher(Array.isArray(responseData.data.teachers) ? responseData.data.teachers : []);
    } catch (error) {
      setLoading(true);
      setNotification({ type: 'error', message: 'Có lỗi liên quan đến hệ thống',title: 'Lỗi' });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getFormData();
  },[]);

  const openModalAssignTeacher = (editMode = false, data = null) => {
    setModalAssignTeacherOpen(true); 
  };
    
  const closeModal = () => {
    setModalIsOpen(false); //set modal mở thêm, sửa về false
    setModalAssignTeacherOpen(false);  // set modal gán giáo viên chủ nhiệm về false
    setCurrentData(null);
    reset();
  };
  
  const onSubmit = async (data) => {
    setLoading(true);  
    if (isEditMode) {
      // Xử lý cập nhật dữ liệu khi đang chỉnh sửa
      console.log("Dữ liệu chỉnh sửa:", data);
    } else {
        // Xử lý thêm mới
        console.log("Dữ liệu thêm mới:", data);
        const formData = {
          ...data,
          academic_id: Number(data.academic_id),
          teacher_id: Number(data.teacher_id),
          school_year_id: Number(data.school_year_id),
          status: Number(data.status),
          grade_id: Number(data.grade_id),
        };

        try {
          // Gọi API thêm dữ liệu
          const response = await ApiService('manager/class/create', 'post', formData);
  
          // Nếu thành công
          if (response) {
            await reloadApi();
            setNotification({ type: 'success', message: 'Thêm lớp học mới thành công',title: 'Thành công' });
            setTimeout(() => {
              onClose();
            }, SET_TIMEOUT_MESSAGE);
          } else {
            setErrorMessage('Đã có lỗi xảy ra.');
            setNotification({ type: 'error', message: 'Có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu nhập vào',title: 'Lỗi' });
          }
        } catch (err) {
          setNotification({ type: 'error', message: 'Có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu nhập vào',title: 'Lỗi' });
        } finally {
          setLoading(false);
        }
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
      <Loading isLoading={loading} />
      {/* <header className="h-[100px] w-full"></header> */}
      <div className="pt-6rem bg-white h-100vh px-4">
            <h1 className="fs-16">Danh sách lớp học</h1>
            <p className="mt-2">Task/subtitle/subtitle</p>

            <div className="d-flex justify-content-between align-items-end mt-2">
              <p>Số lớp học: <span className="fw-700">{totalItems} lớp</span></p>
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
                      {data.map((item, index) => (
                        <tr className="align-middle" key={item.id}>
                            <td className="text-center">{index + 1}</td>
                            <td>
                                <span className="fw-700">Lớp: {item.name}</span><br />
                            </td>
                            <td className="text-center">{item.status}</td>
                            <td className="text-center">
                              <span>{item.teacher_name}</span> <br />
                              <span>{item.teacher_email}</span>
                            </td>
                            <td className="text-center">
                              <span>{item.academic_name}</span> <br />
                              <span>Mã: {item.academic_code}</span>
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
          {...register("name", { required: "Tên lớp học bắt buộc" })}
          placeholder="Tên lớp học..."
        />
        {errors.className && <div className="invalid-feedback">{errors.className.message}</div>}
      </div>

      {/* Niên khóa */}
      <div className="col-12 col-md-6 mb-3">
        <label>Niên khóa:</label>
        <select
          className={`form-control ${errors.schoolYear ? 'is-invalid' : ''}`}
          {...register("academic_id", { required: "Niên khóa là bắt buộc" })}
        >
          <option value="">Chọn niên khóa</option>
          {dataAcademic.map((item,index) => (
            <option value={item.id} key={index}>{item.name}</option>
          ))}
        </select>
        {errors.schoolYear && <div className="invalid-feedback">{errors.schoolYear.message}</div>}
      </div>

      {/* Chủ nhiệm */}
      <div className="col-12 col-md-6 mb-3">
        <label>Chủ nhiệm:</label>
        <select
          className={`form-control ${errors.teacher_id ? 'is-invalid' : ''}`}
          {...register("teacher_id")}
        >
          <option value="">Chọn chủ nhiệm</option>
          {dataTeacher.map((item,index) => (
            <option value={item.id} key={index}>{item.name}</option>
          ))}
        </select>
        {errors.teacher_id && <div className="invalid-feedback">{errors.teacher_id.message}</div>}
      </div>

      {/* Khối học */}
      <div className="col-12 col-md-6 mb-3">
        <label>Khối học:</label>
        <select
          className={`form-control ${errors.grade_id ? 'is-invalid' : ''}`}
          {...register("grade_id", { required: "Khối học là bắt buộc" })}
        >
          <option value="">Chọn khối học</option>
          <option value={GRADE_ENUM.GRADE_SIX}>{GRADE_ENUM.GRADE_SIX_LABEL}</option>
          <option value={GRADE_ENUM.GRADE_SEVEN}>{GRADE_ENUM.GRADE_SEVEN_LABEL}</option>
          <option value={GRADE_ENUM.GRADE_EIGHT}>{GRADE_ENUM.GRADE_EIGHT_LABEL}</option>
          <option value={GRADE_ENUM.GRADE_NIGHT}>{GRADE_ENUM.GRADE_NIGHT_LABEL}</option>
        </select>
        {errors.grade_id && <div className="invalid-feedback">{errors.grade_id.message}</div>}
      </div>

      {/* Năm học */}
      <div className="col-12 col-md-6 mb-3">
        <label>Năm học:</label>
        <select
          className={`form-control ${errors.school_year_id ? 'is-invalid' : ''}`}
          {...register("school_year_id", { required: "Năm học là bắt buộc" })}
        >
          <option value="">Chọn năm học</option>
          {dataSchoolYear.map((item,index) => (
            <option value={item.id} key={index}>{item.name}</option>
          ))}
        </select>
        {errors.school_year_id && <div className="invalid-feedback">{errors.school_year_id.message}</div>}
      </div>

      {/* Trạng thái */}
      <div className="col-12 col-md-6 mb-3">
        <label>Trạng thái:</label>
        <select
          className={`form-control ${errors.status ? 'is-invalid' : ''}`}
          {...register("status", { required: "Trạng thái là bắt buộc" })}
        >
          <option value="">Chọn trạng thái</option>
          <option value={STATUS_CLASS_ENUM.HAS_NOT_HAPPENDED}>{STATUS_CLASS_ENUM.HAS_NOT_HAPPENDED_LABEL}</option>
          <option value={STATUS_CLASS_ENUM.HAS_APPROVED}>{STATUS_CLASS_ENUM.HAS_APPROVED_LABEL}</option>
          <option value={STATUS_CLASS_ENUM.FINISHED}>{STATUS_CLASS_ENUM.FINISHED_LABEL}</option>
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

      {notification.message && <NotificationCustom type={notification.type} message={notification.message} title={notification.title} />}
    </div>
  );
};

export default ClassStaff;
