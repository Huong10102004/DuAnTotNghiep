import React, { useState } from "react";

type Props = {};

const Parentaccount = (props: Props) => {
  const [activeItem, setActiveItem] = useState("accountInfo");
  const [isChildInfoOpen, setChildInfoOpen] = useState(false);
  return (
    <>
      
        

        {/* Nội dung chính */}
        <main className="flex-1 p-6">
          <h2 className="pb-[20px] text-2xl font-bold">Trang tài khoản</h2>
          <h2 className="text-md">Teack/Attendance/Attendance sheet</h2>

          <div className="contenttt flex">
            +
            <div className="flex flex-1 items-stretch gap-4 bg-gray-100 p-4">
              <div className="w-1/4 flex-none rounded-lg border-2 border-blue-300 bg-white p-4">
                <h2 className="mb-4 border-b-2 border-black pb-[14px] text-center text-[25px] font-bold">
                  Menu
                </h2>

                <div
                  className={`mb-2 p-3 text-center ${
                    activeItem === "accountInfo" ? "bg-blue-100" : "bg-gray-300"
                  } cursor-pointer`}
                  onClick={() => setActiveItem("accountInfo")}
                >
                  Thông tin tài khoản
                </div>

                <div className="relative">
                  <div
                    className={`mb-2 p-3 text-center ${
                      activeItem === "childInfo" ? "bg-blue-100" : "bg-gray-300"
                    } flex cursor-pointer items-center justify-between`}
                    onClick={() => {
                      setActiveItem("childInfo");
                      setChildInfoOpen(!isChildInfoOpen);
                    }}
                  >
                    <span>Thông tin con</span>
                    <span className="mr-2">{isChildInfoOpen ? "▲" : "▼"}</span>
                  </div>
                  {isChildInfoOpen && (
                    <div className="bg-gray-100 p-2">
                      <p className="text-center">Thông tin chi tiết của con</p>
                    </div>
                  )}
                </div>

                <div
                  className={`mb-2 p-3 text-center ${
                    activeItem === "changePassword"
                      ? "bg-blue-100"
                      : "bg-gray-300"
                  } cursor-pointer`}
                  onClick={() => setActiveItem("changePassword")}
                >
                  Đổi mật khẩu
                </div>
              </div>
              <div className="flex-1 rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-4 border-b-2 border-black pb-[14px] text-2xl font-bold">
                  Thông tin tài khoản
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      className="mt-1 w-full rounded border border-gray-300 p-2"
                      defaultValue="Nguyễn Hữu Thi Bảo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      className="mt-1 w-full rounded border border-gray-300 p-2"
                      defaultValue="baodegazi@gmail.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      className="mt-1 w-full rounded border border-gray-300 p-2"
                      defaultValue="0381232222"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Giới tính
                    </label>
                    <input
                      type="text"
                      className="mt-1 w-full rounded border border-gray-300 p-2"
                      defaultValue="Nam"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Ngày sinh *
                    </label>
                    <input
                      type="date"
                      className="mt-1 w-full rounded border border-gray-300 p-2"
                      defaultValue="2004-12-08"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nghề nghiệp
                    </label>
                    <input
                      type="text"
                      className="mt-1 w-full rounded border border-gray-300 p-2"
                      defaultValue="Lập trình viên"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Địa chỉ *
                    </label>
                    <input
                      type="text"
                      className="mt-1 w-full rounded border border-gray-300 p-2"
                      defaultValue="Số 123 Láng Hạ"
                    />
                  </div>
                </div>
                <div className="mt-4 border-b-2 border-black pb-[20px]">
                  <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                    Lưu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      
    </>
  );
};

export default Parentaccount;
