import React from "react";
import sidebar_home from "../../../assets/images/svg/sidebar_home.svg";
import home from "../../../assets/images/svg/home.svg";
import { useTranslation } from "react-i18next";
import "../../../assets/i18n/i18n"; // Import cấu hình i18n
import { Route, Routes } from "react-router-dom";
import Attendance from "../../../_MODULES/Staff/Attendance/attendance";

function Sidebar() {
  const { t, i18n } = useTranslation();

  return (
    <div className="">
      <div className="h-100vh pt-6rem d-flex flex-column justify-content-between bg-white">
        <div className="w-100">
          <div className="d-flex align-items-center">
            <img src={sidebar_home} />{" "}
            <span className="fs-18px fw-700 ps-3">{t("home")}</span>
          </div>
          <ul className="mt-4">
            <li className="d-flex align-items-center active py-2 ps-3">
              <img src={home} /> <span className="ps-2">{t("overView")}</span>
            </li>
            <li className="d-flex align-items-center py-2 ps-3">
              <img src={home} /> <span className="ps-2">{t("teacher")}</span>
            </li>
            <li className="d-flex align-items-center py-2 ps-3">
              <img src={home} /> <span className="ps-2">{t("student")}</span>
            </li>
            <li className="d-flex align-items-center py-2 ps-3">
              <img src={home} /> <span className="ps-2">{t("parent")}</span>
            </li>
            <li className="d-flex align-items-center py-2 ps-3">
              <img src={home} /> <span className="ps-2">{t("timetagble")}</span>
            </li>
            <li className="d-flex align-items-center py-2 ps-3">
              <img src={home} /> <span className="ps-2">{t("attendance")}</span>
            </li>
            <li className="d-flex align-items-center py-2 ps-3">
              <img src={home} /> <span className="ps-2">{t("report")}</span>
            </li>
            <li className="d-flex align-items-center py-2 ps-3">
              <img src={home} /> <span className="ps-2">{t("system")}</span>
            </li>
            <li className="d-flex align-items-center py-2 ps-3">
              <img src={home} /> <span className="ps-2">{t("permission")}</span>
            </li>
            <li className="d-flex align-items-center py-2 ps-3">
              <img src={home} /> <span className="ps-2">{t("mark")}</span>
            </li>
            <li className="d-flex align-items-center py-2 ps-3">
              <img src={home} /> <span className="ps-2">{t("home")}</span>
            </li>
          </ul>
        </div>

        <div className="w-100">
          <ul className="mb-4 mt-4">
            <li className="d-flex align-items-center active py-2 ps-3">
              <img src={home} /> <span className="ps-2">{t("darkMode")}</span>
            </li>
            <li className="d-flex align-items-center py-2 ps-3">
              <img src={home} /> <span className="ps-2">{t("logout")}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
