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
import { formatTimestamp } from "../../../../_Shared/Pipe/Format-timestamp";
import StatusYearSchoolDirective from "../../../../_Shared/Directive/status-year-school-directive";
import { Modal } from "antd";
import NotificationCustom from "../../../../_Shared/Components/Notification-custom/Notification-custom";
import { SET_TIMEOUT_HIDDEN_MODAL, SET_TIMEOUT_MESSAGE } from "../../../../_Shared/Constant/constant";
import { data } from "autoprefixer";
import { Pagination } from 'antd';



const Listyear = () => {
  const [keyWord, setKeyWord] = useState('');  // Biến lưu từ khóa tìm kiếm
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddYearModalOpen, setIsAddYearModalOpen] = useState(false);
  const [isUpdateYearModalOpen, setIsUpdateYearModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false); // mở modal confirm xóa
  const [notification, setNotification] = useState({ type: '', message: '' });
  const [total, setTotal] = useState(0);
  const [pageSizePag, setPageSizePag] = useState(1);
  const [pageTotalPag, setPageTotalPag] = useState(Math.floor(total/15));

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

  const showDeleteModal = (data) => {
    if(data){
      setSelectedItem(data);
      setIsModalVisible(true);
    }
  };

  const handleDelete = async (data) => {
    setLoading(true);
    if (data && data.schoolYearId) {
      try {
        const response = await ApiService(`manager/schoolyear/delete/${data.schoolYearId}`, 'post'); // Gọi API xóa
        if (response) {
          getItems(); // Cập nhật lại danh sách sau khi xóa thành công
          setNotification({ type: 'success', message: 'Xóa năm học thành công',title: 'Thành công' });
          setTimeout(() => {
            setIsModalVisible(false);
          }, SET_TIMEOUT_HIDDEN_MODAL);
        } else {
          setNotification({ type: 'error', message: 'Có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu nhập vào',title: 'Lỗi' });
        }
      } catch (error) {
        setNotification({ type: 'error', message: 'Có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu nhập vào',title: 'Lỗi' });
      } 
    }else{
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Hàm lấy danh sách dữ liệu
  const getItems = async (keyWord = '', pageIndex = 1) => {
    setLoading(true);  // Bắt đầu tải dữ liệu
    setError(null);    // Reset error
    try {
      let url = `manager/schoolyear?keyword=${keyWord}&pageIndex=${pageIndex}`;
      // console.log('url', url);
      const data = await ApiService(url);  // Gọi API lấy danh sách
      // console.log("Dữ liệu trả về từ API: ", data);  // Kiểm tra dữ liệu trả về
      // setItems(Array.isArray(data.data) ? data.data : []);  // Cập nhật danh sách
      let re = data.data ?? []

      if(typeof re === "object"){
        setItems([...Object.values(re)])
      } else {
        setItems(re)
      }
      
      console.log('pageIndex', pageIndex);
      console.log('items', items);
      setTotal(data.total)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);  // Dừng trạng thái tải dữ liệu
    }
  };

  useEffect(() => {
    getItems();  // Gọi API lấy dữ liệu khi component được render lần đầu
  }, [])

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ type: '', message: '', title: '' }); 
      }, SET_TIMEOUT_MESSAGE);

      return () => clearTimeout(timer); 
    }
  }, [notification]);

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

    e.preventDefault();

    console.log("keyWord", keyWord);
    getItems(keyWord);  // Gọi API ngay khi nhấn Enter


    // if (e.key === 'Enter') {
    //   console.log("keyWord", keyWord);
    //   getItems(keyWord);  // Gọi API ngay khi nhấn Enter
    // }

  };


  const handleCallBackApi = () => {
    getItems();
  }

  const onChangePagination = (page, pageSize) => {
    // console.log(`Page: ${page}, PageSize: ${pageSize}`);
    getItems(keyWord, page)
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
            Số năm học: <span className="text-red-600">{total} năm học</span>
          </p>

          <div className="flex w-3/4 justify-end gap-1">
            <form action="" onSubmit={handleKeyDown}  method="post">
              <input
                placeholder="Tìm kiếm...."
                className={`bg-color-white-smoke border-radius-10px w-300px px-3 py-2`}
                value={keyWord}
                onChange={handleSearchChange}
              />
            </form>
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
              { items.length > 0 ? (
                items.map((item, index) => (
                  <tr className="align-middle" key={item.id || index}>
                    <td className="text-center">{index + 1}</td>
                    <td>
                      <div className="ps-10">
                        <span>
                          <b>{item.schoolYearName}</b>
                        </span>
                        <br />
                      </div>
                    </td>
                    <td className="d-flex align-items-center">
                      <div className="ps-10">
                        <span>
                          <b><StatusYearSchoolDirective status={item.schoolYearStatus} /></b>
                        </span>
                        <br />
                      </div>
                    </td>
                    <td className="fw-700 text-center">{formatTimestamp(item.schoolYearStartDate)}</td>
                    <td className="fw-700 text-center">{formatTimestamp(item.schoolYearEndDate)}</td>

                    <td className="text-center">
                      <ActionMenu
                        items={menuItems}
                        onMenuClick={(key) => handleMenuClick(key, item)}
                        onDelete={() => showDeleteModal(item)}
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
          {/* <PaginationAntd onPageChange={1} total={10}></PaginationAntd> */}
          <Pagination defaultCurrent={1} pageSize={15} total={total} onChange={onChangePagination} />
        </div>
      </div>

      {/* Addyear Modal */}
      {isAddYearModalOpen && (
        <Addyear isOpen={isAddYearModalOpen} onClose={closeAddYearModal} reloadApi={handleCallBackApi} />
      )}

      {/* Updateyear Modal */}
      {isUpdateYearModalOpen && (
        <Updateyear
          isOpen={isUpdateYearModalOpen}
          onClose={closeUpdateyearModal}
          data={selectedItem}
          reloadApi={handleCallBackApi}
        />
      )}

    <Modal
        title={<div style={{ color: 'red', textAlign: 'center' }}>Xóa dữ liệu - năm học</div>} 
        open={isModalVisible}
        onOk={() => handleDelete(selectedItem)}
        onCancel={handleCancel}
        okText="Có"
        cancelText="Không"
      >
        <hr className="mt-2 mb-3" />
        {selectedItem && (
          <p>Bạn có chắc chắn muốn xóa năm học <span className="fw-700">{selectedItem.schoolYearName}</span> không?</p>
        )}
      </Modal>

      {notification.message && <NotificationCustom type={notification.type} message={notification.message} title={notification.title} />}
    </div>
  );
};

export default Listyear;
