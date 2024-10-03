import Header from "./layouts/layout_staff/Header/Header";
import "./App.css";
import Sidebar from "./layouts/layout_staff/Sidebar/Sidebar";
import { useTranslation } from "react-i18next";
import "./assets/i18n/i18n"; // Import cấu hình i18n
// import Attendance from "./_MODULES/Staff/Attendance/Components/attendance";
import Attendance from "./_MODULES/Staff/Attendance/Components/attendance";
// import { Routes } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HistoryAttendance from "/src/_MODULES/Staff/History_attendance/Components/history_attendance";
import HistoryDetailClassAttendance from "./_MODULES/Staff/History_attendance/Components/history-detail-class-attendance";
import HistoryDetailAttendanceOneClass from "./_MODULES/Staff/History_attendance/Components/history-detail-attendance-one-class";
import SchoolYear from "./_MODULES/Staff/Schol-year/Components/school-year";
import ClassStaff from "./_MODULES/Staff/Class-staff/components/Class-staff";
import ClassAssignStudent from "./_MODULES/Staff/Class-staff/Components/Class-assign-student";
// import ListTeacher from "./_MODULES/Staff/ListSubject/Components/list_teachers";
import AddEmployeePopup from "./_MODULES/Staff/ListSubject/Components/add_teachers";
import ListSubject from "./_MODULES/Staff/ListSubject/Components/list_subject";
import List_teachers from "./_MODULES/Staff/ListSubject/Components/list_teachers";
import Addteacher from "./_MODULES/Staff/ListSubject/Components/add_teachers";
import Update_teacher from "./_MODULES/Staff/ListSubject/Components/update_teacher";
import Listyear from "./_MODULES/Staff/ListSubject/Components/listyear";

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
                {/* attendance */}
                <Route path="/staff/attendance" element={<Attendance />} />
                <Route
                  path="/staff/history_attendance"
                  element={<HistoryAttendance />}
                />
                <Route
                  path="/staff/history_attendance/detail/:id"
                  element={<HistoryDetailClassAttendance />}
                />
                <Route path="/staff/add_teacher" element={<Addteacher />} />
                <Route path="/staff/list_teacher" element={<List_teachers />} />
                <Route path="/staff/listyear" element={<Listyear />} />
                <Route path="/staff/list_subject" element={<ListSubject />} />
                <Route
                  path="/staff/update_teacher"
                  element={<Update_teacher />}
                />

                <Route
                  path="/staff/history_attendance/detail/attendance/:id"
                  element={<HistoryDetailAttendanceOneClass />}
                />

                {/* school year */}
                <Route path="/staff/school-year" element={<SchoolYear />} />

                {/* class */}
                <Route path="/staff/class" element={<ClassStaff />} />
                <Route
                  path="/staff/class/assign_student/:id"
                  element={<ClassAssignStudent />}
                />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}
