import Header from "./layouts/layout_staff/Header/Header";
import './App.css'
import Sidebar from "./layouts/layout_staff/Sidebar/Sidebar";
import { useTranslation } from 'react-i18next';
import './assets/i18n/i18n'; // Import cấu hình i18n
import Attendance from "./_MODULES/Staff/Attendance/Components/attendance";
// import { Routes } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HistoryAttendance from "./_MODULES/Staff/History_attendance/Components/History_attendance";

export default function App() {
  const { t, i18n } = useTranslation();

  return <>
   <Router>
    <div className="row ms-3 me-1 position-relative">
        <div className="col-12 p-0 position-absolute">
          <Header></Header>
        </div>
        <div className="col-12 row p-0">
            <div className="col-2 bg-white">
              <Sidebar/>
            </div>

            <div className="col-10 pe-0 h-100vh">
              <Routes>
                <Route path="/staff/attendance" element={<Attendance />} />
                <Route path="/staff/history_attendance" element={<HistoryAttendance/>} />
                <Route path="/staff/history_attendance/detail/:id" element={<HistoryAttendance/>} />
              </Routes>
            </div>
        </div>
      </div>
   </Router>
  </>;
}
