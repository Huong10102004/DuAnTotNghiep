import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePickerComponent from "../../../../_Shared/Components/Date-picker/Date-picker";
import { STATUS_SCHOOL_YEAR } from "../../../../ENUM/StatusSchoolYear";
import { SET_TIMEOUT_MESSAGE } from "../../../../_Shared/Constant/constant";
import { ApiService } from "../../../../Services/ApiService";

const Updateyear = ({ isOpen, onClose, data }) => {
  const [loading, setLoading] = useState(null);
  const [errorMessage, setErrorMessage] = useState({ start: '', end: '' });
  const [schoolYearStartDate, setSchoolYearStartDate] = useState(null); // start Date
  const [schoolYearEndDate, setSchoolYearEndDate] = useState(null); // start Date
  const [notification, setNotification] = useState({ type: '', message: '' });

  const [schoolYearId, setSchoolYearId] = useState(''); // Controlled input cho tên năm học
  const [schoolYearName, setSchoolYearName] = useState(''); // Controlled input cho tên năm học
  const [schoolYearStatus, setSchoolYearStatus] = useState(''); // Controlled input cho trạng thái
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);  
    isValid = true;
    if (!schoolYearStartDate) {
      setErrorMessage(prevState => ({ ...prevState, start: 'Start date is required.' }));
      isValid = false;
    } else {
      setErrorMessage(prevState => ({ ...prevState, start: '' }));
    }

    if (!schoolYearEndDate) {
      setErrorMessage(prevState => ({ ...prevState, end: 'End date is required.' }));
      isValid = false;
    } else {
      setErrorMessage(prevState => ({ ...prevState, end: '' }));
    }
    if (isValid && !Object.keys(errors).length) {
      setLoading(true);

      const formData = {
        ...data,
        schoolYearStartDate: schoolYearStartDate,
        schoolYearEndDate: schoolYearEndDate,
        schoolYearStatus: Number(data.schoolYearStatus)
      };

      try {
        // Gọi API thêm dữ liệu
        const response = await ApiService(`manager/schoolyear/edit/${schoolYearId}`, 'post', formData);

        // Nếu thành công
        if (response) {
          await reloadApi();
          setNotification({ type: 'success', message: 'Chỉnh sửa năm học thành công',title: 'Thành công' });
          setTimeout(() => {
            onClose();
          }, SET_TIMEOUT_MESSAGE);
        } else {
          setErrorMessage('Đã có lỗi xảy ra.');
          setNotification({ type: 'error', message: 'Có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu nhập vào',title: 'Lỗi' });
        }
      } catch (err) {
        console.log("Try error", err);
        setNotification({ type: 'error', message: 'Có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu nhập vào',title: 'Lỗi' });
      } finally {
        setLoading(false);
      }
    }else{
      setLoading(false);
    }
  };

  let isValid = false;
  useEffect(() => {
    if (data) {
      setSchoolYearId(data.schoolYearId || ''); // Khởi tạo với giá trị mặc định
      setSchoolYearName(data.schoolYearName || ''); // Khởi tạo với giá trị mặc định
      setSchoolYearStatus(data.schoolYearStatus || ''); // Khởi tạo với giá trị mặc định
      setSchoolYearStartDate(data.schoolYearStartDate);
      setSchoolYearEndDate(data.schoolYearEndDate);

      setValue("schoolYearName", data.schoolYearName || ''); 
      setValue("schoolYearStatus", data.schoolYearStatus || '');
    }
  }, [data]);

  useEffect(() => {
    if(isValid){
      if (!schoolYearStartDate) {
        setErrorMessage(prevState => ({ ...prevState, start: 'Start date is required.' }));
      } else {
        setErrorMessage(prevState => ({ ...prevState, start: '' }));
      }
  
      if (!schoolYearEndDate) {
        setErrorMessage(prevState => ({ ...prevState, end: 'End date is required.' }));
      } else {
        setErrorMessage(prevState => ({ ...prevState, end: '' }));
      }
    }
  }, [schoolYearStartDate, schoolYearEndDate])

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ type: '', message: '', title: '' }); 
      }, SET_TIMEOUT_MESSAGE);

      return () => clearTimeout(timer); 
    }
  }, [notification])
  const handleStartDateChange = (dateString) => {
    setSchoolYearStartDate(dateString);
  };

  const handleEndDateChange = (dateString) => {
    setSchoolYearEndDate(dateString);
  };

  if (!isOpen) return null; // Don't render if modal is closed

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="relative w-[70%] rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-2 text-center text-xl font-bold">Chỉnh sửa năm học</h2>
        <hr className="mb-4" />
        <button
          className="absolute right-4 top-4 text-gray-600 hover:text-red-600"
          onClick={onClose}
        >
          &times;
        </button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-6">
            {/* Tên nhân viên */}
            <div className="mb-4 flex">
              <label className="mb-1 mr-2 mt-1 block w-1/5 font-medium text-gray-700">
                Tên năm học
              </label>
              <div className="flex w-4/5 flex-col">
                <input
                  type="text"
                  {...register("schoolYearName", {
                    required: "Tên của năm học bắt buộc nhập",
                  })}
                  className="w-full rounded border p-2"
                  placeholder="Nhập tên năm học"
                  value={schoolYearName}
                  onChange={(e) => setSchoolYearName(e.target.value)}
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
                  value={schoolYearStatus}
                  onChange={(e) => setStatus(e.target.value)}
                >
                 <option value={Number(STATUS_SCHOOL_YEAR.NOT_STARTED_YET)}>{STATUS_SCHOOL_YEAR.NOT_STARTED_YET_LABEL}</option>
                  <option value={Number(STATUS_SCHOOL_YEAR.ONGOING)}>{STATUS_SCHOOL_YEAR.ONGOING_LABEL}</option>
                  <option value={Number(STATUS_SCHOOL_YEAR.FINISHED)}>{STATUS_SCHOOL_YEAR.FINISHED_LABEL}</option>
                </select>
                {errors.schoolYearStatus && (
                  <span className="mt-1 text-sm font-bold text-red-500">
                    {errors.schoolYearStatus.message}
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
              <DatePickerComponent onDateChange={handleStartDateChange} selectedDate={schoolYearStartDate} placeholder={'Chọn ngày bắt đầu năm học'} />
                {!schoolYearStartDate && errorMessage.start && (
                  <p style={{ color: 'red' }}>{errorMessage.start}</p>
                )}
              </div>
            </div>

            <div className="mb-4 flex">
              <label className="mb-1 mr-2 mt-1 block w-1/5 font-medium text-gray-700">
                Ngày kết thúc
              </label>
              <div className="flex w-4/5 flex-col">
              <DatePickerComponent onDateChange={handleEndDateChange} selectedDate={schoolYearEndDate} placeholder={'Chọn ngày kết thúc năm học'} />
                {!schoolYearEndDate && errorMessage.end && (
                  <p style={{ color: 'red' }}>{errorMessage.end}</p>
                )}
              </div>
            </div>
          </div>
          <hr className="mb-4" />

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
    </div>
  );
};

export default Updateyear;
