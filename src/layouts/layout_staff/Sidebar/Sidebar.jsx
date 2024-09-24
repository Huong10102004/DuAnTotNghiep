import React, { useEffect, useState } from "react";
import sidebar_home from '../../../assets/images/svg/sidebar_home.svg'
import icon_teacher from '../../../assets/images/svg/icon_teacher.svg'
import icon_attendance from '../../../assets/images/svg/icon_attendance.svg'
import icon_mark from '../../../assets/images/svg/icon_mark.svg'
import icon_parent from '../../../assets/images/svg/icon_parent.svg'
import icon_permission from '../../../assets/images/svg/icon_permission.svg'
import icon_student from '../../../assets/images/svg/icon_student.svg'
import icon_system from '../../../assets/images/svg/icon_system.svg'
import icon_timetable from '../../../assets/images/svg/icon_timetable.svg'
import icon_report from '../../../assets/images/svg/icon_report.svg'
import home from '../../../assets/images/svg/home.svg'
import { useTranslation } from 'react-i18next';
import '../../../assets/i18n/i18n'; // Import cấu hình i18n
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const { t, i18n } = useTranslation();

  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

   // Cập nhật activePath khi location.pathname thay đổi
   useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const isActive = (path) => activePath === path;

  return <div className="">
    <div className="bg-white h-100vh pt-6rem d-flex flex-column justify-content-between">
      <div className="w-100">
        <div className="d-flex align-items-center"><img src={sidebar_home}/> <span className="ps-3 fs-18px fw-700">{t('home')}</span></div>
        <ul className="mt-4">
          <li className={`d-flex align-items-center ps-3 py-2 cursor-pointer ${isActive('/') ? 'active' : ''}`}><img src={home}/> <span className="ps-2">{t('overView')}</span></li>
          <li className={`d-flex align-items-center ps-3 py-2 cursor-pointer ${isActive('/staff/teacher') ? 'active' : ''}`}><img src={icon_teacher}/> <span className="ps-2">{t('teacher')}</span></li>
          <li className={`d-flex align-items-center ps-3 py-2 cursor-pointer ${isActive('/staff/student') ? 'active' : ''}`}><img src={icon_student}/> <span className="ps-2">{t('student')}</span></li>
          <li className={`d-flex align-items-center ps-3 py-2 cursor-pointer ${isActive('/staff/parent') ? 'active' : ''}`}><img src={icon_parent}/> <span className="ps-2">{t('parent')}</span></li>
          <li className={`d-flex align-items-center ps-3 py-2 cursor-pointer ${isActive('/staff/timetable') ? 'active' : ''}`}><img src={icon_timetable}/> <span className="ps-2">{t('timetable')}</span></li>
          <Link to="/staff/attendance"><li className={`d-flex align-items-center ps-3 py-2 cursor-pointer ${isActive('/staff/attendance') ? 'active' : ''}`}><img src={icon_attendance}/> <span className="ps-2">{t('attendance')}</span></li></Link>
          <li className={`d-flex align-items-center ps-3 py-2 cursor-pointer ${isActive('/staff/report') ? 'active' : ''}`}><img src={icon_report}/> <span className="ps-2">{t('report')}</span></li>
          <li className={`d-flex align-items-center ps-3 py-2 cursor-pointer ${isActive('/staff/system') ? 'active' : ''}`}><img src={icon_system}/> <span className="ps-2">{t('system')}</span></li>
          <li className={`d-flex align-items-center ps-3 py-2 cursor-pointer ${isActive('/staff/permission') ? 'active' : ''}`}><img src={icon_permission}/> <span className="ps-2">{t('permission')}</span></li>
          <li className={`d-flex align-items-center ps-3 py-2 cursor-pointer ${isActive('/staff/mark') ? 'active' : ''}`}><img src={icon_mark}/> <span className="ps-2">{t('mark')}</span></li>
          <li className={`d-flex align-items-center ps-3 py-2 cursor-pointer ${isActive('/staff/home') ? 'active' : ''}`}><img src={home}/> <span className="ps-2">{t('home')}</span></li>
          <Link to="/staff/history_attendance"><li className={`d-flex align-items-center ps-3 py-2 cursor-pointer ${isActive('/staff/history_attendance') ? 'active' : ''}`}><img src={icon_attendance}/> <span className="ps-2">{t('historyAttendance')}</span></li></Link>
        </ul>
      </div>

      <div className="w-100">
        <ul className="mt-4 mb-4">
          <li className="d-flex align-items-center active ps-3 py-2"><img src={home}/> <span className="ps-2">{t('darkMode')}</span></li>
          <li className="d-flex align-items-center ps-3 py-2"><img src={home}/> <span className="ps-2">{t('logout')}</span></li>
        </ul>
      </div>
    </div>
  </div>;
}

export default Sidebar;
 