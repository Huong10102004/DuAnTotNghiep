import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // CSS của react-datepicker

const Attendance: React.FC = () => {
  const [selectedDays, setSelectedDays] = useState<Date | null>(null); // Chọn ngày
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
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
          <div className="mx-4">
            <h1 className="text-3xl font-bold text-[#4154F1]">Điểm danh</h1>
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

            {/* Bộ lọc */}
            <div className="relative mt-5 flex justify-end">
              {/* Lọc theo ngày */}
              <div className="group relative">
                <button className="mb-3 mt-5 h-10 rounded-lg bg-[#F3F6F9] px-10 text-left text-[#A0AEC0]">
                  Lọc theo ngày
                </button>
                <div className="absolute left-0 top-full z-10 mt-1 hidden w-80 rounded border border-gray-300 bg-white p-4 shadow-lg group-hover:block">
                  <h2 className="mb-2 text-xl font-bold">Lọc theo ngày</h2>
                  <div className="mb-4">
                    <DatePicker
                      selected={selectedDays}
                      onChange={(date) => setSelectedDays(date)}
                      dateFormat="dd/MM/yyyy"
                      className="w-full rounded-lg border px-3 py-2"
                      placeholderText="Chọn ngày"
                    />
                  </div>
                </div>
              </div>

              {/* Lọc theo khối lớp */}
              <div className="group relative">
                <button className="mb-3 mt-5 h-10 rounded-lg bg-[#F3F6F9] px-10 text-left text-[#A0AEC0]">
                  Lọc theo khối lớp
                </button>
                <div className="absolute left-0 top-full z-10 mt-1 hidden w-96 rounded border border-gray-300 bg-white shadow-lg group-hover:block">
                  <h2 className="p-2 text-xl font-bold">Lọc theo khối lớp</h2>
                  <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 p-2">Khối</th>
                        {grades[0].classes.map((className) => (
                          <th
                            key={className}
                            className="border border-gray-300 p-2"
                          >
                            {className}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {grades.map((grade) => (
                        <tr key={grade.grade}>
                          <td className="border border-gray-300 p-2 text-right">
                            <input
                              type="checkbox"
                              checked={selectedGrades.includes(grade.grade)}
                              onChange={() => handleGradeChange(grade.grade)}
                            />{" "}
                            {grade.grade}
                          </td>
                          {grade.classes.map((className) => (
                            <td
                              key={`${grade.grade}-${className}`}
                              className="border border-gray-300 p-2 text-right"
                            >
                              <input
                                type="checkbox"
                                checked={attendanceData[className] || false}
                                onChange={() =>
                                  handleAttendanceChange(className)
                                }
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <button
                className="mt-5 h-10 rounded-lg bg-[#F3F6F9] px-10 text-left text-[#A0AEC0]"
                onClick={handleSearch}
              >
                Tìm Kiếm
              </button>
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
