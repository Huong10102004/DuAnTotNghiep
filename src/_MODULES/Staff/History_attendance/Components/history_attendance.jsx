import React, { useEffect, useState } from "react";
import PaginationAntd from "../../../../_Shared/Components/Pagination/Pagination";
import { getListClassToAttendance } from "../../../../Services/Attendance/attendance";

const HistoryAttendance = () => {
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

        <div className="d-flex justify-content-between align-items-end mt-2">
          <p>Số lượng: 23 lớp</p>
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
                  <span className="ps-10">Thông tin lớp học</span>
                </th>
                <th className="text-center">Chủ nhiệm</th>
                <th className="w-10 text-center">Học sinh</th>
                <th className="w-10 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr className="align-middle">
                <td className="text-center">1</td>
                <td>
                  <div className="ps-10">
                    <span>
                      Lớp: <b>6a5</b>
                    </span>
                    <br />
                    <span>
                      Khối: <b>6</b>
                    </span>
                  </div>
                </td>
                <td className="text-center">
                  <span className="fw-700 text-color-blue">
                    Nguyễn Duy kiên
                  </span>
                  <br />
                  <span className="fw-700">(kiennd@gmail.com)</span>
                </td>
                <td className="fw-700 text-center">45</td>
                <td>
                  <button className="btn btn-success w-100">Chọn</button>
                </td>
              </tr>
              <tr className="align-middle">
                <td className="text-center">1</td>
                <td>
                  <div className="ps-10">
                    <span>
                      Lớp: <b>6a5</b>
                    </span>
                    <br />
                    <span>
                      Khối: <b>6</b>
                    </span>
                  </div>
                </td>
                <td className="text-center">
                  <span className="fw-700 text-color-blue">
                    Nguyễn Duy kiên
                  </span>
                  <br />
                  <span className="fw-700">(kiennd@gmail.com)</span>
                </td>
                <td className="fw-700 text-center">45</td>
                <td>
                  <button className="btn btn-success w-100">Chọn</button>
                </td>
              </tr>
              <tr className="align-middle">
                <td className="text-center">1</td>
                <td>
                  <div className="ps-10">
                    <span>
                      Lớp: <b>6a5</b>
                    </span>
                    <br />
                    <span>
                      Khối: <b>6</b>
                    </span>
                  </div>
                </td>
                <td className="text-center">
                  <span className="fw-700 text-color-blue">
                    Nguyễn Duy kiên
                  </span>
                  <br />
                  <span className="fw-700">(kiennd@gmail.com)</span>
                </td>
                <td className="fw-700 text-center">45</td>
                <td>
                  <button className="btn btn-success w-100">Chọn</button>
                </td>
              </tr>
              <tr className="align-middle">
                <td className="text-center">1</td>
                <td>
                  <div className="ps-10">
                    <span>
                      Lớp: <b>6a5</b>
                    </span>
                    <br />
                    <span>
                      Khối: <b>6</b>
                    </span>
                  </div>
                </td>
                <td className="text-center">
                  <span className="fw-700 text-color-blue">
                    Nguyễn Duy kiên
                  </span>
                  <br />
                  <span className="fw-700">(kiennd@gmail.com)</span>
                </td>
                <td className="fw-700 text-center">45</td>
                <td>
                  <button className="btn btn-success w-100">Chọn</button>
                </td>
              </tr>
              <tr className="align-middle">
                <td className="text-center">1</td>
                <td>
                  <div className="ps-10">
                    <span>
                      Lớp: <b>6a5</b>
                    </span>
                    <br />
                    <span>
                      Khối: <b>6</b>
                    </span>
                  </div>
                </td>
                <td className="text-center">
                  <span className="fw-700 text-color-blue">
                    Nguyễn Duy kiên
                  </span>
                  <br />
                  <span className="fw-700">(kiennd@gmail.com)</span>
                </td>
                <td className="fw-700 text-center">45</td>
                <td>
                  <button className="btn btn-success w-100">Chọn</button>
                </td>
              </tr>
              <tr className="align-middle">
                <td className="text-center">1</td>
                <td>
                  <div className="ps-10">
                    <span>
                      Lớp: <b>6a5</b>
                    </span>
                    <br />
                    <span>
                      Khối: <b>6</b>
                    </span>
                  </div>
                </td>
                <td className="text-center">
                  <span className="fw-700 text-color-blue">
                    Nguyễn Duy kiên
                  </span>
                  <br />
                  <span className="fw-700">(kiennd@gmail.com)</span>
                </td>
                <td className="fw-700 text-center">45</td>
                <td>
                  <button className="btn btn-success w-100">Chọn</button>
                </td>
              </tr>
              <tr className="align-middle">
                <td className="text-center">1</td>
                <td>
                  <div className="ps-10">
                    <span>
                      Lớp: <b>6a5</b>
                    </span>
                    <br />
                    <span>
                      Khối: <b>6</b>
                    </span>
                  </div>
                </td>
                <td className="text-center">
                  <span className="fw-700 text-color-blue">
                    Nguyễn Duy kiên
                  </span>
                  <br />
                  <span className="fw-700">(kiennd@gmail.com)</span>
                </td>
                <td className="fw-700 text-center">45</td>
                <td>
                  <button className="btn btn-success w-100">Chọn</button>
                </td>
              </tr>
              <tr className="align-middle">
                <td className="text-center">1</td>
                <td>
                  <div className="ps-10">
                    <span>
                      Lớp: <b>6a5</b>
                    </span>
                    <br />
                    <span>
                      Khối: <b>6</b>
                    </span>
                  </div>
                </td>
                <td className="text-center">
                  <span className="fw-700 text-color-blue">
                    Nguyễn Duy kiên
                  </span>
                  <br />
                  <span className="fw-700">(kiennd@gmail.com)</span>
                </td>
                <td className="fw-700 text-center">45</td>
                <td>
                  <button className="btn btn-success w-100">Chọn</button>
                </td>
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

export default HistoryAttendance;
