import React, { useEffect, useState } from "react";
import PaginationAntd from "../../../../_Shared/Components/Pagination/Pagination";
import icon_edit from "../../../../assets/images/svg/icon_edit.svg";
import icon_delete from "../../../../assets/images/svg/icon_delete.svg";
import icon_assign_teacher from "../../../../assets/images/svg/icon_assign_teacher.svg";
import ActionMenu from "../../../../_Shared/Components/Action-menu/Action-menu";

import Addteacher from "./add_teachers";
import Update_teacher from "./update_teacher";
import { ApiService } from "../../../../Services/ApiService";
import Loading from "../../../../_Shared/Components/Loading/Loading";
import { formatTimestamp } from "../../../../_Shared/Pipe/Format-timestamp";
import { Modal } from "antd";
import NotificationCustom from "../../../../_Shared/Components/Notification-custom/Notification-custom";
import StatusTeacherDirective from "../../../../_Shared/Directive/status-teacher-directive";
import AccessTypeDirective from "../../../../_Shared/Directive/Access-type-directive";
import { EDIT, ENTER, LIMIT_TOTAL_SIZE, SET_TIMEOUT_MESSAGE } from "../../../../_Shared/Constant/constant";
import NoDataComponent from "../../../../_Shared/Components/No-data/no-data";
import { useTranslation } from "react-i18next";
import icon_plus from "../../../../assets/images/svg/icon_plus.svg"
import icon_export_file from "../../../../assets/images/svg/export_file.svg"

