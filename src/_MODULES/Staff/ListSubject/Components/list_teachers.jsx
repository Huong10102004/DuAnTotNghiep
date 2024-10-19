import React, { useEffect, useState } from "react";
import PaginationAntd from "../../../../_Shared/Components/Pagination/Pagination";
import { getListClassToAttendance } from "../../../../Services/Attendance/attendance";
import icon_plus from "../../../../assets/images/svg/icon_plus.svg";
import icon_edit from "../../../../assets/images/svg/icon_edit.svg";
import icon_delete from "../../../../assets/images/svg/icon_delete.svg";
import icon_assign_teacher from "../../../../assets/images/svg/icon_assign_teacher.svg";
import ActionMenu from "../../../../_Shared/Components/Action-menu/Action-menu";

import Addteacher from "./add_teachers";
import Update_teacher from "./update_teacher";
import { ApiService } from "../../../../Services/ApiService";
import Loading from "../../../../_Shared/Components/Loading/Loading";
import { formatTimestamp } from "../../../../_Shared/Pipe/Format-timestamp";

const ListTeacher = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddTeacherModalOpen, setIsAddTeacherModalOpen] = useState(false);
  const [isUpdateTeacherModalOpen, setIsUpdateTeacherModalOpen] =
    useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const menuItems = [
    { key: "edit", label: "Chỉnh sửa", icon: icon_edit },
    { key: "delete", label: "Xóa", icon: icon_delete },
    {
      key: "assign_teacher",
      label: "Gán giáo viên",
      icon: icon_assign_teacher,
    },
    {
      key: "assign_student",
      label: "Gán học sinh vào lớp",
      icon: icon_assign_teacher,
    },
  ];

  const handleMenuClick = (key, data) => {
    if (key === "edit") {
      setSelectedItem(data);
      setIsUpdateTeacherModalOpen(true);
    } else if (key === "delete") {
      console.log("Deleting: ", data);
    }
  };


  const getItems = async () => {
    try {
      // const data = await getListClassToAttendance();
      const data = await ApiService('manager/user');
      console.log('That data api: ',data.data);
      setItems(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItems();  // Gọi API lấy dữ liệu khi component được render lần đầu
  }, []);

  const openAddTeacherModal = () => setIsAddTeacherModalOpen(true);
  const closeAddTeacherModal = () => setIsAddTeacherModalOpen(false);

  const openUpdateTeacherModal = () => setIsUpdateTeacherModalOpen(true);
  const closeUpdateTeacherModal = () => setIsUpdateTeacherModalOpen(false);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  const handleCallBackApi = () => {
    getItems();
  }
  return (
    <div>
      <Loading isLoading={loading} />
      <div className="pt-6rem h-100vh bg-white px-4">
        <h1 className="fs-16">Nhân viên</h1>
        <p className="mt-2">Task/Attendance/Attendance sheet</p>

        <div className="d-flex align-items-end mt-2 justify-around">
          <p>Số lượng: 23 lớp</p>

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
              onClick={openAddTeacherModal}
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
                  <span className="ps-10">Thông tin giáo viên</span>
                </th>
                <th className="text-center">Liên hệ</th>
                <th className="text-center">Lớp chủ nhiệm</th>
                <th className="text-center">Chức vụ</th>
                <th className="text-center">Trạng thái</th>
                <th className="text-center">Ngày sinh</th>
                <th className="text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr className="align-middle" key={item.id || index}>
                  <td className="text-center">{index + 1}</td>
                  <td>
                    <div className="ps-10">
                      <span>
                        <b>{item.userName}</b>
                      </span>
                      <br />
                      <span>
                        <b>{item.userCode}</b>
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="ps-10">
                      <span>
                        <b>{item.userEmail}</b>
                      </span>
                      <br />
                      <span>
                        <b>{item.userPhone}</b>
                      </span>
                    </div>
                  </td>
                  <td className="text-center">{item.userMainClassName}</td>
                  <td className="fw-700 text-center">{item.userAccessType}</td>
                  <td className="fw-700 text-center">{item.userStatus}</td>
                  <td className="text-center">{formatTimestamp(item.userDob)}</td>
                  <td className="text-center">
                    <ActionMenu
                      items={menuItems}
                      onMenuClick={(key) => handleMenuClick(key, item)}
                    />
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

      {/* Addteacher Modal */}
      {isAddTeacherModalOpen && (
        <Addteacher
          isOpen={isAddTeacherModalOpen}
          onClose={closeAddTeacherModal}
          reloadApi={handleCallBackApi}
        />
      )}

      {/* Updateteacher Modal */}
      {isUpdateTeacherModalOpen && (
        <Update_teacher
          isOpen={isUpdateTeacherModalOpen}
          onClose={closeUpdateTeacherModal}
          teacher={selectedItem}
        />
      )}
    </div>
  );
};

export default ListTeacher;
