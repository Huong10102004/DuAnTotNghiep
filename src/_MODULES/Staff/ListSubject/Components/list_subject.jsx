import React, { useEffect, useState } from "react";
import PaginationAntd from "../../../../_Shared/Components/Pagination/Pagination";
import { getListClassToAttendance } from "../../../../Services/Attendance/attendance";
import { seedToServe } from "../../../../Services/Attendance/the_bao";
import { API_BASE_URL } from "../../../../Services/ApiService";
// import "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js";

const ListSubject = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tableHtml, setTableHtml] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function showSubjectList () {
      let res = await seedToServe(API_BASE_URL + "manager/subject");
      setItems(res.data);
      // console.log("res.data", res.data);
      // console.log(items);
      setTotal(res.data.length);

      let html = ``;
      
      items.map(function (item, index) {
  
        html = html + `
        
          <tr className="align-middle">
          <td className="text-center">${index + 1}</td>
          <td>
            <div className="ps-10">
              <b>${item.subjectName}</b>
            </div>
          </td>
          </tr>
        
        `
  
      });
  
      setTableHtml(html);

    }

    showSubjectList();

  }, []);

  useEffect(function () {

    $("#table_main").html(tableHtml);
    // console.log(tableHtml);
  }, [tableHtml]);


  return (
    <div>
      {/* <header className="h-[100px] w-full"></header> */}
      <div className="pt-6rem h-100vh bg-white px-4">
        <h1 className="fs-16">Môn học</h1>
        <p className="mt-2">Task/Attendance/Attendance sheet</p>

        <div className="align-items-end mt-2">
          <span>Số môn học theo bộ giáo dục và đào tạo : {total} Môn học</span>
          <a href="/staff/gan-subject-cho-class" className="ms-4 btn btn-primary">Gán môn học vào lớp học</a>
          {/* <input
            placeholder="Tìm kiếm...."
            className={`bg-color-white-smoke border-radius-10px w-300px px-3 py-2`}
          /> */}
        </div>

        <div className="table-responsive mt-4">
          <table className="table-bordered table min-w-full border-collapse border border-gray-300">
            <thead className="bg-color-blue text-white">
              <tr>
                <th className="w-5 text-center">STT</th>
                <th>
                  <span className="ps-10">Tên môn học</span>
                </th>
              </tr>
            </thead>
            <tbody id="table_main">
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListSubject;
