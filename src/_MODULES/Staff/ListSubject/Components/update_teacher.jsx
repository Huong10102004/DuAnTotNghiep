import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import NotificationCustom from "../../../../_Shared/Components/Notification-custom/Notification-custom";
import { ACCESS_TYPE_ENUM } from "../../../../_Shared/Enum/access-type.enum";
import Loading from "../../../../_Shared/Components/Loading/Loading";
import { ApiService } from "../../../../Services/ApiService";
import { formatTimestamp } from "../../../../_Shared/Pipe/Format-timestamp";
import { useTranslation } from "react-i18next";
import { GENDER_ENUM } from "../../../../_Shared/Enum/gender.enum";

const Update_teacher = ({ isOpen, onClose, teacher, reloadApi }) => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(null);
  const [notification, setNotification] = useState({ type: '', message: '' });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true)
    const formData = {
      ...data,
      userGender: Number(data.gender),
      userStatus: Number(data.userStatus)
    };
    try {
      const response = await ApiService(`manager/user/edit/${teacher?.userId}123123`, 'post', formData);

      if (response) {
        await reloadApi();
        onClose();
      } 
    } catch (error) {
      setLoading(false);
      setNotification({ type: 'error', message: t('teacherUpdate.error'),title: t('error') });
    }
  };

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ type: '', message: '', title: '' }); // Ẩn thông báo sau 3 giây
      }, 3000);

      return () => clearTimeout(timer); 
    }
  }, [notification]);  

  // const getClassNoMainTeacher = async () => {
  //   setLoading(true);
  //   try {
  //     const schoolYearId = localStorage.getItem('schoolYearCurrent')
  //     const responseData = await ApiService(`manager/user/chooseClassToMainTearch?schoolYearId=${schoolYearId}`, 'GET');
  //     setDataClassNoMainTeacher(Array.isArray(responseData.data) ? responseData.data : []);
  //   } catch (error) {
  //     setLoading(true);
  //     setNotification({ type: 'error', message: 'Có lỗi liên quan đến hệ thống',title: 'Lỗi' });
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   getClassNoMainTeacher();
  // },[])

  useEffect(() => {
    setValue("userName", teacher.userName || ''); 
    setValue("userUserName", teacher.userUserName || ''); 
    setValue("userEmail", teacher.userEmail || ''); 
    setValue("userPhone", teacher.userPhone || ''); 
    setValue("classId", teacher.classId || ''); 
    setValue("userAccessType", teacher.userAccessType || ''); 
    setValue("userStatus", teacher.userStatus || ''); 
    setValue("userDob", formatTimestamp(teacher.userDob, 'yyyy-MM-dd') || ''); 
    setValue("address", teacher.address || ''); 
    setValue("gender", teacher.gender || '');
  }, [teacher])

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <Loading isLoading={loading} />
      <div className="relative w-[70%] rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-2 text-center text-xl font-bold">{t('teacherUpdate.editTeacher')}</h2>
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
              {t('teacherUpdate.teacherName')}
              </label>
              <div className="flex w-4/5 flex-col">
                <input
                  type="text"
                  {...register("userName", {
                    required: t('teacherUpdate.teacherNameRequired'),
                  })}
                  className="w-full rounded border p-2"
                  placeholder={t('teacherUpdate.teacherNamePlaceholder')}
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
              {t('teacherUpdate.userName')}
              </label>
              <div className="flex w-4/5 flex-col">
                <input
                  type="text"
                  {...register("userUserName", {
                    required: t('teacherUpdate.userNameRequired'),
                  })}
                  className="w-full rounded border p-2"
                  placeholder={t('teacherUpdate.userNamePlaceholder')}
                  disabled
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
                    required: t('teacherUpdate.emailRequired'),
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: t('teacherUpdate.emailInValid'),
                    },
                  })}
                  className="w-full rounded border p-2"
                  placeholder={t('teacherUpdate.emailPlaceholder')}
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
                {t('teacherUpdate.phone')}
              </label>
              <div className="flex w-4/5 flex-col">
                <input
                  type="text"
                  {...register("userPhone", {
                    required: t('teacherUpdate.phoneRequired'),
                  })}
                  className="w-full rounded border p-2"
                  placeholder={t('teacherUpdate.phonePlaceholder')}
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
                {t('teacherUpdate.teacherRole')}
              </label>
              <div className="flex w-4/5 flex-col">
                <select
                  {...register("userAccessType", {
                    required: t('teacherUpdate.teacherRoleRequired'),
                  })}
                  className="w-full rounded border p-2"
                >
                  <option value="">{t('teacherUpdate.teacherRoleChoose')}</option>
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
            {/* <div className="mb-4 flex">
              <label className="mb-1 mr-2 mt-1 block w-1/5 font-medium text-gray-700">
                Chủ nhiệm
              </label>
              <div className="flex w-4/5 flex-col">
                <select
                  name="classId"
                  id="lop"
                  className="w-full rounded border p-2"
                  value={teacher?.userMainClassId}
                  {...register("userAccessType")}
                >
                  <option value="" className="border-b-4 border-black">
                    Chọn lớp chủ nhiệm
                  </option>
                  {dataClassNoMainTeacher.map(item => (
                  <option value={item.classId} key={item.classId} className="border-b-4 border-black bg-zinc-300">{item.className}</option>
                  ))}
                </select>

              </div>
            </div> */}

            {/* Địa chỉ */}
            <div className="mb-4 flex">
              <label className="mb-1 mr-2 mt-1 block w-1/5 font-medium text-gray-700">
                {t('teacherUpdate.teacherAddress')}
              </label>
              <div className="flex w-4/5 flex-col">
                <input
                  type="text"
                  {...register("address")}
                  className="w-full rounded border p-2"
                  placeholder={t('teacherUpdate.teacherAddressPlaceholder')}
                />
              </div>
            </div>

            {/* Ngày sinh */}
            <div className="mb-4 flex">
              <label className="mb-1 mr-2 mt-1 block w-1/5 font-medium text-gray-700">
                {t('teacherUpdate.teacherDob')}
              </label>
              <div className="flex w-4/5 flex-col">
                <input
                  type="date"
                  {...register("userDob")}
                  className="w-full rounded border p-2"
                />
              </div>
            </div>

              {/* gender */}
              <div className="mb-4 flex">
              <label className="mb-1 mr-2 mt-1 block w-1/5 font-medium text-gray-700">
              {t('teacherUpdate.teacherGender')}
              </label>
              <div className="flex w-4/5 flex-col">
                <select
                  className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
                  {...register("gender")}
                >
                  <option value="">{t('teacherUpdate.teacherGenderChoose')}</option>
                  <option value={GENDER_ENUM.NAM}>{GENDER_ENUM.NAM_LABEL}</option>
                  <option value={GENDER_ENUM.WOMAN}>{GENDER_ENUM.WOMAN_LABEL}</option>
                </select>
                {errors.gender && (
                  <span className="mt-1 text-sm font-bold text-red-500">
                    {errors.gender.message}
                  </span>
                )}
              </div>
            </div>

            {/* Hoạt động */}

            <div className="mb-4 flex items-center">
              <label className="mb-1 mr-2 mt-1 block w-1/5 font-medium text-gray-700">
                {t('active')}
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
              {t('close')}
            </button>

            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
            >
              {t('update')}
            </button>
          </div>
        </form>
      </div>
      {notification.message && <NotificationCustom type={notification.type} message={notification.message} title={notification.title} />}
    </div>
  );
};

export default Update_teacher;
