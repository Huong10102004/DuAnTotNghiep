import Header from "./layouts/layout_staff/Header/Header";
import "./App.css";
import Sidebar from "./layouts/layout_staff/Sidebar/Sidebar";
import { useTranslation } from "react-i18next";
import "./assets/i18n/i18n"; // Import cấu hình i18n
import Attendance from "./_MODULES/Staff/Attendance/attendance";
import Attendancebyclass from "./_MODULES/Staff/Attendance/attendancebyclass";

export default function App() {
  const { t, i18n } = useTranslation();

  return (
    <>
      <div className="row position-relative mx-3">
        <div className="col-12 position-absolute p-0">
          <Header></Header>
        </div>
        <div className="col-12 row p-0">
          <div className="col-2 bg-white">
            <Sidebar />
          </div>

          <div className="col-10">
            <Attendance></Attendance>
            <Attendancebyclass />
          </div>
          <div className="col-10"></div>
        </div>
      </div>
    </>
  );
}
