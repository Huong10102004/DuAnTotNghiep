import React, { useEffect, useState } from "react";
import PaginationAntd from "../../../../_Shared/Components/Pagination/Pagination";
import { getListClassToAttendance } from "../../../../Services/Attendance/attendance";
import { Link } from "react-router-dom";
import Loading from "../../../../_Shared/Components/Loading/Loading";
import { ApiService } from "../../../../Services/ApiService";

const HistoryAttendance = () => {
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getItems();
  },[])

  const getItems = async () => {
    setLoading(true);
    try {
      let dataRequest = {
        school_year_id: localStorage.getItem('schoolYearCurrent') ?? '',
        page: 1,
        size: 10,
        search: ''
      }
      const responseData = await ApiService(`manager/rollcallhistory`, 'GET');
      if(responseData){
        setListData(responseData?.data)
      }
      console.log(responseData?.data);
    } catch (error) {
      setLoading(true);
      setNotification({ type: 'error', message: 'Có lỗi liên quan đến hệ thống',title: 'Lỗi' });
    } finally {
      setLoading(false);
    }
  };

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;
  return (
    <div>
      {/* <header className="h-[100px] w-full"></header> */}
      <Loading isLoading={loading} />
      <div className="pt-6rem h-100vh bg-white px-4">
        <h1 className="fs-16">Lịch sử điểm danh</h1>
        <p className="mt-2">Task/subtitle/subtitle</p>

        <div className="d-flex justify-content-between align-items-end mt-2">
          <p>Số lượng: 23 lớp</p>
          <input
            placeholder="Tìm kiếm...."
            className={`bg-color-white-smoke border-radius-10px w-300px px-3 py-2`}
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
              {listData.map((item,index) => (
                <tr className="align-middle" key={index}>
                  <td className="text-center">{index}</td>
                  <td>
                    <div className="ps-10">
                      <span>
                        {item.class_name}
                      </span>
                      <br />
                      <span>
                        {item.grade_name}
                      </span>
                    </div>
                  </td>
                  <td className="text-center">
                    <span className="fw-700 text-color-blue">
                      {item.teacher_name}
                    </span>
                    <br />
                    <span className="fw-700">({item.teacher_email})</span>
                  </td>
                  <td className="fw-700 text-center">{item.total_students}</td>
                  <td>
                    <Link to={"/staff/history_attendance/detail/" + item.class_id}>
                      <button className="btn btn-success w-100">Chọn</button>
                    </Link>
                  </td>
                </tr>
              ))}
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
