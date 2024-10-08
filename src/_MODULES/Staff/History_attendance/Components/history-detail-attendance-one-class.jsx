import React, { useEffect, useState } from "react";
import PaginationAntd from "../../../../_Shared/Components/Pagination/Pagination";
import { getListClassToAttendance } from "../../../../Services/Attendance/attendance";
import { Link } from "react-router-dom";
import ButtonAttendanceStatus from "../../../../_Shared/Components/Button/Button-attendance-status";

const HistoryDetailAttendanceOneClass = () => {
    // const [items, setItems] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //     const getItems = async () => {
    //     try {
    //         const data = await getListClassToAttendance(); 
    //         console.log(data);
    //         setItems(data);
    //     } catch (err) {
    //         setError(err.message);
    //     } finally {
    //         setLoading(false);
    //     }
    //     };

    //     getItems();
    // }, []);

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>{error}</div>;
  return (
    <div>
      {/* <header className="h-[100px] w-full"></header> */}
      <div className="pt-6rem bg-white h-100vh px-4">
            <h1 className="fs-16">Lịch sử điểm danh lớp 6a1 ngày 14/09/2024</h1>
            <p className="mt-2">Task/subtitle/subtitle</p>

            <div className="d-flex justify-content-between align-items-end mt-2">
                <p>Từ ngày: <span className="text-color-orange">10/09/2024 - 19/09/2024</span></p>
                <div className="d-flex">
                    <button className="bg-color-white-smoke border-radius-5px px-3 me-3">Chọn ngày</button>
                    <input placeholder="Tìm kiếm...." class={`bg-color-white-smoke px-3 py-2 border-radius-10px w-300px`}/>
                </div>
            </div>

            <div className="table-responsive mt-4">
                <table className="min-w-full table table-bordered border-collapse border border-gray-300">
                    <thead className="bg-color-blue text-white">
                        <tr>
                            <th className="w-5 text-center">STT</th>
                            <th><span className="ps-10">Thông tin học sinh</span></th>
                            <th className="text-center">Ngày sinh</th>
                            <th className="text-center w-10">Giới tính</th>
                            <th className="text-center">Ghi chú</th>
                            <th className="w-10 text-center">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="align-middle">
                            <td className="text-center">1</td>
                            <td>
                                <span>Nguyễn Duy Kiên</span><br />
                                <span>Mã: GV01</span>
                            </td>
                            <td className="text-center">31/07/2024</td>
                            <td className="text-center">Nam</td>
                            <td>
                                <input type="text" value={`học sinh nghỉ học không xin phép`} disabled={true} className="form-control"/>
                            </td>
                            <td>
                                <ButtonAttendanceStatus status={1}></ButtonAttendanceStatus>
                            </td>
                        </tr>
                        <tr className="align-middle">
                            <td className="text-center">1</td>
                            <td>
                                <span>Nguyễn Duy Kiên</span><br />
                                <span>Mã: GV01</span>
                            </td>
                            <td className="text-center">31/07/2024</td>
                            <td className="text-center">Nam</td>
                            <td>
                                <input type="text" value={`học sinh nghỉ học không xin phép`} disabled={true} className="form-control"/>
                            </td>
                            <td>
                                <ButtonAttendanceStatus status={2}></ButtonAttendanceStatus>
                            </td>
                        </tr>
                        <tr className="align-middle">
                            <td className="text-center">1</td>
                            <td>
                                <span>Nguyễn Duy Kiên</span><br />
                                <span>Mã: GV01</span>
                            </td>
                            <td className="text-center">31/07/2024</td>
                            <td className="text-center">Nam</td>
                            <td>
                                <input type="text" value={`học sinh nghỉ học không xin phép`} disabled={true} className="form-control"/>
                            </td>
                            <td>
                                <ButtonAttendanceStatus status={3}></ButtonAttendanceStatus>
                            </td>
                        </tr>
                        <tr className="align-middle">
                            <td className="text-center">1</td>
                            <td>
                                <span>Nguyễn Duy Kiên</span><br />
                                <span>Mã: GV01</span>
                            </td>
                            <td className="text-center">31/07/2024</td>
                            <td className="text-center">Nam</td>
                            <td>
                                <input type="text" value={`học sinh nghỉ học không xin phép`} disabled={true} className="form-control"/>
                            </td>
                            <td>
                                <ButtonAttendanceStatus status={4}></ButtonAttendanceStatus>
                            </td>
                        </tr>
                        <tr className="align-middle">
                            <td className="text-center">1</td>
                            <td>
                                <span>Nguyễn Duy Kiên</span><br />
                                <span>Mã: GV01</span>
                            </td>
                            <td className="text-center">31/07/2024</td>
                            <td className="text-center">Nam</td>
                            <td>
                                <input type="text" value={`học sinh nghỉ học không xin phép`} disabled={true} className="form-control"/>
                            </td>
                            <td>
                                <ButtonAttendanceStatus status={1}></ButtonAttendanceStatus>
                            </td>
                        </tr>
                        <tr className="align-middle">
                            <td className="text-center">1</td>
                            <td>
                                <span>Nguyễn Duy Kiên</span><br />
                                <span>Mã: GV01</span>
                            </td>
                            <td className="text-center">31/07/2024</td>
                            <td className="text-center">Nam</td>
                            <td>
                                <input type="text" value={`học sinh nghỉ học không xin phép`} disabled={true} className="form-control"/>
                            </td>
                            <td>
                                <ButtonAttendanceStatus status={1}></ButtonAttendanceStatus>
                            </td>
                        </tr>
                        <tr className="align-middle">
                            <td className="text-center">1</td>
                            <td>
                                <span>Nguyễn Duy Kiên</span><br />
                                <span>Mã: GV01</span>
                            </td>
                            <td className="text-center">31/07/2024</td>
                            <td className="text-center">Nam</td>
                            <td>
                                <input type="text" value={`học sinh nghỉ học không xin phép`} disabled={true} className="form-control"/>
                            </td>
                            <td>
                                <ButtonAttendanceStatus status={1}></ButtonAttendanceStatus>
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

export default HistoryDetailAttendanceOneClass;
