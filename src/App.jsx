import Header from "./layouts/layout_staff/Header/Header";
import "./App.css";
import Sidebar from "./layouts/layout_staff/Sidebar/Sidebar";
import { useTranslation } from "react-i18next";
import "./assets/i18n/i18n"; // Import cấu hình i18n
// import Attendance from "./_MODULES/Staff/Attendance/Components/attendance";
import Attendance from "./_MODULES/Staff/Attendance/Components/attendance";
// import { Routes } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HistoryAttendance from "./_MODULES/Staff/History_attendance/Components/History_attendance";
import ListSubject from "./_MODULES/Staff/ListSubject/Components/list_subject";
import ListTeacher from "./_MODULES/Staff/ListSubject/Components/list_teachers";
import Attendancebyclass from "./_MODULES/Staff/Attendance/Components/attendancebyclass";
export default function App() {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Router>
        <div className="row position-relative me-1 ms-3">
          <div className="col-12 position-absolute p-0">
            <Header></Header>
          </div>
          <div className="col-12 row p-0">
            <div className="col-2 bg-white">
              <Sidebar />
            </div>

            <div className="col-10 h-100vh pe-0">
              <Routes>
                <Route path="/staff/attendance" element={<Attendance />} />
                <Route
                  path="/staff/history_attendance"
                  element={<HistoryAttendance />}
                />
                <Route
                  path="/staff/history_attendance/detail/:id"
                  element={<HistoryAttendance />}
                />
                <Route path="/staff/list_subject" element={<ListSubject />} />
                <Route path="/staff/list_teachers" element={<ListTeacher />} />
                <Route
                  path="/staff/attendancebyclass"
                  element={<Attendancebyclass />}
                />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}
