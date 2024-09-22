import React from "react";
import sidebar_home from '../../../assets/images/svg/sidebar_home.svg'
import home from '../../../assets/images/svg/home.svg'
import { useTranslation } from 'react-i18next';
import '../../../assets/i18n/i18n'; // Import cấu hình i18n

function Sidebar() {
  const { t, i18n } = useTranslation();

  return <div className="">
    <div className="bg-white h-100vh pt-6rem d-flex flex-column justify-content-between">
      <div className="w-100">
        <div className="d-flex align-items-center"><img src={sidebar_home}/> <span className="ps-3 fs-18px fw-700">Trang Chủ</span></div>
        <ul className="mt-4">
          <li className="d-flex align-items-center active ps-3 py-2"><img src={home}/> <span className="ps-2">{t('overView')}</span></li>
          <li className="d-flex align-items-center ps-3 py-2"><img src={home}/> <span className="ps-2">{t('teacher')}</span></li>
          <li className="d-flex align-items-center ps-3 py-2"><img src={home}/> <span className="ps-2">{t('student')}</span></li>
          <li className="d-flex align-items-center ps-3 py-2"><img src={home}/> <span className="ps-2">{t('parent')}</span></li>
          <li className="d-flex align-items-center ps-3 py-2"><img src={home}/> <span className="ps-2">Thời khóa biểu</span></li>
          <li className="d-flex align-items-center ps-3 py-2"><img src={home}/> <span className="ps-2">Điểm danh</span></li>
          <li className="d-flex align-items-center ps-3 py-2"><img src={home}/> <span className="ps-2">Báo cáo</span></li>
          <li className="d-flex align-items-center ps-3 py-2"><img src={home}/> <span className="ps-2">Hệ thống</span></li>
          <li className="d-flex align-items-center ps-3 py-2"><img src={home}/> <span className="ps-2">phân quyền</span></li>
          <li className="d-flex align-items-center ps-3 py-2"><img src={home}/> <span className="ps-2">Điểm số</span></li>
          <li className="d-flex align-items-center ps-3 py-2"><img src={home}/> <span className="ps-2">Trang Chủ</span></li>
        </ul>
      </div>

      <div className="w-100">
        <ul className="mt-4 mb-4">
          <li className="d-flex align-items-center active ps-3 py-2"><img src={home}/> <span className="ps-2">Chế độ tối</span></li>
          <li className="d-flex align-items-center ps-3 py-2"><img src={home}/> <span className="ps-2">Đăng xuất</span></li>
        </ul>
      </div>
    </div>
  </div>;
}

export default Sidebar;
 