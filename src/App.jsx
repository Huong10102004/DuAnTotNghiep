import Header from "./layouts/layout_staff/Header/Header";
import "./App.css";
import Sidebar from "./layouts/layout_staff/Sidebar/Sidebar";
import { useTranslation } from "react-i18next";
import "./assets/i18n/i18n"; // Import cấu hình i18n
import Attendance from "./_MODULES/Staff/Attendance/Components/attendance";
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import HistoryAttendance from "/src/_MODULES/Staff/History_attendance/Components/history_attendance";
import HistoryDetailClassAttendance from "./_MODULES/Staff/History_attendance/Components/history-detail-class-attendance";
import HistoryDetailAttendanceOneClass from "./_MODULES/Staff/History_attendance/Components/history-detail-attendance-one-class";
import SchoolYear from "./_MODULES/Staff/Schol-year/Components/school-year";
import ClassAssignStudent from "./_MODULES/Staff/Class-staff/Components/Class-assign-student";
import Student from "./_MODULES/Staff/Student/Components/Student";
import StudentDetail from "./_MODULES/Staff/Student/Components/Student-detail";
import Parent from "./_MODULES/Staff/Parent/Components/Parent";
import ParentDetail from "./_MODULES/Staff/Parent/Components/Parent-detail";
import Login from "./_MODULES/Auth/login";
import Listyear from "./_MODULES/Staff/ListSubject/Components/listyear";
import ListTeacher from "./_MODULES/Staff/ListSubject/Components/list_teachers";
import Attendancebyclass from "./_MODULES/Staff/Attendance/Components/attendancebyclass";
import ClassStaff from "./_MODULES/Staff/Class-staff/Components/Class-staff";
import TestFirebase from './Firebase/Test-firebase'
import { useEffect } from "react";
import { generateToken, messaging } from "./Noticaitions/firebase";
import { onMessage } from "firebase/messaging";

export default function App() {
  const { t, i18n } = useTranslation();
  const isLoginPage = location.pathname === "/login";
  useEffect(() => {
    generateToken();
    onMessage(messaging)
  }, [])
  // Layout dùng cho các trang có sidebar, header, footer
  const LayoutWithSidebar = () => (
    <>
      <div className="row ms-3 me-1 position-relative">
        <div className="col-12 p-0 position-absolute">
          <Header />
        </div>
        <div className="col-12 row p-0">
          <div className="col-2 bg-white">
            <Sidebar />
          </div>
          <div className="col-10 pe-0 h-100vh">
            <Outlet /> {/* Đây là nơi sẽ render các route con */}
          </div>
        </div>
      </div>
    </>
  );
  return <>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />

        {!isLoginPage && (
          <Route element={<LayoutWithSidebar />}>
            {/* attendance */}

            <Route path="/staff/attendance" element={<Attendance />} />
            <Route path="/staff/attendance/:id" element={<Attendancebyclass />} />
            <Route path="/staff/history_attendance" element={<HistoryAttendance />} />
            <Route path="/staff/history_attendance/detail/:id" element={<HistoryDetailClassAttendance />} />
            <Route path="/staff/history_attendance/detail/attendance/:id" element={<HistoryDetailAttendanceOneClass />} />

            {/* school year */}
            <Route path="/staff/school-year" element={<SchoolYear />} />

            {/* class */}
            <Route path="/staff/class" element={<ClassStaff />} />
            <Route path="/staff/class/assign_student/:id" element={<ClassAssignStudent />} />

            {/* students */}
            <Route path="/staff/student" element={<Student />} />
            <Route path="/staff/student/detail/:id" element={<StudentDetail />} />

            {/* parents */}
            <Route path="/staff/parent" element={<Parent />} />
            <Route path="/staff/parent/detail/:id" element={<ParentDetail />} />

            {/* teachers */}
            <Route path="/staff/teacher" element={<ListTeacher />} />

            {/*  */}
            <Route path="/staff/year" element={<Listyear />} />
            <Route path="/test" element={<TestFirebase />} />

          </Route>
        )}
      </Routes>
    </Router>
  </>;
}
