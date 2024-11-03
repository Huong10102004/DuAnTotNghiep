import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import NotificationCustom from "../../../../_Shared/Components/Notification-custom/Notification-custom";
import { ACCESS_TYPE_ENUM } from "../../../../_Shared/Enum/access-type.enum";
import Loading from "../../../../_Shared/Components/Loading/Loading";
import { ApiService } from "../../../../Services/ApiService";

const Update_teacher = ({ isOpen, onClose, teacher }) => {
  const [loading, setLoading] = useState(null);
  const [notification, setNotification] = useState({ type: '', message: '' });
  const [dataClassNoMainTeacher, setDataClassNoMainTeacher] = useState([]);
  const [userId, setUserId] = useState(''); // Controlled input cho tên năm học
  // const [userName, setUserName] = useState(''); // Controlled input cho tên năm học
  // const [userEMail, setUserEMail] = useState(''); // Controlled input cho trạng thái
  // const [userPhone, setuserPhone] = useState(''); // Controlled input cho trạng thái
  // const [classId, setclassId] = useState(''); // Controlled input cho trạng thái
  // const [userAccessType, setUserAccessType] = useState(''); // Controlled input cho trạng thái
  // const [userStatus, setUserStatus] = useState(''); // Controlled input cho trạng thái
  // const [userDob, setUserDob] = useState(''); // Controlled input cho trạng thái
  // const [userAddress, setUserAddress] = useState(''); // Controlled input cho trạng thái
  // const [userGender, setUserGender] = useState(''); // Controlled input cho trạng thái
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    onClose();
  };
  console.log(teacher)

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ type: '', message: '', title: '' }); // Ẩn thông báo sau 3 giây
      }, 3000);

      return () => clearTimeout(timer); // Xóa bộ hẹn giờ khi component bị unmount hoặc message thay đổi
    }
  }, [notification]);  // Mỗi khi statusCode thay đổi, đoạn này sẽ chạy

  const getClassNoMainTeacher = async () => {
    setLoading(true);
    try {
      const schoolYearId = localStorage.getItem('schoolYearCurrent')
      const responseData = await ApiService(`manager/user/chooseClassToMainTearch?schoolYearId=${schoolYearId}`, 'GET');
      console.log(responseData);
      setDataClassNoMainTeacher(Array.isArray(responseData.data) ? responseData.data : []);
    } catch (error) {
      setLoading(true);
      setNotification({ type: 'error', message: 'Có lỗi liên quan đến hệ thống',title: 'Lỗi' });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getClassNoMainTeacher();
  },[])

  useEffect(() => {
    console.log(teacher);
    setValue("userName", teacher.userName || ''); 
    setValue("userUserName", teacher.userUserName || ''); 
    setValue("userEmail", teacher.userEmail || ''); 
    setValue("userPhone", teacher.userPhone || ''); 
    setValue("classId", teacher.classId || ''); 
    setValue("userAccessType", teacher.userAccessType || ''); 
    setValue("userStatus", teacher.userStatus || ''); 
    setValue("userDob", teacher.userDob || ''); 
    setValue("userAddress", teacher.userAddress || ''); 
    setValue("userGender", teacher.userGender || ''); 
    setUserId(teacher.userId)
  }, [teacher])

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <Loading isLoading={loading} />
      <div className="relative w-[70%] rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-2 text-center text-xl font-bold">sửa nhân viên</h2>
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
                  <option value={ACCESS_TYPE_ENUM.MANAGER}>{ACCESS_TYPE_ENUM.MANAGER_LABEL}</option>
                  <option value={ACCESS_TYPE_ENUM.TEACHER}>{ACCESS_TYPE_ENUM.TEACHER_LABEL}</option>
                  <option value={ACCESS_TYPE_ENUM.GUARDIAN}>{ACCESS_TYPE_ENUM.GUARDIAN_LABEL}</option>
                </select>
                {errors.userAccessType && (
                  <span className="mt-1 text-sm font-bold text-red-500">
                    {errors.userAccessType.message}
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
                  {dataClassNoMainTeacher.map(item => (
                  <option value={item.classId} key={item.classId} className="border-b-4 border-black bg-zinc-300">{item.className}</option>
                  ))}
                </select>

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
              onClick={onClose}
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

export default Update_teacher;
