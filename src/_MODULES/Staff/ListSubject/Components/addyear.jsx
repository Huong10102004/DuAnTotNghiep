import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PaginationAntd from "../../../../_Shared/Components/Pagination/Pagination";
import { getListClassToAttendance } from "../../../../Services/Attendance/attendance";

const Addyear = ({ isOpen, onClose }) => {
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
        <h2 className="mb-2 text-center text-xl font-bold">Thêm niên khóa</h2>
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
                Tên niên khóa
              </label>
              <div className="flex w-4/5 flex-col">
                <input
                  type="text"
                  {...register("tenNhanVien", {
                    required: "Tên của niên khóa bắt buộc nhập",
                  })}
                  className="w-full rounded border p-2"
                  placeholder="Nhập tên niên khóa"
                />
                {errors.tenNhanVien && (
                  <span className="mt-1 text-sm font-bold text-red-500">
                    {errors.tenNhanVien.message}
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
                  {...register("chucVu", {
                    required: "Trạng thái bắt buộc phải chọn",
                  })}
                  className="w-full rounded border p-2"
                >
                  <option value="">Chọn Trạng thái</option>
                  <option value="teacher">Đang diễn ra</option>
                  <option value="manager">Đã kết thúc</option>
                </select>
                {errors.chucVu && (
                  <span className="mt-1 text-sm font-bold text-red-500">
                    {errors.chucVu.message}
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
                <input
                  type="date"
                  {...register("ngaySinh", {
                    required: "Ngày bắt đầu bắt buộc chọn",
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

            <div className="mb-4 flex">
              <label className="mb-1 mr-2 mt-1 block w-1/5 font-medium text-gray-700">
                Ngày kết thúc
              </label>
              <div className="flex w-4/5 flex-col">
                <input
                  type="date"
                  {...register("ngaySinh", {
                    required: "Ngày kết thúc bắt buộc chọn",
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

export default Addyear;
