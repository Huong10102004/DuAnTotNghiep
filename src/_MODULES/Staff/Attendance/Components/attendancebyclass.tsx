import React from "react";

const Attendancebyclass = () => {
  return (
    <div className="flex flex-row">
      <div className="w-[100%]">
        {/* <div className="mb-[40px] h-[110px] w-full bg-[#0078FF]">
      <ul className="flex h-full w-full items-center justify-around">
        {navs.map((nav, index) => (
          <li
            className="flex flex-col items-center justify-center p-[20px]"
            key={nav}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="size-10 pb-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
              />
            </svg>
            <span className="text-white">{nav}</span>
          </li>
        ))}
      </ul>
    </div> */}
        <div className="ml-4">
          <h1 className="text-3xl font-bold text-[#4154F1]">Điểm danh</h1>
          <div>
            <span className="text-[#989797]">Track / </span>
            <span className="text-[#989797]">Attendance / </span>
            <span>Attendance sheet</span>
          </div>
          <button className="mt-2 bg-[#01A4FF] p-2 px-4 text-white">
            Quay lại
          </button>
          <div className="flex space-x-52">
            <div className="mt-2 flex space-x-3">
              <p>
                Số lượng học sinh :
                <span className="font-bold text-[#01A4FF]"> 48 học sinh |</span>
              </p>
              <p>
                Số học sinh vắng mặt :
                <span className="font-bold text-[#EE1C1C]"> 0 học sinh |</span>
              </p>
              <p>
                Số học sinh có mặt :{" "}
                <span className="font-bold text-[#00CB58]"> 48 học sinh</span>
              </p>
            </div>
            <div className="mt-2 flex space-x-4">
              <button className="h-10 rounded-lg bg-[#F3F6F9] px-60 pl-4 text-left text-[#A0AEC0]">
                Tìm Kiếm
              </button>
            </div>
          </div>
          <div className="mt-2 overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="border border-gray-300 p-2">STT</th>
                  <th className="border border-gray-300 p-2">Họ và tên</th>
                  <th className="border border-gray-300 p-2">Ngày ngày sinh</th>
                  <th className="border border-gray-300 p-2">Ghi chú</th>
                  <th className="border border-gray-300 p-2">Có mặt</th>
                  <th className="border border-gray-300 p-2">Nghỉ có phép</th>
                  <th className="border border-gray-300 p-2">
                    Nghỉ không phép
                  </th>
                  <th className="border border-gray-300 p-2">
                    Đến muộn có phép
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1 */}
                <tr className="bg-white text-center">
                  <td className="border border-gray-300 p-2">1</td>
                  <td className="border border-gray-300 p-2">
                    <div>Phan Hường</div>
                  </td>
                  <td className="border border-gray-300 p-2">9/9/2024</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Ghi chú học sinh ..."
                      className="border border-black text-[#989797]"
                    />
                  </td>
                  <td className="border p-2">
                    <span className="inline-block h-4 w-4 rounded-full bg-blue-500"></span>
                  </td>
                  <td className="border p-2">
                    <span className="!important inline-block h-4 w-4 rounded-full border !border-green-500"></span>
                  </td>
                  <td className="border p-2">
                    <span className="inline-block h-4 w-4 rounded-full border !border-red-600"></span>
                  </td>
                  <td className="border p-2">
                    <span className="inline-block h-4 w-4 rounded-full border !border-yellow-500"></span>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="bg-white text-center">
                  <td className="border border-gray-300 p-2">1</td>
                  <td className="border border-gray-300 p-2">
                    <div>Phan Hường</div>
                  </td>
                  <td className="border border-gray-300 p-2">9/9/2024</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Ghi chú học sinh ..."
                      className="border border-black text-[#989797]"
                    />
                  </td>
                  <td className="border p-2">
                    <span className="inline-block h-4 w-4 rounded-full bg-blue-500"></span>
                  </td>
                  <td className="border p-2">
                    <span className="!important inline-block h-4 w-4 rounded-full border !border-green-500"></span>
                  </td>
                  <td className="border p-2">
                    <span className="inline-block h-4 w-4 rounded-full border !border-red-600"></span>
                  </td>
                  <td className="border p-2">
                    <span className="inline-block h-4 w-4 rounded-full border !border-yellow-500"></span>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="bg-white text-center">
                  <td className="border border-gray-300 p-2">1</td>
                  <td className="border border-gray-300 p-2">
                    <div>Phan Hường</div>
                  </td>
                  <td className="border border-gray-300 p-2">9/9/2024</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Ghi chú học sinh ..."
                      className="border border-black text-[#989797]"
                    />
                  </td>
                  <td className="border p-2">
                    <span className="inline-block h-4 w-4 rounded-full bg-blue-500"></span>
                  </td>
                  <td className="border p-2">
                    <span className="!important inline-block h-4 w-4 rounded-full border !border-green-500"></span>
                  </td>
                  <td className="border p-2">
                    <span className="inline-block h-4 w-4 rounded-full border !border-red-600"></span>
                  </td>
                  <td className="border p-2">
                    <span className="inline-block h-4 w-4 rounded-full border !border-yellow-500"></span>
                  </td>
                </tr>

                {/* Row 4 */}
                <tr className="bg-white text-center">
                  <td className="border border-gray-300 p-2">1</td>
                  <td className="border border-gray-300 p-2">
                    <div>Phan Hường</div>
                  </td>
                  <td className="border border-gray-300 p-2">9/9/2024</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Ghi chú học sinh ..."
                      className="border border-black text-[#989797]"
                    />
                  </td>
                  <td className="border p-2">
                    <span className="inline-block h-4 w-4 rounded-full bg-blue-500"></span>
                  </td>
                  <td className="border p-2">
                    <span className="!important inline-block h-4 w-4 rounded-full border !border-green-500"></span>
                  </td>
                  <td className="border p-2">
                    <span className="inline-block h-4 w-4 rounded-full border !border-red-600"></span>
                  </td>
                  <td className="border p-2">
                    <span className="inline-block h-4 w-4 rounded-full border !border-yellow-500"></span>
                  </td>
                </tr>

                {/* Row 5 */}
                <tr className="bg-white text-center">
                  <td className="border border-gray-300 p-2">1</td>
                  <td className="border border-gray-300 p-2">
                    <div>Phan Hường</div>
                  </td>
                  <td className="border border-gray-300 p-2">9/9/2024</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Ghi chú học sinh ..."
                      className="border border-black text-[#989797]"
                    />
                  </td>
                  <td className="border p-2">
                    <span className="inline-block h-4 w-4 rounded-full bg-blue-500"></span>
                  </td>
                  <td className="border p-2">
                    <span className="!important inline-block h-4 w-4 rounded-full border !border-green-500"></span>
                  </td>
                  <td className="border p-2">
                    <span className="inline-block h-4 w-4 rounded-full border !border-red-600"></span>
                  </td>
                  <td className="border p-2">
                    <span className="inline-block h-4 w-4 rounded-full border !border-yellow-500"></span>
                  </td>
                </tr>

                {/* Row 6 */}
                <tr className="bg-white text-center">
                  <td className="border border-gray-300 p-2">1</td>
                  <td className="border border-gray-300 p-2">
                    <div>Phan Hường</div>
                  </td>
                  <td className="border border-gray-300 p-2">9/9/2024</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Ghi chú học sinh ..."
                      className="border border-black text-[#989797]"
                    />
                  </td>
                  <td className="border p-2">
                    <span className="inline-block h-4 w-4 rounded-full bg-blue-500"></span>
                  </td>
                  <td className="border p-2">
                    <span className="!important inline-block h-4 w-4 rounded-full border !border-green-500"></span>
                  </td>
                  <td className="border p-2">
                    <span className="inline-block h-4 w-4 rounded-full border !border-red-600"></span>
                  </td>
                  <td className="border p-2">
                    <span className="inline-block h-4 w-4 rounded-full border !border-yellow-500"></span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-end">
              <button className="mt-4 rounded-lg bg-green-500 p-2 px-4 text-white">
                Lưu
              </button>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex justify-end">
              <div className="flex items-center space-x-1">
                <button className="rounded bg-gray-300 p-2 hover:bg-gray-400">
                  «
                </button>
                <button className="rounded bg-blue-500 p-2 text-white">
                  1
                </button>
                <button className="rounded bg-gray-300 p-2 hover:bg-gray-400">
                  2
                </button>
                <button className="rounded bg-gray-300 p-2 hover:bg-gray-400">
                  3
                </button>
                <button className="rounded bg-gray-300 p-2 hover:bg-gray-400">
                  4
                </button>
                <button className="rounded bg-gray-300 p-2 hover:bg-gray-400">
                  5
                </button>
                <button className="rounded bg-gray-300 p-2 hover:bg-gray-400">
                  »
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendancebyclass;
