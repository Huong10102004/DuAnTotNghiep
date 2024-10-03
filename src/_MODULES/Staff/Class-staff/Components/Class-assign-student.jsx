import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import icon_assign_student from "../../../../assets/images/svg/icon_assign_student.svg";
import icon_assign_student_table from "../../../../assets/images/svg/icon_assign_student_table.svg";
import { Table, Checkbox, Input, Button, Select } from "antd"; // Ant Design
import { createStyles } from "antd-style";

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

const ClassAssignStudent = () => {
  const { t, i18n } = useTranslation(); // dịch đa ngôn ngữ
  const { styles } = useStyle(); // style antd
  // State quản lý danh sách học sinh chưa gán và đã gán vào lớp
  const [unassignedStudents, setUnassignedStudents] = useState([
    {
      id: 1,
      name: "Nguyễn Duy Kiên",
      birthDate: "01/01/2024",
      class: "Chưa có",
      grade: "Khối 6",
      selected: false,
      key: 1,
    },
    {
      id: 2,
      name: "Nguyễn Duy Kiên",
      birthDate: "01/01/2024",
      class: "Chưa có",
      grade: "Khối 6",
      selected: false,
      key: 2,
    },
    {
      id: 3,
      name: "Nguyễn Duy Kiên",
      birthDate: "01/01/2024",
      class: "Chưa có",
      grade: "Khối 6",
      selected: false,
      key: 3,
    },
    // Thêm học sinh khác...
  ]);

  const [assignedStudents, setAssignedStudents] = useState([]);
  const [checkAll, setCheckAll] = useState(false); // State cho Check All

  // Hàm di chuyển học sinh từ "Học sinh chưa gán" sang "Học sinh đã gán"
  const assignStudents = () => {
    const selectedStudents = unassignedStudents.filter(
      (student) => student.selected,
    );
    console.log(selectedStudents);
    // setAssignedStudents([...assignedStudents, ...selectedStudents]);
    // setUnassignedStudents(unassignedStudents.filter(student => !student.selected));
  };

  // Hàm xử lý khi chọn học sinh
  const handleSelectStudent = (id) => {
    const updatedStudents = unassignedStudents.map((student) =>
      student.id === id ? { ...student, selected: !student.selected } : student,
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
      })),
    );
  };

  // Cấu trúc cột cho bảng
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
            Bạn đã chọn<span className="fw-700"> 03 học sinh </span>. Bạn vui
            lòng chọn lớp dự định chuyển tới và click vào nút: gán học sinh để
            hoàn tất công việc
          </p>
          <button
            className="btn btn-primary d-flex align-items-center ms-3 py-1"
            onClick={assignStudents}
          >
            <img src={icon_assign_student} className="me-2" /> Gán học sinh vào
            lớp học
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
            <h3 className="fw-700 mb-4 mt-3">Học sinh chưa gán vào lớp</h3>
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
              <p>Đã chọn: 03 học sinh</p>
              <input
                placeholder={t("search")}
                className={`border-radius-3px w-300px border px-3 py-2`}
              />
            </div>
            {/* <Table dataSource={unassignedStudents} columns={columnsUnassigned} pagination={false} rowKey="id" /> */}
            <Table
              className={styles.customTable}
              columns={columnsUnassigned}
              dataSource={unassignedStudents}
              pagination={{ pageSize: 50 }}
              scroll={{ y: 55 * 5 }}
            />
          </div>

          {/* Nút chuyển */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={icon_assign_student_table} />
          </div>

          {/* Bảng học sinh đã gán */}
          <div style={{ width: "45%" }} className="border px-2">
            <h3 className="fw-700 mb-4 mt-3">Học sinh lớp 6A1</h3>
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
              <p>Đã chọn: 03 học sinh</p>
              <input
                placeholder={t("search")}
                className={`border-radius-3px w-300px border px-3 py-2`}
              />
            </div>
            <Table
              dataSource={assignedStudents}
              columns={columnsAssigned}
              pagination={false}
              rowKey="id"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassAssignStudent;
