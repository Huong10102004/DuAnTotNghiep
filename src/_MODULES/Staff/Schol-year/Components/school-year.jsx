import React, { useEffect, useState } from "react";
import PaginationAntd from "../../../../_Shared/Components/Pagination/Pagination";
import export_file from "../../../../assets/images/svg/export_file.svg"
import icon_plus from "../../../../assets/images/svg/icon_plus.svg"
import icon_edit from "../../../../assets/images/svg/icon_edit.svg"
import icon_delete from "../../../../assets/images/svg/icon_delete.svg"
import ModalReuse from "../../../../_Shared/Components/Modal-reuse/Modal-reuse";
import { useForm } from 'react-hook-form';
import ActionMenu from "../../../../_Shared/Components/Action-menu/Action-menu";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import { ApiService } from "../../../../Services/ApiService";
import Loading from "../../../../_Shared/Components/Loading/Loading";
import DatePickerComponent from "../../../../_Shared/Components/Date-picker/Date-picker";
import NotificationCustom from "../../../../_Shared/Components/Notification-custom/Notification-custom";
import { formatTimestamp } from "../../../../_Shared/Pipe/Format-timestamp";
import { STATUS_SCHOOL_YEAR_ENUM } from "../../../../_Shared/Enum/status-school-year.enum";

