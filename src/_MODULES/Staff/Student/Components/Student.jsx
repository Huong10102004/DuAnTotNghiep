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
import { Button, Modal, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ApiService } from "../../../../Services/ApiService";
import Loading from "../../../../_Shared/Components/Loading/Loading";

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
  const { register, handleSubmit, formState: { errors }, watch, trigger,reset } = useForm({mode: "onChange"});
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
        setTotalItems(responseData.data.total)
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
      setCurrentData(data);
      reset({
        studentName: data.studentName,
        studentCode: data.studentCode,
        studentClass: data.studentClass,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
        schoolYear: data.schoolYear,
        status: data.status,
        parent: data.parent,
        address: data.address
      });
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
  
  const onSubmit = (data) => {
    if (isEditMode) {
    } else {
        setLoading(true);
        try {
          const response = ApiService('manager/academicyear/add','post', data);
    
          if (response.success) {
            onSuccess();
          } else {
            setError("Đã có lỗi xảy ra.");
          }
        } catch (err) {
          setError(err.message);
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
                            <th className="text-center">Liên hệ</th>
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
                                <span className="fw-700">Lớp: {item.class_name ? item.class_name : 'Chưa gán lớp'}</span>
                            </td>
                            <td>
                              <span>{item.email}</span><br/>
                              <span>SĐT: {item.phone}</span>
                            </td>
                            <td className="text-center">{item.gender}</td>
                            <td className="text-center">{item.academic_year_name}</td>
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
      <ModalReuse isOpen={modalIsOpen} onClose={closeModal} title={isEditMode ? "Chỉnh sửa thông tin học sinh" : "Thêm học sinh mới"} width="80%">
      <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {/* Tên học sinh */}
            <div className="col-12 col-md-6 mb-3">
              <label>Tên học sinh:</label>
              <input type="text" className={`form-control ${errors.studentName ? 'is-invalid' : ''}`} {...register("studentName", { required: "Tên học sinh là bắt buộc" })} placeholder="Tên học sinh..." />
              {errors.studentName && <div className="invalid-feedback">{errors.studentName.message}</div>}
            </div>

            {/* Số điện thoại */}
            <div className="col-12 col-md-6 mb-3">
              <label>Số điện thoại:</label>
              <input type="text" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} {...register("phone")} placeholder="Số điện thoại..." />
              {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
            </div>

            {/* Trạng thái */}
            <div className="col-12 col-md-6 mb-3">
              <label>Trạng thái:</label>
              <select className={`form-control ${errors.status ? 'is-invalid' : ''}`} {...register("status", { required: "Trạng thái là bắt buộc" })}>
                <option value="">Chọn trạng thái</option>
                <option value="0">Đang học</option>
                <option value="1">Nghỉ học</option>
              </select>
              {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
            </div>

            {/* Lớp học */}
            <div className="col-12 col-md-6 mb-3">
              <label>Lớp học:</label>
              <select className={`form-control ${errors.class ? 'is-invalid' : ''}`} {...register("class")}>
                <option value="">Chọn lớp</option>
                {listClasses.map((item,index) => (
                  <option key={index} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>

            {/* Ngày sinh */}
            <div className="col-12 col-md-6 mb-3">
              <label>Ngày sinh:</label>
              <input type="date" className={`form-control ${errors.dob ? 'is-invalid' : ''}`} {...register("dob")}/>
            </div>

            {/* Địa chỉ */}
            <div className="col-12 col-md-6 mb-3">
              <label>Địa chỉ:</label>
              <input className={`form-control ${errors.address ? 'is-invalid' : ''}`} {...register("address")} placeholder="Địa chỉ học sinh..." />
            </div>
          </div>

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
    </div>
  );
};

export default Student;
