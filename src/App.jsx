import Header from "./layouts/layout_staff/Header/Header";
import './App.css'
import Sidebar from "./layouts/layout_staff/Sidebar/Sidebar";
import { useTranslation } from 'react-i18next';
import './assets/i18n/i18n'; // Import cấu hình i18n
import Attendance from "./_MODULES/Staff/Attendance/Components/attendance";

export default function App() {
  const { t, i18n } = useTranslation();

  return <>
    <div className="row mx-3 position-relative">
      <div className="col-12 p-0 position-absolute">
        <Header></Header>
      </div>
      <div className="col-12 row p-0">
          <div className="col-2 bg-white">
            <Sidebar/>
          </div>

          <div className="col-10">
            <Attendance></Attendance>
          </div>
      </div>
    </div>
  </>;
}
