import React, { useEffect, useState } from "react";
import PaginationAntd from "../../../../_Shared/Components/Pagination/Pagination";
import icon_plus from "../../../../assets/images/svg/icon_plus.svg";
import icon_edit from "../../../../assets/images/svg/icon_edit.svg";
import icon_delete from "../../../../assets/images/svg/icon_delete.svg";
import icon_assign_teacher from "../../../../assets/images/svg/icon_assign_teacher.svg";
import ActionMenu from "../../../../_Shared/Components/Action-menu/Action-menu";

import Addyear from "./addyear";
import Updateyear from "./updateyear";
import { ApiService } from "../../../../Services/ApiService";
import Loading from "../../../../_Shared/Components/Loading/Loading";
const Listyear = () => {
  const [keyWord, setKeyWord] = useState('');  // Biến lưu từ khóa tìm kiếm
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddYearModalOpen, setIsAddYearModalOpen] = useState(false);
  const [isUpdateYearModalOpen, setIsUpdateYearModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const menuItems = [
    { key: "edit", label: "Chỉnh sửa", icon: icon_edit },
    { key: "delete", label: "Xóa", icon: icon_delete },
  ];

  const handleMenuClick = (key, data) => {
    if (key === "edit") {
      setSelectedItem(data);
      setIsUpdateYearModalOpen(true);
    } else if (key === "delete") {
      console.log("Deleting: ", data);
    }
  };

  const showDeleteModal = () => {
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    console.log("Đã xóa bản ghi");
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Hàm lấy danh sách dữ liệu
  const getItems = async (keyWord = '') => {
    setLoading(true);  // Bắt đầu tải dữ liệu
    setError(null);    // Reset error
    try {
      const data = await ApiService(`manager/schoolyear?keyWord=${keyWord}`);  // Gọi API lấy danh sách
      console.log("Dữ liệu trả về từ API: ", data);  // Kiểm tra dữ liệu trả về
      setItems(Array.isArray(data.data) ? data.data : []);  // Cập nhật danh sách
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);  // Dừng trạng thái tải dữ liệu
    }
  };

  useEffect(() => {
    getItems();  // Gọi API lấy dữ liệu khi component được render lần đầu
  }, []);

  // Hàm xử lý sau khi thêm thành công
  const handleAddYearSuccess = () => {
    setIsAddYearModalOpen(false); // Đóng modal
    getItems(); // Gọi lại API để cập nhật danh sách
  };

  const openAddYearModal = () => setIsAddYearModalOpen(true);
  const closeAddYearModal = () => setIsAddYearModalOpen(false);

  const openUpdateyearModal = () => setIsUpdateYearModalOpen(true);
  const closeUpdateyearModal = () => setIsUpdateYearModalOpen(false);

  const handleSearchChange = (e) => {
    setKeyWord(e.target.value);  // Cập nhật từ khóa
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      getItems(keyWord);  // Gọi API ngay khi nhấn Enter
    }
  };
  return (
    <div>
      {/* Lớp phủ loading với hiệu ứng spinner */}
      <Loading isLoading={loading} />

      <div className="pt-6rem h-100vh bg-white px-4">
        <h1 className="fs-16">Năm học</h1>
        <p className="mt-2">Task/Attendance/Attendance sheet</p>

        <div className="d-flex align-items-end mt-2 justify-content-between">
          <p>
            Số niên khóa: <span className="text-red-600">10 năm học</span>
          </p>

          <div className="flex w-3/4 justify-end gap-1">
            <input
              placeholder="Tìm kiếm...."
              className={`bg-color-white-smoke border-radius-10px w-300px px-3 py-2`}
              value={keyWord}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
            <button className="h-10 w-24 rounded bg-blue-500 text-sm text-white">
              Xuất file Excel
            </button>

            <button
              className="h-10 w-24 rounded bg-green-500 text-sm text-white"
              onClick={openAddYearModal} // Open Addyear modal
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
                <th className="text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {items && Array.isArray(items) && items.length > 0 ? (
                items.map((item, index) => (
                  <tr className="align-middle" key={item.id}>
                    <td className="text-center">{index + 1}</td>
                    <td>
                      <div className="ps-10">
                        <span>
                          <b>{item.name}</b>
                        </span>
                        <br />
                      </div>
                    </td>
                    <td>
                      <div className="ps-10">
                        <span>
                          <b>{item.status}</b>
                        </span>
                        <br />
                      </div>
                    </td>
                    <td className="fw-700 text-center">{item.start_date}</td>
                    <td className="fw-700 text-center">{item.end_date}</td>

                    <td className="text-center">
                      <ActionMenu
                        items={menuItems}
                        onMenuClick={(key) => handleMenuClick(key, item)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-end">
          <PaginationAntd></PaginationAntd>
        </div>
      </div>

      {/* Addyear Modal */}
      {isAddYearModalOpen && (
        <Addyear isOpen={isAddYearModalOpen} onClose={closeAddYearModal} />
      )}

      {/* Updateyear Modal */}
      {isUpdateYearModalOpen && (
        <Updateyear
          isOpen={isUpdateYearModalOpen}
          onClose={closeUpdateyearModal}
          teacher={selectedItem}
        />
      )}
    </div>
  );
};

export default Listyear;
