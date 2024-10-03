import React, { useEffect, useState } from "react";
import PaginationAntd from "../../../../_Shared/Components/Pagination/Pagination";
import { getListClassToAttendance } from "../../../../Services/Attendance/attendance";
import icon_plus from "../../../../assets/images/svg/icon_plus.svg";
import icon_edit from "../../../../assets/images/svg/icon_edit.svg";
import icon_delete from "../../../../assets/images/svg/icon_delete.svg";
import icon_assign_teacher from "../../../../assets/images/svg/icon_assign_teacher.svg";
import ActionMenu from "../../../../_Shared/Components/Action-menu/Action-menu";

import Addyear from "./addyear";
const Listyear = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const menuItems = [
    { key: "edit", label: "Chỉnh sửa", icon: icon_edit },
    { key: "delete", label: "Xóa", icon: icon_delete },
  ];

  const handleMenuClick = (key, data) => {
    if (key === "edit") {
      openModal(true, data); // Pass the data for editing
    } else if (key === "delete") {
      console.log("Deleting: ", data);
    } else if (key === "assign_teacher") {
      openModalAssignTeacher(true, data);
    } else if (key === "assign_student") {
      navigate("/staff/class/assign_student/123456");
    }
  };

  const showDeleteModal = () => {
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    // Xử lý xóa bản ghi ở đây
    console.log("Đã xóa bản ghi");
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {/* <header className="h-[100px] w-full"></header> */}
      <div className="pt-6rem h-100vh bg-white px-4">
        <h1 className="fs-16">Năm học</h1>
        <p className="mt-2">Task/Attendance/Attendance sheet</p>

        <div className="d-flex align-items-end mt-2 justify-around">
          <p className="">
            Số niên khóa: <span className="text-red-600">10 năm học</span>
          </p>

          <div className="flex w-3/4 justify-end gap-1">
            <input
              placeholder="Tìm kiếm...."
              className={`bg-color-white-smoke border-radius-10px w-300px px-3 py-2`}
            />
            <button className="h-10 w-24 rounded bg-blue-500 text-sm text-white">
              Xuất file Excel
            </button>

            <button
              className="h-10 w-24 rounded bg-green-500 text-sm text-white"
              onClick={openModal}
            >
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
                  <span className="ps-10">Thông tin năm học</span>
                </th>
                <th className="text-center">Trạng thái</th>
                <th className="text-center">Thời gian bắt đầu</th>
                <th className="text-center">thời gian kết thúc</th>
                <th className="text-center">Khối hiện tại</th>

                <th className="text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr className="align-middle">
                <td className="text-center">1</td>
                <td>
                  <div className="ps-10">
                    <span>
                      <b>K11.3</b>
                    </span>
                    <br />
                    <span>
                      <b>Mã NKTH303</b>
                    </span>
                  </div>
                </td>
                <td>
                  <div className="ps-10">
                    <span>
                      <b>Đang diễn ra</b>
                    </span>
                    <br />
                    <span>
                      <b></b>
                      <b></b>
                    </span>
                  </div>
                </td>
                <td className="fw-700 text-center">05/09/2024</td>
                <td className="fw-700 text-center">20/05/2028</td>
                <td className="fw-700 text-center">Khối 6</td>

                <td className="text-center">
                  <ActionMenu
                    items={menuItems}
                    onMenuClick={(key) => handleMenuClick(key, item)}
                    onDelete={showDeleteModal}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-end">
          <PaginationAntd></PaginationAntd>
        </div>
      </div>
      {isModalOpen && <Addyear isOpen={isModalOpen} onClose={closeModal} />}
    </div>
  );
};

export default Listyear;
