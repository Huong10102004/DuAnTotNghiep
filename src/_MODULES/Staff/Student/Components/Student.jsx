import React, { useEffect, useState } from "react";
import axios from "axios"; // Thêm dòng này
import PaginationAntd from "../../../../_Shared/Components/Pagination/Pagination";
import export_file from "../../../../assets/images/svg/export_file.svg";
import icon_plus from "../../../../assets/images/svg/icon_plus.svg";
import icon_edit from "../../../../assets/images/svg/icon_edit.svg";
import icon_delete from "../../../../assets/images/svg/icon_delete.svg";
import icon_eye from "../../../../assets/images/svg/icon_eye.svg";
import icon_assign_student from "../../../../assets/images/svg/icon_assign_teacher.svg";
import icon_assign_teacher from "../../../../assets/images/svg/icon_assign_teacher.svg";

import ModalReuse from "../../../../_Shared/Components/Modal-reuse/Modal-reuse";
import { useForm } from "react-hook-form";
import ActionMenu from "../../../../_Shared/Components/Action-menu/Action-menu";
import { Button, Modal, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ApiService } from "../../../../Services/ApiService";
import Loading from "../../../../_Shared/Components/Loading/Loading";
import NotificationCustom from "../../../../_Shared/Components/Notification-custom/Notification-custom";
import genderDirective from "../../../../_Shared/Components/Gender/Gender";
import { STATUS_STUDENT_STUDY_ENUM } from "../../../../_Shared/Enum/status-student-study.enum";
import { GENDER_ENUM } from "../../../../_Shared/Enum/gender.enum";
import studentStatusDirective from "../../../../_Shared/Directive/Student-status-directive";
const Student = () => {
  // dịch đa ngôn ngữ
  const { t, i18n } = useTranslation();
  const navigate = useNavigate(); // Hook để điều hướng
  //modal
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false); // mở dal
  const [modalIsOpenAssignParent, setModalIsOpenAssignParent] = useState(false); // mở dal
  const [isEditMode, setIsEditMode] = useState(false); // mở modal edit
  const [currentData, setCurrentData] = useState(null); // dữ liệu truyền vào edit
  const [isModalVisible, setIsModalVisible] = useState(false); // mở modal confirm xóa
  // Sử dụng react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    reset,
  } = useForm({ mode: "onChange" });
  const [items, setItems] = useState([]);
  const [listClasses, setListClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [parentsList, setParentsList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedParentId, setSelectedParentId] = useState()
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [keyWord, setKeyWord] = useState('');
// Bên ngoài component
const [selectedStudentId, setSelectedStudentId] = useState(null); 

  // danh sách
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const dataRequest = {
          pageIndex: 1,
          pageSize: 6,
          keyWord: "",
        };
        const responseData = await ApiService(
          `manager/student?pageIndex=${dataRequest.pageIndex}&pageSize=${dataRequest.pageSize}&keyWord=${dataRequest.keyWord}`,
          "GET",
        );

        if (responseData) {
          setData(responseData.data);
        }
        setTotalItems(responseData.data.total);
      } catch (error) {
        setLoading(true);
        // setNotification({ type: 'error', message: 'Có lỗi liên quan đến hệ thống', title: 'Lỗi' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openModal = (editMode = false, data = null) => {
    console.log("Edit Mode:", editMode, "Data:", data); // Kiểm tra dữ liệu
    setIsEditMode(editMode);
    setModalIsOpen(true);
    if (editMode && data) {
      setCurrentData(data);
      reset({
        fullname: data.fullname || "",
        studentCode: data.studentCode || "",
        class_id: data.class_id || "",
        email: data.email || "",
        phone: data.phone || "",
        gender: data.gender || "",
        schoolYear: data.schoolYear || "",
        status: data.status !== undefined ? data.status : "",
        parent: data.parent || "",
        address: data.address || "",
        dob: data.dob ? formatTimestampToDate(data.dob) : "",
      });
    } else {
      reset({
        fullname: "",
        class_id: null,
        gender: "",
        status: STATUS_STUDENT_STUDY_ENUM.NONE_CLASS,
        address: null,
        dob: "",
      }); // Reset form nếu là chế độ thêm
    }
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentData(null);
    reset();
  };
  const formatTimestampToDate = (timestamp) => {
    if (!timestamp || timestamp <= 0) return ""; // Nếu timestamp không hợp lệ, trả về chuỗi rỗng
    const date = new Date(timestamp * 1000); // Nhân với 1000 để chuyển từ giây sang milliseconds
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2); // Đảm bảo 2 chữ số
    const day = `0${date.getDate()}`.slice(-2); // Đảm bảo 2 chữ số
    return `${year}-${month}-${day}`;
  };

  

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let response;
      if (isEditMode) {
        response = await ApiService(
          `manager/student/update/${currentData?.id}`,
          "post",
          data,
        );
      } else {
        response = await ApiService("manager/student/store", "post", data);
      }
      // Nếu thành công, cập nhật danh sách trực tiếp
      if (response) {
        // Cập nhật danh sách `items` mà không cần tải lại trang
        await getItems(); // Hàm này nên cập nhật `state` thay vì tải lại trang

        closeModal();
        setNotification({
          type: "success",
          message: isEditMode
            ? "Cập nhật học sinh thành công"
            : "Thêm học sinh thành công",
          title: "Thành công",
        });
      }
    } catch (error) {
      console.error(error);
      setNotification({
        type: "error",
        message: isEditMode
          ? "Cập nhật học sinh thất bại"
          : "Thêm học sinh thất bại",
        title: "Lỗi xảy ra",
      });
    }
    setLoading(false);
  };

  // Hàm click thao tác
  const handleMenuClick = (key, data) => {
    if (key === "edit") {
      openModal(true, data); // Pass the data for editing
    } else if (key === "delete") {
      console.log("Deleting: ", data);
    } else if (key === "detail") {
      navigate("/staff/student/detail/" + data.id);
    } else if (key === "assign_to_parent") {
      setSelectedStudentId(data.id); // Lưu ID học sinh vào state
      openModalAssignParent(data.id); // Pass student ID to modal
    } else if (key === "assign_class") {
      navigate("/staff/student/assign_class/1");
    }
  };

  const menuItems = [
    { key: "detail", label: "Xem chi tiết", icon: icon_eye },
    { key: "edit", label: "Sửa thông tin", icon: icon_edit },
    {
      key: "assign_to_parent",
      label: "Gán phụ huynh cho học sinh",
      icon: icon_assign_student,
    },
    {
      key: "assign_class",
      label: "Chuyển lớp học sinh",
      icon: icon_assign_teacher,
    },
  ];

  // Dữ liệu hiển thị

  const getItems = async () => {
    setLoading(true);
    try {
      console.log("Keyword", keyWord);
      const data = await ApiService(`manager/student?pageIndex=${pageIndex}&pageSize=${pageSize}&keyWord=${keyWord}`);
      console.log("data", data);
      setData(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Dừng trạng thái tải dữ liệu
    }
  };

  const getClasses = async () => {
    setLoading(true);
    try {
      const schoolYearId = localStorage.getItem("schoolYearCurrent");
      const data = await ApiService(
        `manager/class?school_year_id=${schoolYearId}`,
      );
      setListClasses(Array.isArray(data.data.classes) ? data.data.classes : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Dừng trạng thái tải dữ liệu
    }
  };

  useEffect(() => {
    getItems();
  }, [pageIndex, keyWord, pageSize]);

  useEffect(() => {
    getClasses();
  }, []);

  useEffect(() => {
    if (modalIsOpen) {
      getClasses();
    }
  }, [modalIsOpen]);
  //open delete modal
  const showDeleteModal = () => {
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    // Xử lý xóa bản ghi ở đây
    console.log("Đã xóa bản ghi");
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const openModalAssignParent = (studentId) => {
    setModalIsOpenAssignParent(true);
    setSelectedStudentId(studentId);
    fetchParentsList(); // Gọi API để lấy danh sách phụ huynh
  };

  const closeModalAssignparent = () => {
    setModalIsOpenAssignParent(false);
  };

  // Hàm lấy danh sách phụ huynh
  const fetchParentsList = async () => {
    try {
      const response = await ApiService("manager/student/parents", "GET");
      const parentsData = Array.isArray(response.data)
        ? response.data
        : response.data.data || []; // Lấy mảng dữ liệu phù hợp
      setParentsList(parentsData); // Lưu vào state
    } catch (error) {
      console.error("Lỗi khi lấy danh sách phụ huynh:", error);
      setParentsList([]); // Gán mảng rỗng nếu có lỗi
    }
  };
  useEffect(() => {
    fetchParentsList();
  }, []); // Chỉ gọi một lần khi component mount

  const handleSubmitParent = async () => {
    if (!selectedStudentId) {
      console.error("Chưa chọn học sinh.");
      return;
    }
    setLoading(true);
    try {
      const response = await ApiService(
        `manager/student/assign-parent/${selectedStudentId}`, // Sử dụng selectedStudentId từ state
        "POST",
        { parent_id: selectedParentId }
      );
    
      await getItems();
      console.log("Kết quả:", response);
    } catch (error) {
      console.error("Lỗi khi gán phụ huynh:", error);
    } finally {
      setLoading(false);
    }
    closeModal();
  };
  
  const handleKeyWord = async (event) => {
    if (event.key === 'Enter') {
      setKeyWord(event.target.value)
    }
  }

  const footerModal = () => {
    return (
      <div className="mt-3 text-center">
        <button
          onClick={closeModalAssignparent}
          className="btn bg-color-white-smoke w-100px me-3"
        >
          Đóng
        </button>
        <button onClick={handleSubmitParent} className="btn btn-primary w-100px">
          Lưu
        </button>
      </div>
    );
  };
  const statusOptions = isEditMode
    ? [
        // Cập nhật: Đang học, Nghỉ học
        {
          value: STATUS_STUDENT_STUDY_ENUM.STUDYING,
          label: STATUS_STUDENT_STUDY_ENUM.STUDYING_LABEL,
        },
        {
          value: STATUS_STUDENT_STUDY_ENUM.NONE_CLASS,
          label: STATUS_STUDENT_STUDY_ENUM.NONE_CLASS_LABEL,
        },
      ]
    : [
        // Thêm mới: Chưa vào lớp, Đang học
        {
          value: STATUS_STUDENT_STUDY_ENUM.NONE_CLASS,
          label: STATUS_STUDENT_STUDY_ENUM.NONE_CLASS_LABEL,
        },
        {
          value: STATUS_STUDENT_STUDY_ENUM.STUDYING,
          label: STATUS_STUDENT_STUDY_ENUM.STUDYING_LABEL,
        },
      ];

  const title = () => {
    return (
      <div>
        <p>Họ tên: Nguyễn Duy kiên</p>
        <p>Sinh năm: 2004</p>
        <p>Lớp: 6a1 - K18.3</p>
      </div>
    );
  };
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ type: "", message: "", title: "" });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div>
      <Loading isLoading={loading} />
      {/* <header className="h-[100px] w-full"></header> */}
      <div className="pt-6rem h-100vh bg-white px-4">
        <h1 className="fs-16">Danh sách học sinh</h1>
        <p className="mt-2">Task/subtitle/subtitle</p>

        <div className="d-flex justify-content-between align-items-end mt-2">
          <p>
            Số lượng học sinh: <span>100 học sinh</span>
          </p>
          <div className="d-flex">
            <input
              placeholder={t('search')}
              className={`bg-color-white-smoke border-radius-10px w-300px px-3 py-2`}
              onKeyDown={handleKeyWord}
            />
            <button className="btn bg-color-blue text-color-white d-flex align-items-center mx-3">
              {t("exportFileExcel")} <img className="ps-2" src={export_file} />
            </button>
            <button
              className="btn bg-color-green-bold text-color-white d-flex align-items-center"
              onClick={() => openModal(false)}
            >
              {t("create")} <img className="ps-2" src={icon_plus} />
            </button>
            {/* <button className="btn bg-color-green-bold text-color-white d-flex align-items-center" onClick={() => openModal(false)}>{t('create')} <img className="ps-2" src={icon_plus}/></button> */}
          </div>
        </div>

        <div className="table-responsive mt-4">
          <table className="table-bordered table min-w-full border-collapse border border-gray-300">
            <thead className="bg-color-blue text-white">
              <tr>
                <th className="w-5 text-center">{t("STT")}</th>
                <th>
                  <span className="ps-10">Thông tin học sinh</span>
                </th>
                <th className="text-center">Lớp học</th>
                <th className="w-10 text-center">Giới tính</th>
                <th className="text-center">Niên khóa</th>
                <th className="w-15 text-center">{t("status")}</th>
                <th className="w-10 text-center">Phụ huynh</th>
                <th className="w-10 text-center">{t("action")}</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => {
                return (
                  <tr className="align-middle" key={item.id}>
                    <td className="text-center">{index + 1}</td>
                    <td>
                      <span className="fw-700">{item.fullname}</span>
                      <br />
                      <span className="fw-700">Mã: {item.student_code}</span>
                      <br />
                    </td>
                    <td className="text-center">
                      <span className="fw-700">
                        {item.class_name ? item.class_name : "Chưa gán lớp"}
                      </span>
                    </td>
                    <td className="text-center">
                      {genderDirective({ gender: item.gender })}
                    </td>
                    <td className="fw-700 text-center">
                      {item.academic_year_Name}
                    </td>

                    <td className="text-center">
                      {studentStatusDirective({ status: item.status })}
                    </td>
                    <Tooltip
                      title={
                        item.parents &&
                        (item.parents.name ||
                          item.parents.phone ||
                          item.parents.code) ? (
                          <>
                            {item.parents.name && (
                              <span>Tên: {item.parents.name}</span>
                            )}{" "}
                            <br />
                            {item.parents.phone && (
                              <span>SĐT: {item.parents.phone}</span>
                            )}{" "}
                            <br />
                            {item.parents.code && (
                              <span>Mã: {item.parents.code}</span>
                            )}{" "}
                            <br />
                            {item.parents.status && (
                              <span>Trạng thái: {item.parents.status}</span>
                            )}{" "}
                            <br />
                          </>
                        ) : null
                      }
                    >
                      <td className="fw-700 text-center">
                        {item.parents.name}
                      </td>
                    </Tooltip>

                    <td className="text-center">
                      <ActionMenu
                        items={menuItems}
                        onMenuClick={(key) => handleMenuClick(key, item)}
                        onDelete={showDeleteModal}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-end">
          <PaginationAntd></PaginationAntd>
        </div>
      </div>

      {/* modal  */}
      <ModalReuse
        isOpen={modalIsOpen}
        onClose={closeModal}
        title={
          isEditMode ? "Chỉnh sửa thông tin học sinh" : "Thêm học sinh mới"
        }
        width="80%"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {/* Tên học sinh */}
            <div className="col-12 col-md-6 mb-3">
              <label>Tên học sinh:</label>
              <input
                type="text"
                className={`form-control ${errors.fullname ? "is-invalid" : ""}`}
                {...register("fullname", {
                  required: "Tên học sinh là bắt buộc",
                })}
                placeholder="Tên học sinh..."
              />
              {errors.fullname && (
                <div className="invalid-feedback">
                  {errors.fullname.message}
                </div>
              )}
            </div>

            <div className="col-12 col-md-6 mb-3">
              <label>Trạng thái:</label>
              <select
                className={`form-control ${errors.status ? "is-invalid" : ""}`}
                {...register("status", {
                  onChange: (e) => {
                    console.log("Selected status:", e.target.value); // Kiểm tra giá trị khi thay đổi
                    setStatus(e.target.value);
                  },
                })}
              >
                <option value="0">Chọn trạng thái</option>
                {isEditMode ? (
                  <>
                    <option value={STATUS_STUDENT_STUDY_ENUM.STUDYING}>
                      {STATUS_STUDENT_STUDY_ENUM.STUDYING_LABEL}
                    </option>
                    <option value={STATUS_STUDENT_STUDY_ENUM.LEAVE_SCHOOL}>
                      {STATUS_STUDENT_STUDY_ENUM.LEAVE_SCHOOL_LABEL}
                    </option>
                    <option
                      value={STATUS_STUDENT_STUDY_ENUM.NONE_CLASS}
                      disabled
                    >
                      {STATUS_STUDENT_STUDY_ENUM.NONE_CLASS_LABEL}
                    </option>
                  </>
                ) : (
                  <>
                    <option value={STATUS_STUDENT_STUDY_ENUM.STUDYING}>
                      {STATUS_STUDENT_STUDY_ENUM.STUDYING_LABEL}
                    </option>
                    <option value={STATUS_STUDENT_STUDY_ENUM.NONE_CLASS}>
                      {STATUS_STUDENT_STUDY_ENUM.NONE_CLASS_LABEL}
                    </option>
                    <option
                      value={STATUS_STUDENT_STUDY_ENUM.LEAVE_SCHOOL}
                      disabled
                    >
                      {STATUS_STUDENT_STUDY_ENUM.LEAVE_SCHOOL_LABEL}
                    </option>
                  </>
                )}
              </select>
              {errors.status && (
                <div className="invalid-feedback">{errors.status.message}</div>
              )}
            </div>

            {/* Giới tính */}
            <div className="col-12 col-md-6 mb-3">
              <label>Giới tính:</label>
              <select
                className={`form-control ${errors.gender ? "is-invalid" : ""}`}
                {...register("gender", { required: "Giới tính là bắt buộc" })}
              >
                <option value="">Chọn giới tính</option>
                <option value={GENDER_ENUM.NAM}>{GENDER_ENUM.NAM_LABEL}</option>
                <option value={GENDER_ENUM.WOMAN}>
                  {GENDER_ENUM.WOMAN_LABEL}
                </option>
              </select>
              {errors.gender && (
                <div className="invalid-feedback">{errors.gender.message}</div>
              )}
            </div>

            {/* Lớp học */}
            <div className="col-12 col-md-6 mb-3">
              <label>Lớp học:</label>
              <select
                className={`form-control ${errors.class_id ? "is-invalid" : ""}`}
                {...register("class_id", {
                  required:
                    status === STATUS_STUDENT_STUDY_ENUM.STUDYING
                      ? "Lớp học là bắt buộc"
                      : false,
                })}
                disabled={status === STATUS_STUDENT_STUDY_ENUM.NONE_CLASS} // Vô hiệu hóa chọn lớp khi trạng thái là "Chưa vào lớp"
              >
                <option value="">Chọn lớp</option>
                {listClasses.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors.class_id && (
                <div className="invalid-feedback">
                  {errors.class_id.message || "Lỗi chọn lớp"}
                </div>
              )}
            </div>

            <div className="col-12 col-md-6 mb-3">
              <label>Ngày sinh:</label>
              <input
                type="date"
                className={`form-control ${errors.dob ? "is-invalid" : ""}`}
                {...register("dob")}
              />
              {errors.dob && (
                <div className="invalid-feedback">{errors.dob.message}</div>
              )}
            </div>

            {/* Địa chỉ */}
            <div className="col-12 col-md-6 mb-3">
              <label>Địa chỉ:</label>
              <input
                className={`form-control ${errors.address ? "is-invalid" : ""}`}
                {...register("address")}
                placeholder="Địa chỉ học sinh..."
              />
            </div>
          </div>

          <div className="mt-3 text-center">
            <button
              onClick={closeModal}
              className="btn bg-color-white-smoke w-100px me-3"
            >
              Đóng
            </button>
            <button type="submit" className="btn btn-primary w-100px">
              Lưu
            </button>
          </div>
        </form>
      </ModalReuse>

      <Modal
        title={
          <div style={{ color: "red", textAlign: "center" }}>
            Xóa dữ liệu - niên khóa
          </div>
        }
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Có"
        cancelText="Không"
        centered={true}
      >
        <hr className="mb-3 mt-2" />
        <p>
          Bạn có chắc chắn muốn xóa niên khóa{" "}
          <span className="fw-700">K10.3</span> không?
        </p>
      </Modal>

      <ModalReuse
        isOpen={modalIsOpenAssignParent}
        onClose={closeModalAssignparent}
        title={"Gán phụ huynh cho học sinh Duy Kiên"}
        width="80%"
        footerModal={footerModal()}
      >
        <div>
          <h1 className="fs-16">Danh sách phụ huynh</h1>

          <div className="d-flex justify-content-between align-items-end mt-2">
            <p>
              Số lượng:{" "}
              <span className="fw-700">{parentsList.length} phụ huynh</span>
            </p>
            <input
              placeholder={t("search")}
              className={`bg-color-white-smoke border-radius-10px w-400px px-3 py-2`}
              value={searchText} // Giả sử bạn có một state 'searchText'
              onChange={(e) => setSearchText(e.target.value)} // Cập nhật giá trị searchText
            />
          </div>

          <table className="w-100 mt-5">
            <thead>
              <tr className="border-bottom">
                <th className="pb-3">#</th>
                <th className="pb-3">STT</th>
                <th className="pb-3">Họ tên phụ huynh</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Giới tính</th>
                <th className="pb-3">Ngày sinh</th>
                <th className="pb-3">SĐT</th>
                <th className="pb-3">Tên đăng nhập</th>
                <th className="pb-3 text-center">Con</th>
              </tr>
            </thead>
            <tbody>
              {parentsList
                ?.filter((parent) => {
                  return (
                    parent.fullname.toLowerCase().includes(searchText.toLowerCase()) || parent.email.toLowerCase().includes(searchText.toLowerCase())
                  );
                })
                .map((parent, index) => (
                  <tr key={parent.id} className="border-bottom align-middle">
                    <td className="py-3">
                      <input type="radio" onChange={() => setSelectedParentId(parent.id)}/>
                    </td>
                    <td className="text-center">{index + 1}</td>
                    <td className="py-3">
                      <span>{parent.fullname}</span> <br />
                      <span>ID: {parent.id}</span>
                    </td>
                    <td className="py-3">{parent.email}</td>
                    <td className="py-3">
                      {genderDirective({ gender: parent.gender })}
                    </td>
                    <td className="py-3">
                      {new Date(parent.dob * 1000).toLocaleDateString()}
                    </td>{" "}
                    {/* Chuyển đổi timestamp sang ngày */}
                    <td className="py-3">{parent.phone}</td>
                    <td className="py-3">{parent.username}</td>
                    <td className="py-3 text-center">
                      <Tooltip
                        color="text-color-blue"
                        placement="bottomRight"
                        title={
                          parent.children_info.length > 0 ? (
                            <>
                              {parent.children_info.map((child, index) => (
                                <div key={index}>
                                  <span>Tên: {child.fullname}</span> <br />
                                  <span>
                                    Ngày sinh:{" "}
                                    {new Date(
                                      child.dob * 1000,
                                    ).toLocaleDateString()}
                                  </span>{" "}
                                  <br />
                                  <span>Lớp: {child.class_name}</span> <br />
                                  <span>
                                    Niên khóa: {child.academic_year_name}
                                  </span>{" "}
                                  <br />
                                  <hr />
                                </div>
                              ))}
                            </>
                          ) : (
                            <span>Không có thông tin con</span>
                          )
                        }
                      >
                        <Button>{parent.children_count} con</Button>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-end mb-20 mt-4">
            <PaginationAntd /> {/* Giả sử bạn có component phân trang */}
          </div>
        </div>
      </ModalReuse>

      {notification.message && (
        <NotificationCustom
          type={notification.type}
          message={notification.message}
          title={notification.title}
        />
      )}
    </div>
  );
};

export default Student;
