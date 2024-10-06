import React, { useEffect, useState } from "react";
import PaginationAntd from "../../../../_Shared/Components/Pagination/Pagination";
import { getListClassToAttendance } from "../../../../Services/Attendance/attendance";

const ListSubject = () => {
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
        <h1 className="fs-16">Môn học</h1>
        <p className="mt-2">Task/Attendance/Attendance sheet</p>

        <div className="d-flex justify-content-between align-items-end mt-2">
          <p>Số môn học theo bộ giáo dục và đào tạo : 10 Môn học</p>
          <input
            placeholder="Tìm kiếm...."
            class={`bg-color-white-smoke border-radius-10px w-300px px-3 py-2`}
          />
        </div>

        <div className="table-responsive mt-4">
          <table className="table-bordered table min-w-full border-collapse border border-gray-300">
            <thead className="bg-color-blue text-white">
              <tr>
                <th className="w-5 text-center">STT</th>
                <th>
                  <span className="ps-10">Tên môn học</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="align-middle">
                <td className="text-center">1</td>
                <td>
                  <div className="ps-10">
                    <b>Toán</b>
                  </div>
                </td>
              </tr>
              <tr className="align-middle">
                <td className="text-center">2</td>
                <td>
                  <div className="ps-10">
                    <b>Ngữ văn</b>
                  </div>
                </td>
              </tr>
              <tr className="align-middle">
                <td className="text-center">3</td>
                <td>
                  <div className="ps-10">
                    <b>Ngoại ngữ 1</b>
                  </div>
                </td>
              </tr>
              <tr className="align-middle">
                <td className="text-center">4</td>
                <td>
                  <div className="ps-10">
                    <b>Giáo dục công dân</b>
                  </div>
                </td>
              </tr>
              <tr className="align-middle">
                <td className="text-center">5</td>
                <td>
                  <div className="ps-10">
                    <b>Lịch sử và địa lí</b>
                  </div>
                </td>
              </tr>
              <tr className="align-middle">
                <td className="text-center">6</td>
                <td>
                  <div className="ps-10">
                    <b>Khoa học và tự nhiên</b>
                  </div>
                </td>
              </tr>
              <tr className="align-middle">
                <td className="text-center">7</td>
                <td>
                  <div className="ps-10">
                    <b>Công nghệ</b>
                  </div>
                </td>
              </tr>
              <tr className="align-middle">
                <td className="text-center">8</td>
                <td>
                  <div className="ps-10">
                    <b>Tin học</b>
                  </div>
                </td>
              </tr>
              <tr className="align-middle">
                <td className="text-center">9</td>
                <td>
                  <div className="ps-10">
                    <b>Giáo dục thể chất</b>
                  </div>
                </td>
              </tr>
              <tr className="align-middle">
                <td className="text-center">10</td>
                <td>
                  <div className="ps-10">
                    <b>Nghệ thuật (âm nhạc, mĩ thuật)</b>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListSubject;
