import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../layout_staff/Header/Header";
import Footer from "../layout_staff/Footer/Footer";
import Sidebaruser from "../../_MODULES/user/sidebar/sidebaruser";

function Userlayout() {
  return (
    <>
      <Header />
      <div className="sidebarr flex min-h-screen bg-gray-100">


      <Sidebaruser/>
      <Outlet />
      </div>
      
    </>
  );
}

export default Userlayout;
