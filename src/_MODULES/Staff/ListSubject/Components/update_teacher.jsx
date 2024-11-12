import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import PaginationAntd from "../../../../_Shared/Components/Pagination/Pagination";
import { getListClassToAttendance } from "../../../../Services/Attendance/attendance";

const Update_teacher = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
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
                  {...register("tenNhanVien", {
                    required: "Tên của nhân viên bắt buộc nhập",
                  })}
                  className="w-full rounded border p-2"
                  placeholder="Nhập tên nhân viên"
                />
                {errors.tenNhanVien && (
                  <span className="mt-1 text-sm font-bold text-red-500">
                    {errors.tenNhanVien.message}
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
                  type="email"
                  {...register("email", {
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
                {errors.email && (
                  <span className="mt-1 text-sm font-bold text-red-500">
                    {errors.email.message}
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
                  {...register("soDienThoai", {
                    required: "Số điện thoại của nhân viên bắt buộc nhập",
                  })}
                  className="w-full rounded border p-2"
                  placeholder="Nhập số điện thoại"
                />
                {errors.soDienThoai && (
                  <span className="mt-1 text-sm font-bold text-red-500">
                    {errors.soDienThoai.message}
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
                  {...register("chucVu", {
                    required: "Chức vụ của nhân viên bắt buộc nhập",
                  })}
                  className="w-full rounded border p-2"
                >
                  <option value="">Chọn chức vụ</option>
                  <option value="teacher">Giáo viên</option>
                  <option value="manager">Quản lý</option>
                </select>
                {errors.chucVu && (
                  <span className="mt-1 text-sm font-bold text-red-500">
                    {errors.chucVu.message}
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
                  {...register("matKhau", {
                    required: "Mật khẩu của nhân viên bắt buộc nhập",
                  })}
                  className="w-full rounded border p-2"
                  placeholder="Nhập mật khẩu"
                />
                {errors.matKhau && (
                  <span className="mt-1 text-sm font-bold text-red-500">
                    {errors.matKhau.message}
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
                  {...register("xacNhanMatKhau", {
                    required: "Xác nhận mật khẩu của nhân viên bắt buộc nhập",
                  })}
                  className="w-full rounded border p-2"
                  placeholder="Xác nhận mật khẩu"
                />
                {errors.xacNhanMatKhau && (
                  <span className="mt-1 text-sm font-bold text-red-500">
                    {errors.xacNhanMatKhau.message}
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
                  name="lop"
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
                  {...register("diaChi")}
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
                  {...register("ngaySinh", {
                    required: "Ngày sinh là bắt buộc",
                  })}
                  className="w-full rounded border p-2"
                />
                {errors.ngaySinh && (
                  <span className="mt-1 text-sm font-bold text-red-500">
                    {errors.ngaySinh.message}
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
                {...register("hoatDong")}
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
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update_teacher;
