import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PaginationAntd from "../../../../_Shared/Components/Pagination/Pagination";
import { getListClassToAttendance } from "../../../../Services/Attendance/attendance";
import { STATUS_SCHOOL_YEAR } from "../../../../ENUM/StatusSchoolYear";
import { ApiService } from "../../../../Services/ApiService";
import DatePickerComponent from "../../../../_Shared/Components/Date-picker/Date-picker";

const Addyear = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [startDate, setStartDate] = useState(null); // start Date
  const [endDate, setEndDate] = useState(null); // start Date
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const onSubmit = (data) => {
    setLoading(true);

    let isValid = true;

    // Kiểm tra nếu startDate và endDate rỗng
    if (!startDate) {
      setErrorMessage(prevState => ({ ...prevState, start: 'Start date is required.' }));
      isValid = false;
    }

    if (!endDate) {
      setErrorMessage(prevState => ({ ...prevState, end: 'End date is required.' }));
      isValid = false;
    }

    if (isValid) {
      // Xử lý submit form nếu cả hai trường đều hợp lệ
      console.log('Form submitted with:', { startDate, endDate });
      // Sau khi xử lý submit form bạn có thể reset hoặc xử lý logic khác
    }
    
    if(startDate && endDate){
      try {
        // Gọi API thêm dữ liệu
        const response = ApiService('manager/schoolyear/add','post', data);
        console.log("Dữ liệu trả về từ API: ", response);
  
        // Nếu thành công
        if (response.success) {
          onSuccess(); // Gọi hàm để cập nhật lại danh sách và đóng modal
        } else {
          setError("Đã có lỗi xảy ra.");
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }else{
      setErrorMessage('Please fill in both start date and end date.');
    }
  };

  const handleStartDateChange = (dateString) => {
    setStartDate(dateString);
    setErrorMessage({ ...errorMessage, start: '' });
  };

  const handleEndDateChange = (dateString) => {
    setEndDate(dateString);
    setErrorMessage({ ...errorMessage, end: '' }); // Reset thông báo lỗi khi người dùng bắt đầu nhập lại
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="relative w-[70%] rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-2 text-center text-xl font-bold">Thêm năm học</h2>
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
                Tên năm học
              </label>
              <div className="flex w-4/5 flex-col">
                <input
                  type="text"
                  {...register("name", {
                    required: "Tên của niên khóa bắt buộc nhập",
                  })}
                  className="w-full rounded border p-2"
                  placeholder="Nhập tiêu đề năm học"
                />
                {errors.name && (
                  <span className="mt-1 text-sm font-bold text-red-500">
                    {errors.name.message}
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
                  {...register("status", {
                    required: "Trạng thái bắt buộc phải chọn",
                  })}
                  className="w-full rounded border p-2"
                >
                  <option value={STATUS_SCHOOL_YEAR.NOT_STARTED_YET}>{STATUS_SCHOOL_YEAR.NOT_STARTED_YET_LABEL}</option>
                  <option value={STATUS_SCHOOL_YEAR.ONGOING}>{STATUS_SCHOOL_YEAR.ONGOING_LABEL}</option>
                  <option value={STATUS_SCHOOL_YEAR.FINISHED}>{STATUS_SCHOOL_YEAR.FINISHED_LABEL}</option>
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
                {/* <input
                  type="date"
                  {...register("start_date", {
                    required: "Ngày bắt đầu bắt buộc chọn",
                  })}
                  className="w-full rounded border p-2"
                />
                {errors.start_date && (
                  <span className="mt-1 text-sm font-bold text-red-500">
                    {errors.start_date.message}
                  </span>
                )} */}
                <DatePickerComponent onDateChange={handleStartDateChange} placeholder={'Chọn ngày bắt đầu năm học'} />
                {!startDate && errorMessage && <p style={{ color: 'red' }}>Start date is required.</p>}
              </div>
            </div>

            <div className="mb-4 flex">
              <label className="mb-1 mr-2 mt-1 block w-1/5 font-medium text-gray-700">
                Ngày kết thúc
              </label>
              <div className="flex w-4/5 flex-col">
                {/* <input
                  type="date"
                  {...register("end_date", {
                    required: "Ngày kết thúc bắt buộc chọn",
                  })}
                  className="w-full rounded border p-2"
                />
                {errors.end_date && (
                  <span className="mt-1 text-sm font-bold text-red-500">
                    {errors.end_date.message}
                  </span>
                )} */}
                <DatePickerComponent onDateChange={handleEndDateChange} placeholder={'Chọn ngày kết thúc năm học'} />
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
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
    </div>
  );
};

export default Addyear;
