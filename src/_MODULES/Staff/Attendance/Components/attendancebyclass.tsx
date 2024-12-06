import React, { useEffect, useState } from "react";
import { ApiService } from "../../../../Services/ApiService";
import Loading from "../../../../_Shared/Components/Loading/Loading";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from 'react-router-dom';
import NotificationCustom from "../../../../_Shared/Components/Notification-custom/Notification-custom";

const Attendancebyclass = () => {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ type: '', message: '', title: '' });
  const [listData, setListData]: any = useState([]);
  const { register, handleSubmit, watch } = useForm();
  const classId = useParams();
  const queryParams = new URLSearchParams(location.search);
  const action = queryParams.get('action');
  const navigate = useNavigate(); // Hook để điều hướng

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ type: '', message: '', title: '' }); // Ẩn thông báo sau 3 giây
      }, 3000);

      return () => clearTimeout(timer); // Xóa bộ hẹn giờ khi component bị unmount hoặc message thay đổi
    }
  }, [notification]);  // Mỗi khi statusCode thay đổi, đoạn này sẽ chạy


  const onSubmit = async () => {
    try {
      setLoading(true);

      let responseData
      if (action == 'update') {
        let dataRequest: any = {
          class_id: classId.id,
          keyWord: "",
          students: listData.map(item => ({
            student_id: item.id,
            status: item.status,
            note: item.note,
          }))
        };
        responseData = await ApiService(`manager/rollcall/update/attendaced/${classId.id}`, 'PUT', dataRequest);
        setLoading(false);
        if (responseData.msg.includes('success')) {
          setNotification({ type: 'success', message: 'Cập nhật điểm danh thành công', title: 'Thành công' });
          // navigate('/staff/attendance/');
        }
      } else {
        let dataRequest: any = {
          classId: classId.id,
          rollcallData: listData.map(item => ({
            studentID: item.id,
            status: item.status,
            note: item.note,
          }))
        };

        responseData = await ApiService(`manager/rollcall/attendaced/student/${classId.id}`, 'POST', dataRequest);
        setLoading(false);
        if (responseData.msg.includes('success')) {
          setNotification({ type: 'success', message: 'Điểm danh thành công', title: 'Thành công' });
          // navigate('/staff/attendance/');

        }
      }

    } catch (error) {
      setLoading(true);
      setNotification({ type: 'error', message: 'Có lỗi liên quan đến hệ thống', title: 'Lỗi' });
      // navigate('/staff/attendance/');
    }
  };

  const handleChange = (event, index) => {
    const status = parseInt(event.target.value.split('-')[0].replace('option', '')); // Parse option to status value
    const updatedData = [...listData];
    updatedData[index] = { ...updatedData[index], status: status }; // Update the status for the student at the given index
    setListData(updatedData); // Update the state
  };

  const getItems = async () => {
    setLoading(true);
    try {
      let dataRequest: any = {
        classId: classId.id,
        date: 123456789,
        keyWord: ""
      }

      const responseData = await ApiService(`manager/rollcall/attendaced/class`, 'POST', dataRequest);
      if (responseData) {
        setListData(responseData?.data?.rollCall);
      }
    } catch (error) {
      setLoading(true);
      setNotification({ type: 'error', message: 'Có lỗi liên quan đến hệ thống', title: 'Lỗi' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row">
      <Loading isLoading={loading} />
      <div className="w-[100%]">
        <div className="ml-4">
          <h1 className="text-3xl font-bold text-[#4154F1]">Điểm danh</h1>
          <div>
            <span className="text-[#989797]">Track / </span>
            <span className="text-[#989797]">Attendance / </span>
            <span>Attendance sheet</span>
          </div>
          <button
            className="mt-2 bg-[#01A4FF] p-2 px-4 text-white"
            onClick={() => navigate('/staff/attendance/')}
          >
            Quay lại
          </button>
          <div className="flex space-x-52">
            <div className="mt-2 flex space-x-3">
              <p>
                Số lượng học sinh :
                <span className="font-bold text-[#01A4FF]"> 48 học sinh |</span>
              </p>
              <p>
                Số học sinh vắng mặt :
                <span className="font-bold text-[#EE1C1C]"> 0 học sinh |</span>
              </p>
              <p>
                Số học sinh có mặt :{" "}
                <span className="font-bold text-[#00CB58]"> 48 học sinh</span>
              </p>
            </div>
            <div className="mt-2 flex space-x-4">
              <button className="h-10 rounded-lg bg-[#F3F6F9] px-60 pl-4 text-left text-[#A0AEC0]">
                Tìm Kiếm
              </button>
            </div>
          </div>
          <div className="mt-2 overflow-x-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-blue-500 text-white">
                    <th className="border border-gray-300 p-2">STT</th>
                    <th className="border border-gray-300 p-2">Họ và tên</th>
                    <th className="border border-gray-300 p-2">Ngày sinh</th>
                    <th className="border border-gray-300 p-2">Ghi chú</th>
                    <th className="border border-gray-300 p-2">Có mặt</th>
                    <th className="border border-gray-300 p-2">Nghỉ có phép</th>
                    <th className="border border-gray-300 p-2">Nghỉ không phép</th>
                    <th className="border border-gray-300 p-2">Đến muộn có phép</th>
                  </tr>
                </thead>
                <tbody>
                  {listData.map((item, index) => (
                    <tr className="bg-white text-center" key={index}>
                      <td className="border border-gray-300 p-2">{index + 1}</td>
                      <td className="border border-gray-300 p-2">{item.fullname}</td>
                      <td className="border border-gray-300 p-2">{item.dob}</td>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="text"
                          placeholder="Ghi chú học sinh ..."
                          className="border border-black text-[#989797] w-100"
                          value={item.note}
                          onChange={(e) => {
                            const updatedData = [...listData];
                            updatedData[index].note = e.target.value;
                            setListData(updatedData);
                          }}
                        />
                      </td>
                      <td className="border p-2">
                        <label>
                          <input
                            type="radio"
                            value="1"
                            name={"options" + index}
                            checked={item.status === 1}
                            onChange={(e) => handleChange(e, index)}
                          />
                        </label>
                      </td>
                      <td className="border p-2">
                        <input
                          type="radio"
                          value="2"
                          name={"options" + index}
                          checked={item.status === 2}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="radio"
                          value="3"
                          name={"options" + index}
                          checked={item.status === 3}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="radio"
                          value="4"
                          name={"options" + index}
                          checked={item.status === 4}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="mt-4 rounded-lg bg-green-500 p-2 px-4 text-white"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {notification.message && <NotificationCustom type={notification.type} message={notification.message} title={notification.title} />}
    </div>
  );
};

export default Attendancebyclass;
