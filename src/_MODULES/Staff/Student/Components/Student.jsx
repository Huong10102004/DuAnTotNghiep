import React, { useEffect, useState } from "react";
import PaginationAntd from "../../../../_Shared/Components/Pagination/Pagination";
import export_file from "../../../../assets/images/svg/export_file.svg"
import icon_plus from "../../../../assets/images/svg/icon_plus.svg"
import icon_edit from "../../../../assets/images/svg/icon_edit.svg"
import icon_eye from "../../../../assets/images/svg/icon_eye.svg"
import icon_assign_student from "../../../../assets/images/svg/icon_assign_teacher.svg"
import ModalReuse from "../../../../_Shared/Components/Modal-reuse/Modal-reuse";
import { useForm } from 'react-hook-form';
import ActionMenu from "../../../../_Shared/Components/Action-menu/Action-menu";
import { Button, Modal, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ApiService } from "../../../../Services/ApiService";
import Loading from "../../../../_Shared/Components/Loading/Loading";
import genderDirective from "../../../../_Shared/Components/Gender/Gender";
import studentStatusDirective from "../../../../_Shared/Directive/Student-status-directive";
import { GENDER_ENUM } from "../../../../_Shared/Enum/gender.enum";
import NotificationCustom from "../../../../_Shared/Components/Notification-custom/Notification-custom";
import { STATUS_STUDENT_STUDY_ENUM } from "../../../../_Shared/Enum/status-student-study.enum";
import { formatTimestamp } from "../../../../_Shared/Pipe/Format-timestamp";

