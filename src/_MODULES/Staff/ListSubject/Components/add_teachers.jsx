import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Loading from "../../../../_Shared/Components/Loading/Loading";
import { ApiService } from "../../../../Services/ApiService";
import NotifcationComponent from "../../../../_Shared/Components/Notifcation/Notification";
import NotificationCustom from "../../../../_Shared/Components/Notification-custom/Notification-custom";

const Addteacher = ({ isOpen, onClose, reloadApi }) => {
  const [loading, setLoading] = useState(null);
  const [statusCode, setStatusCode] = useState(null);  // Lưu mã trạng thái
  const [notification, setNotification] = useState({ type: '', message: '' });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true)
    const formData = {
      ...data,
      userStatus: Number(data.userStatus)
    };

    try {
      // Gọi API thêm dữ liệu
      const response = await ApiService('manager/user/add', 'post', formData);

      // Nếu thành công
      if (response) {
        await reloadApi();
        reset();
        onClose();
      } else {
      }
    } catch (error) {
      setNotification({ type: 'error', message: 'Gán học sinh vào lớp không thành công',title: 'Lỗi xảy ra' });
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
  }, [notification]);  // Mỗi khi statusCode thay đổi, đoạn này sẽ chạy

  const onClickClose = () => {
    reset();
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <Loading isLoading={loading} />
      <div className="relative w-[70%] rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-2 text-center text-xl font-bold">Thêm nhân viên</h2>
        <hr className="mb-4" />
        <button
          className="absolute right-4 top-4 text-gray-600 hover:text-red-600"
          onClick={onClickClose}
        >
          &times;
        </button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-6">
            {/* Tên nhân viên */}
            <div className="mb-4 flex">
              <label className="mb-1 mr-2 mt-1 block w-1/5 font-medium text-gray-700">
                Tên nhân viên
              </label>
              <div className="flex w-4/5 flex-col">
                <input
                  type="text"
                  {...register("userName", {
                    required: "Tên của nhân viên bắt buộc nhập",
                  })}
                  className="w-full rounded border p-2"
                  placeholder="Nhập tên nhân viên"
                />
                {errors.userName && (
                  <span className="mt-1 text-sm font-bold text-red-500">
                    {errors.userName.message}
                  </span>
                )}
              </div>
            </div>

             {/* username */}
             <div className="mb-4 flex">
              <label className="mb-1 mr-2 mt-1 block w-1/5 font-medium text-gray-700">
                Username
              </label>
              <div className="flex w-4/5 flex-col">
                <input
                  type="text"
                  {...register("userUsername", {
                    required: "Username bắt buộc nhập",
                  })}
                  className="w-full rounded border p-2"
                  placeholder="Nhập userName"
                />
                {errors.userUserName && (
                  <span className="mt-1 text-sm font-bold text-red-500">
                    {errors.userUserName.message}
                  </span>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="mb-4 flex">
              <label className="mb-1 mr-2 mt-1 block w-1/5 font-medium text-gray-700">
                Email
              </label>
              <div className="flex w-4/5 flex-col">
                <input
                  type="text"
                  {...register("userEmail", {
                    required: "Email của nhân viên bắt buộc nhập",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Email không hợp lệ",
                    },
                  })}
                  className="w-full rounded border p-2"
                  placeholder="Nhập email"
                />
                {errors.userEmail && (
                  <span className="mt-1 text-sm font-bold text-red-500">
                    {errors.userEmail.message}
                  </span>
                )}
              </div>
            </div>

            {/* Số điện thoại */}
            <div className="mb-4 flex">
              <label className="mb-1 mr-2 mt-1 block w-1/5 font-medium text-gray-700">
                Số điện thoại
              </label>
              <div className="flex w-4/5 flex-col">
                <input
                  type="text"
                  {...register("userPhone", {
                    required: "Số điện thoại của nhân viên bắt buộc nhập",
                  })}
                  className="w-full rounded border p-2"
                  placeholder="Nhập số điện thoại"
                />
                {errors.userPhone && (
                  <span className="mt-1 text-sm font-bold text-red-500">
                    {errors.userPhone.message}
                  </span>
                )}
              </div>
            </div>

            {/* Chức vụ */}
            <div className="mb-4 flex">
              <label className="mb-1 mr-2 mt-1 block w-1/5 font-medium text-gray-700">
                Chức vụ
              </label>
              <div className="flex w-4/5 flex-col">
                <select
                  {...register("userAccessType", {
                    required: "Chức vụ của nhân viên bắt buộc nhập",
                  })}
                  className="w-full rounded border p-2"
                >
                  <option value="">Chọn chức vụ</option>
                  <option value="1">Giáo viên</option>
                  <option value="2">Quản lý</option>
                </select>
                {errors.userAccessType && (
                  <span className="mt-1 text-sm font-bold text-red-500">
                    {errors.userAccessType.message}
                  </span>
                )}
              </div>
            </div>

            {/* Mật khẩu */}
            <div className="mb-4 flex">
              <label className="mb-1 mr-2 mt-1 block w-1/5 font-medium text-gray-700">
                Mật khẩu
              </label>
              <div className="flex w-4/5 flex-col">
                <input
                  type="password"
                  {...register("userPassword", {
                    required: "Mật khẩu của nhân viên bắt buộc nhập",
                  })}
                  className="w-full rounded border p-2"
                  placeholder="Nhập mật khẩu"
                />
                {errors.userPassword && (
                  <span className="mt-1 text-sm font-bold text-red-500">
                    {errors.userPassword.message}
                  </span>
                )}
              </div>
            </div>

            {/* Xác nhận mật khẩu */}
            <div className="mb-4 flex">
              <label className="mb-1 mr-2 mt-1 block w-1/5 font-medium text-gray-700">
                Xác nhận
              </label>
              <div className="flex w-4/5 flex-col">
                <input
                  type="password"
                  {...register("userConfirmPassword", {
                    required: "Xác nhận mật khẩu của nhân viên bắt buộc nhập",
                  })}
                  className="w-full rounded border p-2"
                  placeholder="Xác nhận mật khẩu"
                />
                {errors.userConfirmPassword && (
                  <span className="mt-1 text-sm font-bold text-red-500">
                    {errors.userConfirmPassword.message}
                  </span>
                )}
              </div>
            </div>

            {/* Chủ nhiệm */}
            <div className="mb-4 flex">
              <label className="mb-1 mr-2 mt-1 block w-1/5 font-medium text-gray-700">
                Chủ nhiệm
              </label>
              <div className="flex w-4/5 flex-col">
                <select
                  name="classId"
                  id="lop"
                  className="w-full rounded border p-2"
                >
                  <option value="" className="border-b-4 border-black">
                    Chọn lớp chủ nhiệm
                  </option>
                  <option
                    value="1"
                    className="border-b-4 border-black bg-zinc-300"
                  >
                    6A1
                  </option>
                  <option
                    value="2"
                    className="border-b-4 border-black bg-zinc-300"
                  >
                    6A2
                  </option>
                  <option
                    value="3"
                    className="border-b-4 border-black bg-zinc-300"
                  >
                    6A3
                  </option>
                  <option
                    value="4"
                    className="border-b-4 border-black bg-zinc-300"
                  >
                    7A1
                  </option>
                  <option
                    value="5"
                    className="border-b-4 border-black bg-zinc-300"
                  >
                    7A2
                  </option>
                  <option
                    value="6"
                    className="border-b-4 border-black bg-zinc-300"
                  >
                    7A3
                  </option>
                </select>

                {/* <input
                  type="text"
                  {...register("chuNhiem")}
                  className="w-full rounded border p-2"
                  placeholder="Nhập lớp chủ nhiệm"
                /> */}
              </div>
            </div>

            {/* Địa chỉ */}
            <div className="mb-4 flex">
              <label className="mb-1 mr-2 mt-1 block w-1/5 font-medium text-gray-700">
                Địa chỉ
              </label>
              <div className="flex w-4/5 flex-col">
                <input
                  type="text"
                  {...register("userAddress")}
                  className="w-full rounded border p-2"
                  placeholder="Nhập địa chỉ"
                />
              </div>
            </div>

            {/* Ngày sinh */}
            <div className="mb-4 flex">
              <label className="mb-1 mr-2 mt-1 block w-1/5 font-medium text-gray-700">
                Ngày sinh
              </label>
              <div className="flex w-4/5 flex-col">
                <input
                  type="date"
                  {...register("userDob", {
                  })}
                  className="w-full rounded border p-2"
                />
              </div>
            </div>

              {/* gender */}
              <div className="mb-4 flex">
              <label className="mb-1 mr-2 mt-1 block w-1/5 font-medium text-gray-700">
                Giới tính
              </label>
              <div className="flex w-4/5 flex-col">
                <select
                  className={`form-control ${errors.userGender ? 'is-invalid' : ''}`}
                  {...register("userGender", { required: "Giới tính bắt buộc chọn" })}
                >
                  <option value="">Chọn giới tính</option>
                  <option value="1">Nam</option>
                  <option value="2">Nữ</option>
                </select>
                {errors.userGender && (
                  <span className="mt-1 text-sm font-bold text-red-500">
                    {errors.userGender.message}
                  </span>
                )}
              </div>
            </div>

            {/* Hoạt động */}

            <div className="mb-4 flex items-center">
              <label className="mb-1 mr-2 mt-1 block w-1/5 font-medium text-gray-700">
                Hoạt động
              </label>
              <input
                type="checkbox"
                className="mr-2"
                {...register("userStatus")}
              />
            </div>
          </div>
          <hr className="mb-4" />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="rounded bg-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-400"
              onClick={onClickClose}
            >
              Đóng
            </button>

            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
            >
              Thêm
            </button>
          </div>
        </form>
      </div>
      {notification.message && <NotificationCustom type={notification.type} message={notification.message} title={notification.title} />}
    </div>
  );
};

export default Addteacher;
