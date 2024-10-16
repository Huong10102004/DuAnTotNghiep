import Header from "./layouts/layout_staff/Header/Header";
import "./App.css";
import Sidebar from "./layouts/layout_staff/Sidebar/Sidebar";
import { useTranslation } from "react-i18next";
import "./assets/i18n/i18n"; // Import cấu hình i18n
// import Attendance from "./_MODULES/Staff/Attendance/Components/attendance";
import Attendance from "./_MODULES/Staff/Attendance/Components/attendance";
// import { Routes } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import HistoryAttendance from "/src/_MODULES/Staff/History_attendance/Components/history_attendance";
import HistoryDetailClassAttendance from "./_MODULES/Staff/History_attendance/Components/history-detail-class-attendance";
import HistoryDetailAttendanceOneClass from "./_MODULES/Staff/History_attendance/Components/history-detail-attendance-one-class";
import SchoolYear from "./_MODULES/Staff/Schol-year/Components/school-year";
import ClassStaff from "./_MODULES/Staff/Class-staff/components/Class-staff";
import ClassAssignStudent from "./_MODULES/Staff/Class-staff/Components/Class-assign-student";
import Student from "./_MODULES/Staff/Student/Components/Student";
import StudentDetail from "./_MODULES/Staff/Student/Components/Student-detail";
import Parent from "./_MODULES/Staff/Parent/Components/Parent";
import ParentDetail from "./_MODULES/Staff/Parent/Components/Parent-detail";
import Login from "./_MODULES/Auth/login";
import Parentaccount from "./_MODULES/user/parentaccount/parentaccount";
import Userlayout from "./layouts/Userlayout/Userlayout";

export default function App() {
  const { t, i18n } = useTranslation();
  const isLoginPage = location.pathname === "/login";

  // Layout dùng cho các trang có sidebar, header, footer
  const LayoutWithSidebar = () => (
    <>
      <div className="row position-relative me-1 ms-3">
        <div className="col-12 position-absolute p-0">
          <Header />
        </div>
        <div className="col-12 row p-0">
          <div className="col-2 bg-white">
            <Sidebar />
          </div>
          <div className="col-10 h-100vh pe-0">
            <Outlet /> {/* Đây là nơi sẽ render các route con */}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          {!isLoginPage && (
            <Route element={<LayoutWithSidebar />}>
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

              {/* students */}
              <Route path="/staff/student" element={<Student />} />
              <Route
                path="/staff/student/detail/:id"
                element={<StudentDetail />}
              />

              {/* parents */}
              <Route path="/staff/parent" element={<Parent />} />
              <Route
                path="/staff/parent/detail/:id"
                element={<ParentDetail />}
              />
            </Route>
          )}
     
          <Route path="/user" element={<Userlayout />}>
            <Route path="parentaccount" element={<Parentaccount />}></Route>
          </Route>



        </Routes>
      </Router>
    </>
  );
}
