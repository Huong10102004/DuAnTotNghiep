import React, { useEffect, useState } from "react";
import PaginationAntd from "../../../../_Shared/Components/Pagination/Pagination";
import { getListClassToAttendance } from "../../../../Services/Attendance/attendance";

const ListTeacher = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getItems = async () => {
      try {
        const data = await getListClassToAttendance();
        console.log(data);
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getItems();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div>
      {/* <header className="h-[100px] w-full"></header> */}
      <div className="pt-6rem h-100vh bg-white px-4">
        <h1 className="fs-16">Lịch sử điểm danh</h1>
        <p className="mt-2">Task/subtitle/subtitle</p>

        <div className="d-flex align-items-end mt-2 justify-around">
          <p>Số lượng: 23 lớp</p>

          <div className="flex w-3/4 justify-end gap-1">
            <input
              placeholder="Tìm kiếm...."
              class={`bg-color-white-smoke border-radius-10px w-300px px-3 py-2`}
            />
            <button className="h-10 w-24 rounded bg-blue-500 text-sm text-white">
              Xuất file Excel
            </button>
            <button className="h-10 w-24 rounded bg-green-500 text-sm text-white">
              Thêm mới
            </button>
          </div>
        </div>

        <div className="table-responsive mt-4">
          <table className="table-bordered table min-w-full border-collapse border border-gray-300">
            <thead className="bg-color-blue text-white">
              <tr>
                <th className="w-5 text-center">STT</th>
                <th>
                  <span className="ps-10">Thông tin giáo viên</span>
                </th>
                <th className="text-center">Liên hệ</th>
                <th className="text-center">Lớp chủ nhiệm</th>
                <th className="text-center">Môn giảng dạy</th>
                <th className="text-center">Chức vụ</th>
                <th className="text-center">Trạng thái</th>
                <th className="text-center">Ngày sinh</th>
                <th className="text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr className="align-middle">
                <td className="text-center">1</td>
                <td>
                  <div className="ps-10">
                    <span>
                      <b>Nguyễn Duy kiên LOL</b>
                    </span>
                    <br />
                    <span>
                      <b>Mã:</b> <b>GV01</b>
                    </span>
                  </div>
                </td>
                <td>
                  <div className="ps-10">
                    <span>
                      <b>(kiennd@gmail.com)</b>
                    </span>
                    <br />
                    <span>
                      <b>Phone:</b>
                      <b>123456789</b>
                    </span>
                  </div>
                </td>
                <td className="text-center">6A1</td>
                <td className="fw-700 text-center">Toán</td>
                <td className="fw-700 text-center">Giáo viên</td>
                <td className="fw-700 text-center">Chính thức</td>
                <td className="text-center">13/09/2004</td>
                <td className="text-center">...</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-end">
          <PaginationAntd></PaginationAntd>
        </div>
      </div>
    </div>
  );
};

export default ListTeacher;
