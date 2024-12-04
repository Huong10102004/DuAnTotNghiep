import React, { useEffect, useState } from "react";
import PaginationAntd from "../../../../_Shared/Components/Pagination/Pagination";
import { getListClassToAttendance } from "../../../../Services/Attendance/attendance";
import "../../../../_Shared/Css/gan_subject_cho_class.css";
import { seedToServe, seedToServeAxios } from "../../../../Services/Attendance/the_bao";
import { API_BASE_URL, ApiService } from "../../../../Services/ApiService";
// import "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js";
import NotificationCustom from "../../../../_Shared/Components/Notification-custom/Notification-custom";

const GanSubjectChoClass = () => {

  const [schoolYearId, setSchoolYearId] = useState(1);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [htmlClass, setHtmlClass] = useState('');
  const [htmlSubject, setHtmlSubject] = useState('');
  const [chooseSubjects, setChooseSubjects] = useState([]);
  const [chooseClass, setChooseClass] = useState(0);
  const [notification, setNotification] = useState(false);



  useEffect(function () {
  
    async function showClassList () {

       let res = await seedToServe(API_BASE_URL + "manager/subject/currentClass", {
          "schoolYearId": schoolYearId
        });

        setClasses(res.data);

    }

    showClassList()
  
  }, []);


  function chooseSubjectFun (e) {

    let checked = e.target.checked;
    let arr = [];
    if (checked) {
      arr = [
        ...chooseSubjects,
        e.target.value
      ];
    } else {
      arr = [...chooseSubjects.filter(item => item !== e.target.value)]
    }



    setChooseSubjects([...arr]);

  }


  async function chooseClassFun (e) {

    let id = e.target.value;

    setChooseClass(id);

    let res = await seedToServe(API_BASE_URL + "manager/subject/classNoHasSubject", {
      "classId": id
    });

    setSubjects([...Object.values(res.data)]);
    $('.input_subject').prop('checked', false);
    setChooseSubjects([]);
  }

  async function submitFun () {

    console.log("chooseClass", chooseClass);
    console.log("chooseSubjects", chooseSubjects);
   

    let res = await seedToServe(API_BASE_URL + "manager/subject/mix_subject_for_class", JSON.stringify({
      "classId": chooseClass,
      "subjects": [
        ...chooseSubjects
      ]
    }), "POST");

    if (res.msg == "Thêm mới thành công") {

      let arr = [...subjects.filter(item => !chooseSubjects.includes(String(item.subjectId)))];
      console.log(arr);
      setSubjects([...arr]);
      $('.input_subject').prop('checked', false);
      console.log("Gán thành công");
      setNotification(<NotificationCustom type="success" message="Gán thành công" title="Thành công" />);

    } else {
      console.log("Gán thất bại");
      setNotification(<NotificationCustom type="error" message="Gán thất bại" title="Thất bại" />);
    }

  }

  

  return (
    <div>


    {
      notification && 
      <div>{notification}</div>
    
    }

      {/* <header className="h-[100px] w-full"></header> */}
      <div className="pt-6rem h-100vh bg-white px-4">
        <h1 className="fs-16">Gán môn học cho lớp học</h1>
        <p className="mt-2">Task/Attendance/Attendance sheet</p>


        <div className="container">
    <div className="panel">
      <h2>Lớp học</h2>
      <div className="list">
        {classes.map(function (item, index) {
          return <label key={index}>
          {item.className}
          <input type="radio" className="form-check-input" onClick={(e) => chooseClassFun(e)} name="class" value={item.classId}/>
        </label>
        })}
      </div>
    </div>
    <div className="panel">
      <h2>Môn học</h2>
      <div className="list" id="list_subject">
        {

        subjects.map(function (item, index) {

          return <label key={index}>
          {item.subjectName}
          <input type="checkbox" onClick={(e) => chooseSubjectFun(e)} className="input_subject form-check-input" value={item.subjectId}/>

        </label>

        })

        }
      </div>
    </div>
  </div>

  <div className="text-end">
    <button onClick={submitFun} className="btn btn-primary me-4">Gán</button>
  </div>

      
      </div>
    </div>
  );
};

export default GanSubjectChoClass;
