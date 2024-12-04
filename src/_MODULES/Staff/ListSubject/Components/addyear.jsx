import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { STATUS_SCHOOL_YEAR } from "../../../../ENUM/StatusSchoolYear";
import { ApiService } from "../../../../Services/ApiService";
import DatePickerComponent from "../../../../_Shared/Components/Date-picker/Date-picker";
import Loading from "../../../../_Shared/Components/Loading/Loading";
import NotificationCustom from "../../../../_Shared/Components/Notification-custom/Notification-custom";
import { SET_TIMEOUT_MESSAGE } from "../../../../_Shared/Constant/constant";

const Addyear = ({ isOpen, onClose, reloadApi }) => {
  const [loading, setLoading] = useState(null);
  const [errorMessage, setErrorMessage] = useState({ start: '', end: '' });
  const [startDate, setStartDate] = useState(null); // start Date
  const [endDate, setEndDate] = useState(null); // start Date
  const [notification, setNotification] = useState({ type: '', message: '' });
  const [isOpenTheBao, setIsOpen] = useState(isOpen);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  let isValid = false;
  useEffect(() => {
    if(isValid){
      if (!startDate) {
        setErrorMessage(prevState => ({ ...prevState, start: 'Start date is required.' }));
      } else {
        setErrorMessage(prevState => ({ ...prevState, start: '' }));
      }
  
      if (!endDate) {
        setErrorMessage(prevState => ({ ...prevState, end: 'End date is required.' }));
      } else {
        setErrorMessage(prevState => ({ ...prevState, end: '' }));
      }
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ type: '', message: '', title: '' }); 
      }, SET_TIMEOUT_MESSAGE);

      return () => clearTimeout(timer); 
    }
  }, [notification])

  const onSubmit = async (data) => {
    setLoading(true);  
    isValid = true;

    if (!startDate) {
      setErrorMessage(prevState => ({ ...prevState, start: 'Start date is required.' }));
      isValid = false;
    } else {
      setErrorMessage(prevState => ({ ...prevState, start: '' }));
    }

    if (!endDate) {
      setErrorMessage(prevState => ({ ...prevState, end: 'End date is required.' }));
      isValid = false;
    } else {
      setErrorMessage(prevState => ({ ...prevState, end: '' }));
    }
    
    if (isValid && !Object.keys(errors).length) {
      setLoading(true);

      const formData = {
        ...data,
        schoolYearStartDate: startDate,
        schoolYearEndDate: endDate,
        schoolYearStatus: Number(data.schoolYearStatus)
      };

      try {
        // Gọi API thêm dữ liệu
        const response = await ApiService('manager/schoolyear/add', 'post', formData);
        console.log("Dữ liệu trả về từ API: ", response);

        // Nếu thành công
        if (response) {
          await reloadApi();
          setNotification({ type: 'success', message: 'Thêm năm học mới thành công',title: 'Thành công' });

          setTimeout(function(){
            document.querySelector('.btn-clone-add-year').click();
          }, 2000);

          // setIsAddYearModalOpen(true);
          // setTimeout(() => {
          //   onClose();
          // }, SET_TIMEOUT_MESSAGE);

        } else {
          setErrorMessage('Đã có lỗi xảy ra.');
          setNotification({ type: 'error', message: 'Có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu nhập vào',title: 'Lỗi' });
        }
      } catch (err) {
        setNotification({ type: 'error', message: 'Có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu nhập vào',title: 'Lỗi' });
      } finally {
        setLoading(false);
      }
    }else{
      setLoading(false);
    }
  };

  const handleStartDateChange = (dateString) => {
    setStartDate(dateString);
  };

  const handleEndDateChange = (dateString) => {
    setEndDate(dateString);
  };

  if (!isOpenTheBao){
    // setIsOpen(true);
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <Loading isLoading={loading} />
      <div className="relative w-[70%] rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-2 text-center text-xl font-bold">Thêm năm học</h2>
        <hr className="mb-4" />
        <button
          className="absolute btn-clone-add-year right-4 top-4 text-gray-600 hover:text-red-600"
          onClick={onClose}
        >
          &times;
        </button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-6">
            {/* Tên nhân viên */}
            <div className="mb-4 flex">
              <label className="mb-1 mr-2 mt-1 block w-1/5 font-medium text-gray-700">
                Tên năm học
              </label>
              <div className="flex w-4/5 flex-col">
                <input
                  type="text"
                  {...register("schoolYearName", {
                    required: "Tiêu đề năm học bắt buộc nhập",
                  })}
                  className="w-full rounded border p-2"
                  placeholder="Nhập tiêu đề năm học"
                />
                {errors.schoolYearName && (
                  <span className="mt-1 text-sm font-bold text-red-500">
                    {errors.schoolYearName.message}
                  </span>
                )}
              </div>
            </div>

            {/* Trạng thái */}
            <div className="mb-4 flex">
              <label className="mb-1 mr-2 mt-1 block w-1/5 font-medium text-gray-700">
                Trạng thái
              </label>
              <div className="flex w-4/5 flex-col">
                <select
                  {...register("schoolYearStatus", {
                    required: "Trạng thái bắt buộc phải chọn",
                  })}
                  className="w-full rounded border p-2"
                >
                  <option value={Number(STATUS_SCHOOL_YEAR.NOT_STARTED_YET)}>{STATUS_SCHOOL_YEAR.NOT_STARTED_YET_LABEL}</option>
                  <option value={Number(STATUS_SCHOOL_YEAR.ONGOING)}>{STATUS_SCHOOL_YEAR.ONGOING_LABEL}</option>
                  <option value={Number(STATUS_SCHOOL_YEAR.FINISHED)}>{STATUS_SCHOOL_YEAR.FINISHED_LABEL}</option>
                </select>
                {errors.status && (
                  <span className="mt-1 text-sm font-bold text-red-500">
                    {errors.status.message}
                  </span>
                )}
              </div>
            </div>

            {/* Ngày bắt đầu */}
            <div className="mb-4 flex">
              <label className="mb-1 mr-2 mt-1 block w-1/5 font-medium text-gray-700">
                Ngày bắt đầu
              </label>
              <div className="flex w-4/5 flex-col">
                <DatePickerComponent onDateChange={handleStartDateChange} selectedDate={startDate} placeholder={'Chọn ngày bắt đầu năm học'} />
                {!startDate && errorMessage.start && (
                  <p style={{ color: 'red' }}>{errorMessage.start}</p>
                )}
              </div>
            </div>

            <div className="mb-4 flex">
              <label className="mb-1 mr-2 mt-1 block w-1/5 font-medium text-gray-700">
                Ngày kết thúc
              </label>
              <div className="flex w-4/5 flex-col">
                <DatePickerComponent onDateChange={handleEndDateChange} selectedDate={endDate} placeholder={'Chọn ngày kết thúc năm học'} />
                {!endDate && errorMessage.end && (
                  <p style={{ color: 'red' }}>{errorMessage.end}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="rounded bg-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-400"
              onClick={onClose}
            >
              Đóng
            </button>

            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
            >
              lưu
            </button>
          </div>
        </form>
      </div>
      {notification.message && <NotificationCustom type={notification.type} message={notification.message} title={notification.title} />}
    </div>
  );
};

export default Addyear;
