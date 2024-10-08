import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // CSS của react-datepicker

const Attendance: React.FC = () => {
  const [selectedDays, setSelectedDays] = useState<Date | null>(null); // Chọn ngày
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const [attendanceData, setAttendanceData] = useState<{
    [key: string]: boolean;
  }>({
    "6A1": false,
    "6A2": false,
    "6A3": false,
    "6A4": false,
    "6A5": false,
    "6A6": false,
    "6A7": false,
    "6A8": false,
  });

  const grades = [
    { grade: "6", classes: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"] },
    { grade: "7", classes: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"] },
    { grade: "8", classes: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"] },
    { grade: "9", classes: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"] },
  ];

  // Hàm thay đổi checkbox khối và lớp
  const handleGradeChange = (grade: string) => {
    setSelectedGrades((prevGrades) =>
      prevGrades.includes(grade)
        ? prevGrades.filter((g) => g !== grade)
        : [...prevGrades, grade],
    );
  };

  // Hàm thay đổi checkbox cho từng lớp trong bảng điểm danh
  const handleAttendanceChange = (className: string) => {
    setAttendanceData((prevData) => ({
      ...prevData,
      [className]: !prevData[className],
    }));
  };

  // Hàm xử lý lọc dữ liệu khi nhấn "Tìm Kiếm"
  const handleSearch = () => {
    console.log("Ngày đã chọn:", selectedDays);
    console.log("Các khối lớp đã chọn:", selectedGrades);
    console.log("Trạng thái điểm danh:", attendanceData);
  };
  return (
    <div>
      <div className="pt-6rem h-100vh flex flex-row bg-white">
        <div className="w-[100%]">
          <h1 className="mb-3 text-3xl font-bold text-[#4154F1]">Điểm danh</h1>
          <div className="grid grid-cols-2">
            <div>
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
              </div>
            </div>
            {/* Bộ lọc */}
            <div className="relative grid grid-cols-5">
              {/* Lọc theo ngày */}
              <div className="group relative">
                <button className="rounded-lg bg-[#F3F6F9] px-1 py-2 text-left text-[#A0AEC0]">
                  Chọn ngày
                </button>
                <div className="absolute left-0 top-full z-10 hidden w-fit rounded border border-gray-300 bg-white group-hover:block">
                  <DatePicker
                    selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                  />
                </div>
              </div>

              {/* Lọc theo khối lớp */}
              <div className="group relative">
                <button className="w-full max-w-10 rounded-lg bg-[#F3F6F9] px-1 py-2 text-center text-[#A0AEC0]">
                  Lọc
                </button>
                <div className="absolute left-0 top-full z-10 mt-1 hidden w-96 rounded border border-gray-300 bg-white shadow-lg group-hover:block">
                  <h2 className="p-2 text-xl font-bold">Lọc theo khối lớp</h2>
                  <div className="text-sm">
                    {grades.map((grade) => (
                      <div
                        key={grade.grade}
                        className="border border-gray-300 p-1"
                      >
                        <h2 className="mb-1 text-base font-semibold">
                          {grade.grade}
                        </h2>
                        <div className="grid grid-cols-1 gap-[2px] sm:grid-cols-2 md:grid-cols-3">
                          {grade.classes.map((className) => (
                            <div
                              key={`${grade.grade}-${className}`}
                              className="text-center"
                            >
                              <label>
                                <input
                                  type="checkbox"
                                  checked={attendanceData[className] || false}
                                  onChange={() =>
                                    handleAttendanceChange(className)
                                  }
                                />
                                <span className="ml-1">{className}</span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative col-span-3">
                <input
                  type="search"
                  id="search-dropdown"
                  className="rounded-s-gray-100 rounded-s-2 z-20 block w-full rounded-e-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
                  placeholder="Search"
                  required
                />
                <button
                  type="submit"
                  className="absolute end-0 top-0 h-full rounded-e-lg border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="h-4 w-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Bảng điểm danh */}
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
                  {/* Các hàng khác */}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="d-flex justify-content-end mt-4">
                {/* <Pagination></Pagination> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