const Student = () => {
  // dịch đa ngôn ngữ
  const { t, i18n } = useTranslation();
  const navigate = useNavigate(); // Hook để điều hướng
  //modal 
  
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false); // mở dal
  const [modalIsOpenAssignParent, setModalIsOpenAssignParent] = useState(false); // mở dal
  const [isEditMode, setIsEditMode] = useState(false); // mở modal edit
  const [currentData, setCurrentData] = useState(null); // dữ liệu truyền vào edit
  const [isModalVisible, setIsModalVisible] = useState(false); // mở modal confirm xóa
  // Sử dụng react-hook-form
  const { register, handleSubmit, formState: { errors }, watch, trigger,reset , setValue} = useForm({mode: "onChange"});
  const [items, setItems] = useState([]);
  const [listClasses, setListClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ type: '', message: '' });

  // danh sách
  useEffect(() => {
    // Gọi API khi component mount
    const fetchData = async () => {
      setLoading(true);
      try {
        let dataRequest = {
          pageIndex: 1,
          pageSize: 10,
          keyWord: ''
        }
        const responseData = await ApiService(`manager/student?pageIndex=${dataRequest.pageIndex}&pageSize=${dataRequest.pageSize}&keyWord=${dataRequest.keyWord}`, 'GET');
        if(responseData){
          setData(responseData.data);
        }
      } catch (error) {
        setLoading(true);
        console.log(error);
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
      setCurrentData(data);
      setValue("fullname", data?.fullname || ''); 
      setValue("gender", data?.gender || ''); 
      setValue("userDob", formatTimestamp(data?.userDob, 'yyyy-MM-dd') || ''); 
      setValue("address", data?.address || ''); 
      setValue("status", data?.status || '');
      setValue("class_id", data?.class_id || '');
    }else{
      reset();
    }
  };

  const openModalAssignParent = (data = null) => {
    setModalIsOpenAssignParent(true); 
  };
    
  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentData(null);
    reset();
  };

  const closeModalAssignparent = () => {
    setModalIsOpenAssignParent(false);
  }
  
  const onSubmit = async (data) => {
    if (isEditMode) {
      setLoading(true);
      try {
        // Gọi API thêm dữ liệu
        const response = ApiService(`manager/student/update/${currentData?.id}`,'post', data);

        // Nếu thành công
        if (response) {
          await getItems();
          closeModal();
          setNotification({ type: 'success', message: 'Cập nhật học sinh thành công',title: 'Thành công' });
        }
      } catch (error) {
        console.log(error);
        setNotification({ type: 'error', message: 'Cập nhật học sinh thất bại',title: 'Lỗi xảy ra' });
      } finally {
        setLoading(false);
      }
    } else {
        setLoading(true);

        try {
          // Gọi API thêm dữ liệu
          const response = ApiService('manager/student/store','post', data);

          // Nếu thành công
          if (response) {
            await getItems();
            closeModal();
            setNotification({ type: 'success', message: 'Thêm học sinh thành công',title: 'Thành công' });
          }
        } catch (error) {
          console.log(error);
          setNotification({ type: 'error', message: 'Thêm học sinh thất bại',title: 'Lỗi xảy ra' });
        } finally {
          setLoading(false);
        }
    }
  };

  // Hàm click thao tác 
  const handleMenuClick = (key, data) => {
    if (key === "edit") {
      openModal(true, data); // Pass the data for editing
    } else if (key === "delete") {
      console.log("Deleting: ", data);
    } else if (key === "detail") {
      navigate('/staff/student/detail/'+data.id)
    }else if (key === "assign_to_parent"){
      openModalAssignParent();
    }
  };

  const menuItems = [
    { key: 'detail', label: 'Xem chi tiết', icon: icon_eye},
    { key: 'edit', label: 'Sửa thông tin', icon: icon_edit},
    { key: 'assign_to_parent', label: 'Gán phụ huynh cho học sinh', icon: icon_assign_student },
  ];

  // Dữ liệu hiển thị 

  const getItems = async () => {
    setLoading(true);
    try {
      const data = await ApiService('manager/student'); 
      console.log(data);
      setItems(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);  // Dừng trạng thái tải dữ liệu
    }
  };

  const getClasses = async () => {
    setLoading(true);
    try {
      const schoolYearId = localStorage.getItem('schoolYearCurrent')
      const data = await ApiService(`manager/class?school_year_id=${schoolYearId}`);  
      setListClasses(Array.isArray(data.data.classes) ? data.data.classes : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);  // Dừng trạng thái tải dữ liệu
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    if(modalIsOpen){
      getClasses();
    }
  },[modalIsOpen])
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

  const footerModal = () => {
    return <div className="text-center mt-3">
            <button onClick={closeModalAssignparent} className="btn bg-color-white-smoke me-3 w-100px">Đóng</button>
            <button type="submit" className="btn btn-primary w-100px">Lưu</button>
          </div>
  }

  const title = () => {
    return <div>
        <p>Họ tên: Nguyễn Duy kiên</p>
        <p>Sinh năm: 2004</p>
        <p>Lớp: 6a1 - K18.3</p>
    </div>
  }

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ type: '', message: '', title: '' });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  // useEffect(() => {
  //   setValue("fullname", currentData?.fullname || ''); 
  //   setValue("gender", currentData?.gender || ''); 
  //   setValue("userDob", formatTimestamp(currentData?.userDob, 'yyyy-MM-dd') || ''); 
  //   setValue("address", currentData?.address || ''); 
  //   setValue("status", currentData?.status || '');
  //   setValue("class_id", currentData?.class_id || '');
  // }, [currentData])
  return (
    <div>
      <Loading isLoading={loading} />
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
                            <th className="text-center">Lớp học</th>
                            <th className="text-center w-10">Giới tính</th>
                            <th className="text-center">Niên khóa</th>
                            <th className="w-15 text-center">{t('status')}</th>
                            <th className="w-10 text-center">Phụ huynh</th>
                            <th className="w-10 text-center">{t('action')}</th>
                        </tr>
                    </thead>
                    <tbody>
                      {data?.map((item, index) => (
                        <tr className="align-middle" key={item.id}>
                            <td className="text-center">{index + 1}</td>
                            <td>
                                <span className="fw-700">{item.fullname}</span><br />
                                <span className="fw-700">Mã: {item.student_code}</span> <br/>
                            </td>
                            <td>
                            <span className="fw-700">Lớp: {item.class_name ? item.class_name : 'Chưa gán lớp'}</span>
                            </td>
                            <td className="text-center">{genderDirective(item.gender)}</td>
                            <td className="text-center fw-700">{item.academic_year_name}</td>
                            <td className="text-center">{studentStatusDirective(item.status)}</td>
                            <td className="text-center fw-700">{item.parent}</td>
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
      <ModalReuse isOpen={modalIsOpen} onClose={closeModal} title={isEditMode ? t('editStudent') : t('addStudent')} width="80%">
      <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {/* Tên học sinh */}
            <div className="col-12 col-md-6 mb-3">
              <label>{t('studentName')}<span class="text-color-red-bold">*</span></label>
              <input type="text" className={`form-control ${errors.fullname ? 'is-invalid' : ''}`} {...register("fullname", { required: t('studentNameRequired') })} placeholder={t('studentNamePlaceholder')} />
              {errors.fullname && <div className="invalid-feedback">{errors.fullname.message}</div>}
            </div>

            <div className="col-12 col-md-6 mb-3">
              <label>{t('gender')}<span class="text-color-red-bold">*</span></label>
              <select className={`form-control ${errors.gender ? 'is-invalid' : ''}`} {...register("gender", { required: t('genderRequired') })}>
                <option value="">{t('genderChoose')}</option>
                <option value={GENDER_ENUM.NAM}>{GENDER_ENUM.NAM_LABEL}</option>
                <option value={GENDER_ENUM.WOMAN}>{GENDER_ENUM.WOMAN_LABEL}</option>
              </select>
              {errors.gender && <div className="invalid-feedback">{errors.gender.message}</div>}
            </div>

            {/* Trạng thái */}
            <div className="col-12 col-md-6 mb-3">
              <label>{t('status')}<span class="text-color-red-bold">*</span></label>
              <select className={`form-control ${errors.status ? 'is-invalid' : ''}`} {...register("status", { required: t('statusRequired') })}>
                <option value="">{t('statusChoose')}</option>
                <option value={STATUS_STUDENT_STUDY_ENUM.LEAVE_SCHOOL}>{STATUS_STUDENT_STUDY_ENUM.LEAVE_SCHOOL_LABEL}</option>
                <option value={STATUS_STUDENT_STUDY_ENUM.STUDYING}>{STATUS_STUDENT_STUDY_ENUM.STUDYING_LABEL}</option>
              </select>
              {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
            </div>

            {/* Lớp học */}
            <div className="col-12 col-md-6 mb-3">
              <label>{t('class')}:</label>
              <select className={`form-control ${errors.class_id ? 'is-invalid' : ''}`} {...register("class_id")}>
                <option value="">{t('classChoose')}</option>
                {listClasses.map((item,index) => (
                  <option key={index} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>

            {/* Ngày sinh */}
            <div className="col-12 col-md-6 mb-3">
              <label>{t('dob')}:</label>
              <input type="date" className={`form-control ${errors.dob ? 'is-invalid' : ''}`} {...register("dob")}/>
            </div>

            {/* Địa chỉ */}
            <div className="col-12 col-md-6 mb-3">
              <label>{t('address')}:</label>
              <input className={`form-control ${errors.address ? 'is-invalid' : ''}`} {...register("address")} placeholder={t('address')} />
            </div>
          </div>

          <div className="text-center mt-3">
            <button onClick={closeModal} className="btn bg-color-white-smoke me-3 w-100px">{t('close')}</button>
            <button type="submit" className="btn btn-primary w-100px">{t('save')}</button>
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

      <ModalReuse isOpen={modalIsOpenAssignParent} onClose={closeModalAssignparent} title={"Gán phụ huynh cho học sinh Duy Kiên"} width="80%" footerModal={footerModal()}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="fs-16">Danh sách phụ huynh</h1>

          <div className="d-flex justify-content-between align-items-end mt-2">
            <p>Số lượng: <span className="fw-700">32 phụ huynh</span></p>
            <input placeholder={t('search')} className={`bg-color-white-smoke px-3 py-2 border-radius-10px w-400px`}/>
          </div>
          <table className="w-100 mt-5">
            <thead>
              <tr className="border-bottom">
                <th className="pb-3">#</th>
                <th className="pb-3">STT</th>
                <th className="pb-3">Họ tên phụ huynh</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Giới tính</th>
                <th className="pb-3">Ngày sinh</th>
                <th className="pb-3">SĐT</th>
                <th className="pb-3">Tên đăng nhập</th>
                <th className="pb-3 text-center">Con</th>
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
                  <td className="py-3">duykien</td>
                  <td className="py-3 text-center">
                    <Tooltip title={title} color={'text-color-blue'} key={'blue'} placement='bottomRight'>
                        <Button>1 con</Button>
                    </Tooltip>
                  </td>
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
                  <td className="py-3">duykien</td>
                  <td className="py-3 text-center">
                    <Tooltip title={title} color={'text-color-blue'} key={'blue'} placement='bottomRight'>
                        <Button>1 con</Button>
                    </Tooltip>
                  </td>
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
                  <td className="py-3">duykien</td>
                  <td className="py-3 text-center">
                    <Tooltip title={title} color={'text-color-blue'} key={'blue'} placement='bottomRight'>
                        <Button>1 con</Button>
                    </Tooltip>
                  </td>
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
                  <td className="py-3">duykien</td>
                  <td className="py-3 text-center">
                    <Tooltip title={title} color={'text-color-blue'} key={'blue'} placement='bottomRight'>
                        <Button>1 con</Button>
                    </Tooltip>
                  </td>
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
                  <td className="py-3">duykien</td>
                  <td className="py-3 text-center">
                    <Tooltip title={title} color={'text-color-blue'} key={'blue'} placement='bottomRight'>
                        <Button>1 con</Button>
                    </Tooltip>
                  </td>
                </tr>
            </tbody>
          </table>
          <div className="mt-4 d-flex justify-content-end mb-20">
            <PaginationAntd></PaginationAntd>
          </div>
          
        </form>
      </ModalReuse>
      {notification.message && <NotificationCustom type={notification.type} message={notification.message} title={notification.title} />}
    </div>
  );
};

export default Student;