const SchoolYear = () => {
  const [items, setItems] = useState([]);
  const { t, i18n } = useTranslation();
  const [modalIsOpen, setModalIsOpen] = useState(false); // mở dal
  const [isEditMode, setIsEditMode] = useState(false); // mở modal edit
  const [currentData, setCurrentData] = useState(null); // dữ liệu truyền vào edit
  const [isModalVisible, setIsModalVisible] = useState(false); // mở modal confirm xóa
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(); // start Date
  const [endDate, setEndDate] = useState(); // start Date
  const [notification, setNotification] = useState({ type: '', message: '' });
  const [selectedRecord, setSelectedRecord] = React.useState(null);
  // Sử dụng react-hook-form
  const { register, handleSubmit, formState: { errors },reset } = useForm({mode: "onChange"});

    
  const openModal = (editMode = false, data = null) => {
    setIsEditMode(editMode);
    console.log(editMode);
    setModalIsOpen(true); 
    if (editMode && data) {
      setCurrentData(data);
      reset({
        name: data.name, // example data fields
        status: data.status,
        start_year: data.start_year,
        end_year: data.end_year
      });
      console.log(data);
    }else{
      reset({
        name: '', // example data fields
        status: STATUS_SCHOOL_YEAR_ENUM.NOT_STARTED_YET,
        start_year: null,
        end_year: null
      });
      setStartDate(null);
      setEndDate(null);
    }
  };
    
  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentData(null);
    reset();
  };
  
  const onSubmit = async (data) => {
    setLoading(true);
    if (isEditMode) {
      // Xử lý cập nhật dữ liệu khi đang chỉnh sửa
      try {
        const formData = {
          name: data.name,
          status: Number(data.status)
        };
        console.log(formData);
        const response = await ApiService(`manager/academicyear/update/${currentData.id}`,'PUT', formData);  // Gọi API lấy danh sách
        if (response) {
          await getItems();
          setNotification({ type: 'success', message: 'Chỉnh sửa niên khóa thành công',title: 'Thành công' });
          setTimeout(() => {
            onClose();
          }, SET_TIMEOUT_MESSAGE);
        } else {
          setErrorMessage('Đã có lỗi xảy ra.');
          setNotification({ type: 'error', message: 'Có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu nhập vào',title: 'Lỗi' });
        }
        
      } catch (err) {
        setNotification({ type: 'error', message: 'Chỉnh sửa niên khóa không thành công',title: 'Lỗi xảy ra' });
      } finally {
        setLoading(false);  // Dừng trạng thái tải dữ liệu
      }
    } else {
        // Xử lý thêm mới
        try {
          const formData = {
            ...data,
            start_year: startDate,
            end_year: endDate
          };
          const response = await ApiService(`manager/academicyear/add`,'POST', formData);  // Gọi API lấy danh sách
          if (response) {
            await getItems();
            setNotification({ type: 'success', message: 'Thêm niên khóa mới thành công',title: 'Thành công' });
            setTimeout(() => {
              onClose();
            }, SET_TIMEOUT_MESSAGE);
          } else {
            setErrorMessage('Đã có lỗi xảy ra.');
            setNotification({ type: 'error', message: 'Có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu nhập vào',title: 'Lỗi' });
          }
        } catch (err) {
          setNotification({ type: 'error', message: 'Thêm niên khóa không thành công',title: 'Lỗi xảy ra' });
        } finally {
          setLoading(false);  // Dừng trạng thái tải dữ liệu
        }
    }
    getItems(); // Cập nhật lại danh sách sau khi thêm hoặc sửa
    closeModal();
  };

  const getItems = async () => {
    setLoading(true);
    try {
      const response = await ApiService("manager/academicyear");
      setItems(response.data.data || []);
    } catch (error) {
      setNotification({ type: 'error', message: 'Lỗi liên quan hệ thống. Vui lòng liên hệ QTV',title: 'Lỗi xảy ra' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ type: '', message: '', title: '' }); // Ẩn thông báo sau 3 giây
      }, 3000);

      return () => clearTimeout(timer); // Xóa bộ hẹn giờ khi component bị unmount hoặc message thay đổi
    }
    getItems();
  }, []);

  // Hàm click thao tác 
  const handleMenuClick = (key, data) => {
    if (key === "edit") {
      openModal(true, data); // Pass the data for editing
    } else if (key === "delete") {
      console.log("Deleting: ", data);
    }
  };

  const menuItems = [
    { key: 'edit', label: 'Chỉnh sửa', icon: icon_edit},
    { key: 'delete', label: 'Xóa', icon: icon_delete },
  ];

  useEffect(() => {
    getItems();  // Gọi API lấy dữ liệu khi component được render lần đầu
  }, []);

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

  //Handle model theem
  const handleStartDateChange = (dateString) => {
    console.log(dateString);
    if(dateString){
      setStartDate(dateString);
    }
  };

  const handleEndDateChange = (dateString) => {
    setEndDate(dateString);
  };

  const handleEditClick = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };
  return (
    <div>
      <Loading isLoading={loading} />
      {/* <header className="h-[100px] w-full"></header> */}
      <div className="pt-6rem bg-white h-100vh px-4">
            <h1 className="fs-16">{t('schoolYear')}</h1>
            <p className="mt-2">Task/subtitle/subtitle</p>

            <div className="d-flex justify-content-between align-items-end mt-2">
              <p>{t('countSchoolYear')}: <span className="text-danger">{items.length} {t('schoolYear')}</span></p>
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
                            <th><span className="ps-10">{t('schoolYearInformation')}</span></th>
                            <th className="text-center">{t('status')}</th>
                            <th className="text-center">{t('startDate')}</th>
                            <th className="text-center">{t('endDate')}</th>
                            <th className="w-15 text-center">{t('gradePresent')}</th>
                            <th className="w-10 text-center">{t('action')}</th>
                        </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr className="align-middle" key={item.id}>
                            <td className="text-center">{index + 1}</td>
                            <td>
                                <span className="fw-700">{item.name}</span><br />
                                <span className="fw-700">Mã: {item.code}</span>
                            </td>
                            <td className="text-center">{item.status}</td>
                            <td className="text-center">{formatTimestamp(item.start_year)}</td>
                            <td className="text-center">{formatTimestamp(item.end_year)}</td>
                            <td className="text-center">{item.gradeName}</td>
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
              <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} {...register("name", { required: "Tên niên khóa là bắt buộc" })} placeholder="Tên niên khóa..."/>
              {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
            </div>

            {/* Trạng thái */}
            <div className="col-12 col-md-6 mb-3">
              <label>Trạng thái:</label>
              <select className={`form-control ${errors.status ? 'is-invalid' : ''}`} {...register("status", { required: "Trạng thái là bắt buộc" })} >
                <option value={STATUS_SCHOOL_YEAR_ENUM.NOT_STARTED_YET}>{STATUS_SCHOOL_YEAR_ENUM.NOT_STARTED_YET_LABEL}</option>
                <option value={STATUS_SCHOOL_YEAR_ENUM.ONGOING}>{STATUS_SCHOOL_YEAR_ENUM.ONGOING_LABEL}</option>
                <option value={STATUS_SCHOOL_YEAR_ENUM.FINISHED}>{STATUS_SCHOOL_YEAR_ENUM.FINISHED_LABEl}</option>
              </select>
              {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
            </div>

            {/* Ngày bắt đầu */}
            <div className="col-12 col-md-6 mb-3">
              <label>Ngày bắt đầu:</label>
              <div className="flex w-5/5 flex-col">
                <DatePickerComponent onDateChange={handleStartDateChange} selectedDate={startDate} placeholder={'Chọn ngày bắt đầu năm học'} />
              </div>
            </div>

            {/* Ngày kết thúc */}
            <div className="col-12 col-md-6 mb-3">
              <label>Ngày kết thúc:</label>
              <div className="w-100">
              <div className="flex w-5/5 flex-col">
                <DatePickerComponent onDateChange={handleEndDateChange} selectedDate={endDate} placeholder={'Chọn ngày kết thúc năm học'} />
              </div>
              </div>
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
      {notification.message && <NotificationCustom type={notification.type} message={notification.message} title={notification.title} />}
    </div>
  );
};

export default SchoolYear;
