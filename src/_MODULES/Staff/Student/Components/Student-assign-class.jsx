import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import icon_assign_student from "../../../../assets/images/svg/icon_assign_student.svg";
import icon_assign_student_table from "../../../../assets/images/svg/icon_assign_student_table.svg";
import { Table, Checkbox, Input, Button, Select } from "antd"; // Ant Design
import { createStyles } from "antd-style";
import { ApiService } from "../../../../Services/ApiService";

const { Search } = Input;
const { Option } = Select;

const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: unset;
          }
        }
      }
    `,
  };
});

const StudentsAssignClass = () => {
  const [data, setData] = useState([]);

  const { t } = useTranslation(); // dịch đa ngôn ngữ
  const { styles } = useStyle(); // style antd
  const [unassignedStudents, setUnassignedStudents] = useState([]); // Dữ liệu học sinh chưa gán
  const [assignedStudents, setAssignedStudents] = useState([]); // Dữ liệu học sinh đã gán
  const [checkAll, setCheckAll] = useState(false); // State cho Check All
  const [loading, setLoading] = useState(true); // State cho loading

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true); // Bắt đầu trạng thái loading
      try {
        const responseData = await ApiService(
          `manager/student`, // Đường dẫn API
          'GET' // Phương thức GET
        );
      
        if (responseData && responseData.data) {
          setUnassignedStudents(responseData.data); // Cập nhật state với dữ liệu học sinh
        }
      } catch (error) {
        setLoading(true);
        console.error("Lỗi khi lấy danh sách học sinh:", error);
      } finally {
        setLoading(false); // Kết thúc trạng thái loading dù có lỗi hay không
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    console.log(unassignedStudents);  // In ra dữ liệu để kiểm tra
  }, [unassignedStudents]);
  // Hàm di chuyển học sinh từ "Học sinh chưa gán" sang "Học sinh đã gán"
  const assignStudents = () => {
    const selectedStudents = unassignedStudents.filter(
      (student) => student.selected
    );
  
    // Cập nhật state với cách sử dụng callback để đảm bảo giá trị mới nhất của state
    setAssignedStudents((prevAssignedStudents) => [
      ...prevAssignedStudents,
      ...selectedStudents,
    ]);
    setUnassignedStudents((prevUnassignedStudents) =>
      prevUnassignedStudents.filter((student) => !student.selected)
    );
  };

  // Hàm xử lý khi chọn học sinh
  const handleSelectStudent = (id) => {
    const updatedStudents = unassignedStudents.map((student) =>
      student.id === id ? { ...student, selected: !student.selected } : student
    );

    // Kiểm tra xem tất cả các checkbox đã được chọn hay chưa
    const allSelected = updatedStudents.every((student) => student.selected);
    setCheckAll(allSelected); // Cập nhật trạng thái Check All
    setUnassignedStudents(updatedStudents);
  };

  // Hàm xử lý Check All
  const handleCheckAll = () => {
    const newCheckAll = !checkAll;
    setCheckAll(newCheckAll);
    setUnassignedStudents(
      unassignedStudents.map((student) => ({
        ...student,
        selected: newCheckAll,
      }))
    );
  };

  // Cấu trúc cột cho bảng "Học sinh chuyển lớp"
  const columnsUnassigned = [
    {
      title: <Checkbox checked={checkAll} onChange={handleCheckAll}></Checkbox>,
      render: (text, record) => (
        <Checkbox
          checked={record.selected}
          onChange={() => handleSelectStudent(record.id)}
        ></Checkbox>
      ),
      width: 50,
    },
    { title: "Họ và tên", dataIndex: "name", key: "fullName" },
    { title: "Ngày sinh", dataIndex: "birthDate", key: "birthDate" },
    { title: "Lớp", dataIndex: "class", key: "class" },
    { title: "Khối", dataIndex: "grade", key: "grade" },
  ];

  // Cấu trúc cột cho bảng "Học sinh đã gán"
  const columnsAssigned = [
    { title: "STT", dataIndex: "id", key: "id" },
    { title: "Họ và tên", dataIndex: "name", key: "name" },
    { title: "Ngày sinh", dataIndex: "birthDate", key: "birthDate" },
    { title: "Lớp", dataIndex: "class", key: "class" },
    { title: "Khối", dataIndex: "grade", key: "grade" },
  ];

  return (
    <div>
      <div className="pt-6rem h-100vh bg-white px-4">
        <h1 className="fs-16">Gán học sinh vào lớp học</h1>

        <div className="d-flex align-items-end mt-2">
          <p>
            Bạn đã chọn<span className="fw-700"> {unassignedStudents.length} học sinh </span>. Bạn vui
            lòng chọn lớp dự định chuyển tới và click vào nút: chuyển học sinh để
            hoàn tất công việc
          </p>
          <button
            className="btn btn-primary d-flex align-items-center ms-3 py-1"
            onClick={assignStudents}
          >
            <img src={icon_assign_student} className="me-2" /> Chuyển lớp
          </button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px 0",
          }}
          className="mt-10"
        >
          {/* Bảng học sinh chưa gán */}
          <div style={{ width: "45%" }} className="border px-2">
            <h3 className="fw-700 mb-4 mt-3">Học sinh chuyển lớp</h3>
            <div style={{ marginBottom: "20px" }}>
              <div className="row">
                <div className="col-sm-1">
                  <span>Khối</span>
                </div>
                <div className="col-sm-5">
                  <Select defaultValue="Chọn khối" className="w-100">
                    <Option value="Khối 6">Khối 6</Option>
                    <Option value="Khối 7">Khối 7</Option>
                  </Select>
                </div>
                <div className="col-sm-1">
                  <span>Lớp</span>
                </div>
                <div className="col-sm-5">
                  <Select defaultValue="Chọn lớp" className="w-100">
                    <Option value="Lớp 6A">Lớp 6A</Option>
                    <Option value="Lớp 6B">Lớp 6B</Option>
                  </Select>
                </div>
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center my-3">
              <p>Đã chọn: {unassignedStudents.filter(student => student.selected).length} học sinh</p>
              <input
                placeholder={t("search")}
                className={`border-radius-3px w-300px border px-3 py-2`}
              />
            </div>
            <Table
              className={styles.customTable}
              columns={columnsUnassigned}
              dataSource={unassignedStudents}
              pagination={{ pageSize: 50 }}
              scroll={{ y: 55 * 5 }}
              loading={loading}
            />
          </div>

          {/* Nút chuyển */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={icon_assign_student_table} />
          </div>

          {/* Bảng học sinh đã gán */}
          <div style={{ width: "45%" }} className="border px-2">
            <h3 className="fw-700 mb-4 mt-3">Danh sách học sinh chuyển lớp</h3>
            <Table
              className={styles.customTable}
              columns={columnsAssigned}
              dataSource={assignedStudents}
              pagination={{ pageSize: 50 }}
              scroll={{ y: 55 * 5 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsAssignClass;