const ListTeacher = () => {
  const { t, i18n } = useTranslation();
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isAddTeacherModalOpen, setIsAddTeacherModalOpen] = useState(false);
  const [isUpdateTeacherModalOpen, setIsUpdateTeacherModalOpen] =useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false); // mở modal confirm xóa
  const [notification, setNotification] = useState({ type: '', message: '', title: '', duration: 3000 });
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [keyWord, setKeyWord] = useState('');


  const menuItems = [
    { key: "edit", label: t("edit"), icon: icon_edit },
    { key: "delete", label: t("remove"), icon: icon_delete },
    {
      key: "assign_teacher",
      label: t("assignTeacher"),
      icon: icon_assign_teacher,
    },
    {
      key: "assign_student",
      label: t("assignStudent"),
      icon: icon_assign_teacher,
    },
  ];

  const handleMenuClick = (key, data) => {
    if (key === EDIT) {
      setSelectedItem(data);
      setIsUpdateTeacherModalOpen(true);
    } 
  };


  const getItems = async () => {
    setLoading(true);
    try {
      const data = await ApiService(`manager/user?pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${keyWord}`);
      console.log(data);
      setItems(data.data);
      console.log(items);
      setTotalItems(data.total)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ type: '', message: '', title: '' });
      }, SET_TIMEOUT_MESSAGE);

      return () => clearTimeout(timer);
    }
  }, [notification]); 

  const openAddTeacherModal = () => setIsAddTeacherModalOpen(true);
  const closeAddTeacherModal = () => setIsAddTeacherModalOpen(false);

  const closeUpdateTeacherModal = () => setIsUpdateTeacherModalOpen(false);

  const handleCallBackApi = () => {
    setNotification({ type: 'success', message: t('teacherUpdate.success'),title: t('success'), duration: SET_TIMEOUT_MESSAGE });
    getItems();
  }

  const showDeleteModal = (data) => {
    if(data){
      setSelectedItem(data);
      setIsModalVisible(true);
    }
  };

  const handleDelete = async (data) => {
    setLoading(true)
    try {
      const response = await ApiService(`manager/user/delete/${data.userId}`, 'post');
      if (response) {
        await getItems();
        setNotification({ type: 'success', message: t('removeTeacherSuccess'),title: 'Thành công' });
      } else {
        setNotification({ type: 'error', message: t('removeTeacherError'),title: t('error') });
      }
    } catch (error) {
      setNotification({ type: 'error', message: t('removeTeacherError'),title: t('error') });
    } finally {
      setLoading(false);
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handlePageChange = async (page) => {
    setPageIndex(page);
  }

  const handleKeyWord = async (event) => {
    if (event.key === ENTER) {
      setKeyWord(event.target.value)
    }
  }

  useEffect(() => {
    getItems(); 
  }, [pageIndex, keyWord,pageSize]);
  return (
    <div>
      <Loading isLoading={loading} />
      <div className="pt-6rem h-100vh bg-white px-4">
        <h1 className="fs-16">{t('teacher')}</h1>

        <div className="d-flex align-items-end mt-2 justify-content-between">
          <p>{t('amount')}: {totalItems} {t('classSingle')}</p>

          <div className="flex w-3/4 justify-end gap-1">
            <input
              placeholder={t('search')}
              className={`bg-color-white-smoke border-radius-10px w-300px px-3 py-2`}
              onKeyDown={handleKeyWord}
            />
            
            <button className="btn bg-color-blue text-color-white d-flex align-items-center">
                {t('exportExcel')} <img className="ps-2 btn-icon-css" src={icon_export_file}/>
            </button>

            <button 
            className="btn bg-color-green-bold text-color-white d-flex align-items-center" 
            onClick={openAddTeacherModal}>
              {t('create')} <img className="ps-2 btn-icon-css" src={icon_plus}/>
            </button>
          </div>
        </div>

        <div className="table-responsive mt-4">
          <table className="table-bordered table min-w-full border-collapse border border-gray-300">
            <thead className="bg-color-blue text-white">
              <tr>
                <th className="w-5 text-center">{t("STT")}</th>
                <th>
                  <span className="ps-10">{t('teacherInformation')}</span>
                </th>
                <th className="text-center">{t('contact')}</th>
                <th className="text-center">{t('homeRoomClass')}</th>
                <th className="text-center">{t('role')}</th>
                <th className="text-center">{t('status')}</th>
                <th className="text-center">{t('dateOfBirth')}</th>
                <th className="text-center">{t('action')}</th>
              </tr>
            </thead>
            <tbody>
              {(items && items?.length) ? items.map((item, index) => (
                <tr className="align-middle" key={item.userId}>
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
                  <td className="fw-700 text-center">{AccessTypeDirective(item.userAccessType)}</td>
                  <td className="fw-700 text-center">{StatusTeacherDirective(item.userStatus)}</td>
                  <td className="text-center">{formatTimestamp(item.userDob)}</td>
                  <td className="text-center">
                    <ActionMenu
                      items={menuItems}
                      onMenuClick={(key) => handleMenuClick(key, item)}
                      onDelete={() => showDeleteModal(item)}
                    />
                  </td>
                </tr>
              )): ''}
            </tbody>
          </table>
          {!items?.length ? 
            <NoDataComponent></NoDataComponent>
          : ''
          }
        </div>
        <div className="d-flex justify-content-end">
          {totalItems > LIMIT_TOTAL_SIZE ? (
            <PaginationAntd onPageChange={handlePageChange} total={totalItems}></PaginationAntd>
          ) : ''}
        </div>
      </div>

      {isAddTeacherModalOpen && (
        <Addteacher
          isOpen={isAddTeacherModalOpen}
          onClose={closeAddTeacherModal}
          reloadApi={handleCallBackApi}
        />
      )}

      {isUpdateTeacherModalOpen && (
        <Update_teacher
          isOpen={isUpdateTeacherModalOpen}
          onClose={closeUpdateTeacherModal}
          teacher={selectedItem}
          reloadApi={handleCallBackApi}
        />
      )}

      <Modal
        title={<div style={{ color: 'red', textAlign: 'center' }}>{t('removeTeacher')}</div>} 
        open={isModalVisible}
        onOk={() => handleDelete(selectedItem)}
        onCancel={handleCancel}
        okText={t('yes')}
        cancelText={t('no')}
        centered={true}
      >
        <hr className="mt-2 mb-3" />
        <p>{t('confirmRemoveTeacher')} <span className="fw-700">{selectedItem?.userName} ({selectedItem?.userCode})</span> {t('no')}?</p>
      </Modal>
      {notification.message && <NotificationCustom type={notification.type} message={notification.message} title={notification.title} duration={notification.duration} />}
    </div>
  );
};

export default ListTeacher;
