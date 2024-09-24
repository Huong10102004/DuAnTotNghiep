import { Pagination } from "antd";
import React from "react";
import PaginationAntd from "../../../../_Shared/Components/Pagination/Pagination";

const Attendance = () => {
  const navs: string[] = [
    "Timetable",
    "Thống kê báo cáo",
    "Quan Ly Hoc Tap",
    "Hoc sinh",
    "Quan Ly Thong Tin",
  ];
  return (
    <div>
      {/* <header className="h-[100px] w-full"></header> */}
      <div className="flex flex-row pt-6rem bg-white h-100vh">
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
          <div className="mx-4">
            <h1 className="text-3xl font-bold text-[#4154F1]">Điểm danh</h1>
            <div>
              <span className="text-[#989797]">Track / </span>
              <span className="text-[#989797]">Attendance / </span>
              <span>Attendance sheet</span>
            </div>
            <div className="flex space-x-96">
              <div className="mt-2 flex space-x-3">
                <p>
                  Số lớp đã điểm danh:{" "}
                  <span className="text-[#00CB58]"> 08 lớp</span>
                </p>
                <p>
                  Số lớp chưa điểm danh:
                  <span className="text-[#EE1C1C]"> 01 lớp</span>
                </p>
              </div>
              <div className="flex space-x-4">
                <select
                  name="day"
                  className="rounded-lg border border-gray-300 p-2"
                >
                  <option
                    value=""
                    disabled
                    selected
                    style={{ color: "#A0AEC0" }}
                  >
                    Ngày
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <select
                  name="day"
                  className="rounded-lg border border-gray-300 p-2"
                >
                  <option
                    value=""
                    disabled
                    selected
                    style={{ color: "#A0AEC0" }}
                  >
                    Lọc
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="h-10 rounded-lg bg-[#F3F6F9] px-60 pl-4 text-left text-[#A0AEC0]">
                  Tìm Kiếm
                </button>
              </div>
            </div>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-blue-500 text-white">
                    <th className="border border-gray-300 p-2">STT</th>
                    <th className="border border-gray-300 p-2">
                      Thông tin lớp
                    </th>
                    <th className="border border-gray-300 p-2">
                      Ngày điểm danh
                    </th>
                    <th className="border border-gray-300 p-2">
                      Giáo viên chủ nhiệm
                    </th>
                    <th className="border border-gray-300 p-2">Trạng thái</th>
                    <th className="border border-gray-300 p-2">Có mặt</th>
                    <th className="border border-gray-300 p-2">Điểm danh</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Row 1 */}
                  <tr className="bg-white text-center">
                    <td className="border border-gray-300 p-2">1</td>
                    <td className="border border-gray-300 p-2">
                      <div>Tên lớp: 6A13</div>
                      <div>Khối: 6</div>
                      <div>Số lượng học sinh: 48</div>
                    </td>
                    <td className="border border-gray-300 p-2">
                      Thứ 2, Ngày 9/9/2024
                    </td>
                    <td className="border border-gray-300 p-2">
                      Nguyễn Duy Kiên
                      <br />
                      <span className="text-gray-500">ndkdzl@gmail.com</span>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <span className="font-bold text-green-600">
                        Đã điểm danh
                      </span>
                      <br />
                      Bởi: Nguyễn Duy Khánh
                    </td>
                    <td className="border border-gray-300 p-2">48 / 50</td>
                    <td className="border border-gray-300 p-2">
                      <button className="rounded bg-green-500 px-3 py-1 text-white">
                        Điểm danh
                      </button>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="bg-white text-center">
                    <td className="border border-gray-300 p-2">2</td>
                    <td className="border border-gray-300 p-2">
                      <div>Tên lớp: 7A13</div>
                      <div>Khối: 7</div>
                      <div>Số lượng học sinh: 48</div>
                    </td>
                    <td className="border border-gray-300 p-2">
                      Thứ 2, Ngày 9/9/2024
                    </td>
                    <td className="border border-gray-300 p-2">
                      Nguyễn Hữu Thế Bảo
                      <br />
                      <span className="text-gray-500">
                        baodepzai123@gmail.com
                      </span>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <span className="font-bold text-red-600">
                        Chưa điểm danh
                      </span>
                    </td>
                    <td className="border border-gray-300 p-2">----</td>
                    <td className="border border-gray-300 p-2">
                      <button className="rounded bg-green-500 px-3 py-1 text-white">
                        Điểm danh
                      </button>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="bg-white text-center">
                    <td className="border border-gray-300 p-2">3</td>
                    <td className="border border-gray-300 p-2">
                      <div>Tên lớp: 7A13</div>
                      <div>Khối: 7</div>
                      <div>Số lượng học sinh: 48</div>
                    </td>
                    <td className="border border-gray-300 p-2">
                      Thứ 2, Ngày 9/9/2024
                    </td>
                    <td className="border border-gray-300 p-2">
                      Nguyễn Hữu Thế Bảo
                      <br />
                      <span className="text-gray-500">
                        baodepzai123@gmail.com
                      </span>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <span className="font-bold text-green-600">
                        Đã điểm danh
                      </span>
                      <br />
                      Bởi: Nguyễn Duy Khánh
                    </td>
                    <td className="border border-gray-300 p-2">30 / 48</td>
                    <td className="border border-gray-300 p-2">
                      <button className="rounded bg-green-500 px-3 py-1 text-white">
                        Điểm danh
                      </button>
                    </td>
                  </tr>

                  {/* Row 4 */}
                  <tr className="bg-white text-center">
                    <td className="border border-gray-300 p-2">4</td>
                    <td className="border border-gray-300 p-2">
                      <div>Tên lớp: 7A13</div>
                      <div>Khối: 7</div>
                      <div>Số lượng học sinh: 48</div>
                    </td>
                    <td className="border border-gray-300 p-2">
                      Thứ 2, Ngày 9/9/2024
                    </td>
                    <td className="border border-gray-300 p-2">
                      Nguyễn Hữu Thế Bảo
                      <br />
                      <span className="text-gray-500">
                        baodepzai123@gmail.com
                      </span>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <span className="font-bold text-red-600">
                        Chưa điểm danh
                      </span>
                    </td>
                    <td className="border border-gray-300 p-2">----</td>
                    <td className="border border-gray-300 p-2">
                      <button className="rounded bg-green-500 px-3 py-1 text-white">
                        Điểm danh
                      </button>
                    </td>
                  </tr>

                  {/* Row 5 */}
                  <tr className="bg-white text-center">
                    <td className="border border-gray-300 p-2">5</td>
                    <td className="border border-gray-300 p-2">
                      <div>Tên lớp: 7A13</div>
                      <div>Khối: 7</div>
                      <div>Số lượng học sinh: 48</div>
                    </td>
                    <td className="border border-gray-300 p-2">
                      Thứ 2, Ngày 9/9/2024
                    </td>
                    <td className="border border-gray-300 p-2">
                      Nguyễn Hữu Thế Bảo
                      <br />
                      <span className="text-gray-500">
                        baodepzai123@gmail.com
                      </span>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <span className="font-bold text-red-600">
                        Chưa điểm danh
                      </span>
                    </td>
                    <td className="border border-gray-300 p-2">----</td>
                    <td className="border border-gray-300 p-2">
                      <button className="rounded bg-green-500 px-3 py-1 text-white">
                        Điểm danh
                      </button>
                    </td>
                  </tr>

                  {/* Row 6 */}
                  <tr className="bg-white text-center">
                    <td className="border border-gray-300 p-2">6</td>
                    <td className="border border-gray-300 p-2">
                      <div>Tên lớp: 7A13</div>
                      <div>Khối: 7</div>
                      <div>Số lượng học sinh: 48</div>
                    </td>
                    <td className="border border-gray-300 p-2">
                      Thứ 2, Ngày 9/9/2024
                    </td>
                    <td className="border border-gray-300 p-2">
                      Nguyễn Hữu Thế Bảo
                      <br />
                      <span className="text-gray-500">
                        baodepzai123@gmail.com
                      </span>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <span className="font-bold text-red-600">
                        Chưa điểm danh
                      </span>
                    </td>
                    <td className="border border-gray-300 p-2">----</td>
                    <td className="border border-gray-300 p-2">
                      <button className="rounded bg-green-500 px-3 py-1 text-white">
                        Điểm danh
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Pagination */}
              <div className="d-flex justify-content-end mt-4">
                <PaginationAntd></PaginationAntd>
              </div>
              <div className="mt-4 flex justify-end">
                {/* <div className="flex items-center space-x-1">
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
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
