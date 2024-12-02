import React, { useEffect, useState } from "react";
import PaginationAntd from "../../../../_Shared/Components/Pagination/Pagination";
import export_file from "../../../../assets/images/svg/export_file.svg";
import icon_plus from "../../../../assets/images/svg/icon_plus.svg";
import icon_edit from "../../../../assets/images/svg/icon_edit.svg";
import icon_delete from "../../../../assets/images/svg/icon_delete.svg";
import icon_eye from "../../../../assets/images/svg/icon_eye.svg";
import icon_assign_teacher from "../../../../assets/images/svg/icon_assign_teacher.svg";
import icon_lock from "../../../../assets/images/svg/icon_lock.svg";
import icon_password from "../../../../assets/images/svg/icon_password.svg";
import ModalReuse from "../../../../_Shared/Components/Modal-reuse/Modal-reuse";
import { ApiService } from "../../../../Services/ApiService";
import { useForm } from "react-hook-form";
import ActionMenu from "../../../../_Shared/Components/Action-menu/Action-menu";
import Loading from "../../../../_Shared/Components/Loading/Loading";
import { Button, Modal, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { formatTimestamp } from "../../../../_Shared/Pipe/Format-timestamp";
import StatusTeacherDirective from "../../../../_Shared/Directive/Status-teacher-directive";
import NotificationCustom from "../../../../_Shared/Components/Notification-custom/Notification-custom";
import { GENDER_ENUM } from "../../../../_Shared/Enum/gender.enum";
import genderDirective from "../../../../_Shared/Components/Gender/Gender";
import { STATUS_ACTIVE_ENUM } from "../../../../_Shared/Enum/status-active.enum";

const Parent = () => {
  // dịch đa ngôn ngữ
  const { t, i18n } = useTranslation();
  const navigate = useNavigate(); // Hook để điều hướng
  //modal
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false); // mở dal
  const [modalIsOpenChangePassword, setModalIsOpenChangePassword] = useState(false); // mở dal
  const [modalIsOpenAssignParent, setModalIsOpenAssignParent] = useState(false); // mở dal
  const [isEditMode, setIsEditMode] = useState(false); // mở modal edit
  const [currentData, setCurrentData] = useState(null); // dữ liệu truyền vào edit
  const [isModalVisible, setIsModalVisible] = useState(false); // mở modal confirm xóa
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [selectedRecord, setSelectedRecord] = React.useState(null);

  // Sử dụng react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    reset,
  } = useForm({ mode: "onChange" });

  // danh sách
  useEffect(() => {
    // Gọi API khi component mount
    const fetchData = async () => {
      setLoading(true);
      try {
        let dataRequest = {
          pageIndex: 1,
          pageSize: 10,
          keyWord: "",
        };
        const responseData = await ApiService(
          `manager/guardian/?pageIndex=${dataRequest.pageIndex}&pageSize=${dataRequest.pageSize}&keyWord=${dataRequest.keyWord}`,
          "GET",
        );
        if (responseData) {
          setData(responseData.data);
        }
      } catch (error) {
        setLoading(true);
        console.log(error);
        setNotification({
          type: "error",
          message: "Có lỗi liên quan đến hệ thống",
          title: "Lỗi",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openModal = (editMode = false, data = null) => {
    setIsEditMode(editMode);
    setModalIsOpen(true);
    if (editMode && data) {
      setCurrentData(data);
      // Log dữ liệu cập nhật
      // console.log("Dữ liệu cập nhật:", {
      //   data,
      // });
      reset({
        fullname: data.fullname || "",
        email: data.email || null,
        phone: data.phone || null,
        gender: data.gender || "",
        career: data.career || "",
        address: data.address || "",
        dob: data.dob || null,
        status: data.status,
        username: data.username || "",
        
      });
    } else {
      reset({
        fullname: "",
        email: null,
        phone: null,
        dob: null,
        gender: GENDER_ENUM.NAM,
        career: "",
        status: "",
        address: null,
        username: "",
        password: "",
        confirm_password: "",
      });
    }
  };

  const openModalAssignParent = (data = null) => {
    setModalIsOpenAssignParent(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentData(null);
    reset();
  };

  const openModalChangePassword = () => {
    setModalIsOpenChangePassword(true);
  }

  const closeModalChangePassword = () => {
    setModalIsOpenChangePassword(false)
  }

  const closeModalAssignparent = () => {
    setModalIsOpenAssignParent(false);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    if (isEditMode) {
      // Xử lý cập nhật dữ liệu khi đang chỉnh sửa
      try {
        const formData = {
          ...data,
          status: Number(data.status),
          gender: Number(data.gender),
        };
        const response = await ApiService(
          `manager/guardian/update/${currentData.id}`,
          "PUT",
          formData,
        ); // Gọi API lấy danh sách
        if (response) {
          await getItems();
          setNotification({
            type: "success",
            message: "Chỉnh sửa phụ huynh thành công",
            title: "Thành công",
          });
        } else {
          setErrorMessage("Đã có lỗi xảy ra.");
          setNotification({
            type: "error",
            message: "Có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu nhập vào",
            title: "Lỗi",
          });
        }
      } catch (err) {
        setNotification({
          type: "error",
          message: "Chỉnh sửa phụ huynh không thành công",
          title: "Lỗi xảy ra",
        });
      } finally {
        setLoading(false); // Dừng trạng thái tải dữ liệu
      }
    } else {
      // Xử lý thêm mới
      try {
        const formData = {
          ...data,
        };
        const response = await ApiService(
          `manager/guardian/add`,
          "POST",
          formData,
        ); // Gọi API lấy danh sách
        if (response) {
          await getItems();
          setNotification({
            type: "success",
            message: "Thêm phụ huynh mới thành công",
            title: "Thành công",
          });
        } else {
          setErrorMessage("Đã có lỗi xảy ra.");
          setNotification({
            type: "error",
            message: "Có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu nhập vào",
            title: "Lỗi",
          });
        }
      } catch (err) {
        setNotification({
          type: "error",
          message: "Thêm phụ huynh không thành công",
          title: "Lỗi xảy ra",
        });
      } finally {
        setLoading(false); // Dừng trạng thái tải dữ liệu
      }
    }
    getItems(); // Cập nhật lại danh sách sau khi thêm hoặc sửa

    closeModal();
  };

  // Hàm click thao tác
  const handleMenuClick = (key, data) => {
    if (key === "edit") {
      openModal(true, data); // Pass the data for editing
    } else if (key === "delete") {
      console.log("Deleting: ", data);
    } else if (key === "detail") {
      navigate("/staff/parent/detail/" + data.id);
    } else if (key === "assign_to_parent") {
      openModalAssignParent();
    }else if( key === "change_password"){
      openModalChangePassword();
    }
  };

  const menuItems = [
    { key: "detail", label: "Xem chi tiết", icon: icon_eye },
    { key: "edit", label: "Sửa thông tin", icon: icon_edit },
    { key: "lock_account", label: "Khóa tài khoản", icon: icon_lock },
    { key: "change_password", label: "Đổi mật khẩu", icon: icon_password },
    {
      key: "assign_to_parent",
      label: "Gán phụ huynh cho học sinh",
      icon: icon_assign_teacher,
    },
  ];

  const getItems = async () => {
    setLoading(true);
    try {
      const response = await ApiService("manager/guardian/");
      console.log("Dữ liệu trả về từ API:", response.data); // Log dữ liệu ra console
      setItems(response.data.data || []);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error); // Log lỗi nếu có
      setNotification({
        type: "error",
        message: "Lỗi liên quan hệ thống. Vui lòng liên hệ QTV",
        title: "Lỗi xảy ra",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ type: "", message: "", title: "" }); // Ẩn thông báo sau 3 giây
      }, 3000);

      return () => clearTimeout(timer); // Xóa bộ hẹn giờ khi component bị unmount hoặc message thay đổi
    }
  }, [notification]);

  // Dữ liệu hiển thị
  // const parentInformation = [
  //   {
  //       id: 1,
  //       parentName: 'Nguyễn Duy Kiên',
  //       parentCode: "GV01",
  //       email: 'kiennd@gmail.com',
  //       phone: '03680215485',
  //       gender: 1,
  //       job: "Tự do",
  //       status: 1,
  //       totalChildren: 2,
  //       address: "Hà Nội"
  //   },
  //   // Thêm nhiều dữ liệu hơn ở đây
  // ];

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

  const footerModal = () => {
    return (
      <div className="mt-3 text-center">
        <button
          onClick={closeModalAssignparent}
          className="btn bg-color-white-smoke w-100px me-3"
        >
          Đóng
        </button>
        <button type="submit" className="btn btn-primary w-100px">
          Lưu
        </button>
      </div>
    );
  };

  const title = async () => {
    setLoading(true);
    try {
      const response = await ApiService("manager/guardian/");
      console.log("Dữ liệu trả về từ API:", response.data);
      setItems(response.data.data || []);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      setNotification({
        type: "error",
        message: "Lỗi liên quan hệ thống. Vui lòng liên hệ QTV",
        title: "Lỗi xảy ra",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    title();
  }, []);

  return (
    <div>
      <Loading isLoading={loading} />
      {/* <header className="h-[100px] w-full"></header> */}
      <div className="pt-6rem h-100vh bg-white px-4">
        <h1 className="fs-16">Danh sách phụ huynh</h1>
        <p className="mt-2">Task/subtitle/subtitle</p>

        <div className="d-flex justify-content-between align-items-end mt-2">
          <p>
            Số lượng phụ huynh: <span>100 phụ huynh</span>
          </p>
          <div className="d-flex">
            <input
              placeholder={t("search")}
              className={`bg-color-white-smoke border-radius-10px w-300px px-3 py-2`}
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
          </div>
        </div>

        <div className="table-responsive mt-4">
          <table className="table-bordered table min-w-full border-collapse border border-gray-300">
            <thead className="bg-color-blue text-white">
              <tr>
                <th className="w-5 text-center">{t("STT")}</th>
                <th>
                  <span className="ps-10">Thông tin phụ huynh</span>
                </th>
                <th className="text-center">Liên hệ</th>
                <th className="w-10 text-center">Giới tính</th>
                <th className="text-center">Nghề nghiệp</th>
                <th className="w-15 text-center">{t("status")}</th>
                <th className="w-10 text-center">Con</th>
                <th className="w-10 text-center">{t("action")}</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr className="align-middle" key={item.id}>
                  <td className="text-center">{index + 1}</td>
                  <td>
                    <span className="fw-700">{item.fullname}</span>
                    <br />
                    <span className="fw-700">Mã: {item.code}</span> <br />
                  </td>
                  <td>
                    <span>{item.email}</span>
                    <br />
                    <span>SĐT: {item.phone}</span>
                  </td>
                  <td className="text-center">
                    {genderDirective(item.gender)}
                  </td>
                  <td className="text-center">{item.career}</td>
                  <td className="text-center">
                    {StatusTeacherDirective(item.status)}
                  </td>
                  <td className="text-center">
                    <Tooltip
                      title={
                        item.studentsInfo && item.studentsInfo.length > 0 ? (
                          <>
                            {item.studentsInfo.map((student, index) => (
                              <div key={index}>
                                <p>Họ tên: {student.fullname}</p>
                                <p>Sinh năm: {formatTimestamp(student.dob)}</p>
                                <p>Niên khóa: {student.academicYear}</p>
                              </div>
                            ))}
                          </>
                        ) : null
                      }
                      color={"text-color-blue"}
                      key={"blue"}
                      placement="bottomRight"
                    >
                      <Button>{item.studentsInfo.length}</Button>
                    </Tooltip>
                  </td>

                  <td className="text-center">
                    <ActionMenu
                      items={menuItems}
                      onMenuClick={(key) => handleMenuClick(key, item)}
                      onDelete={showDeleteModal}
                    />
                  </td>
                </tr>
              ))}
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
        title={isEditMode ? "Chỉnh sửa thông tin phụ huynh" : "Thêm phụ huynh"}
        width="80%"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {/* Tên phụ huynh */}
            <div className="col-12 col-md-6 mb-3">
              <label>
                Tên phụ huynh <span className="text-danger">*</span>:
              </label>
              <input
                type="text"
                className={`form-control ${errors.fullname ? "is-invalid" : ""}`}
                {...register("fullname", {
                  required: "Họ tên của Phụ huynh bắt buộc nhập",
                })}
                placeholder="Nhập họ tên của phụ huynh..."
              />
              {errors.fullname && (
                <div className="invalid-feedback">
                  {errors.fullname.message}
                </div>
              )}
            </div>

            {/* Username */}
            <div className="col-12 col-md-6 mb-3">
              <label>
                Username <span className="text-danger">*</span>:
              </label>
              <input
                type="text"
                className={`form-control ${errors.username ? "is-invalid" : ""}`}
                {...register("username", {
                  required: "Username bắt buộc nhập",
                })}
                placeholder="Nhập username của phụ huynh..."
                disabled={isEditMode} // Nếu isEditMode = true, input sẽ bị disable
              />
              {errors.username && (
                <div className="invalid-feedback">
                  {errors.username.message}
                </div>
              )}
            </div>

            {/* Mật khẩu */}
            <div className="col-12 col-md-6 mb-3">
              <label hidden={isEditMode}>
                Mật khẩu <span className="text-danger">*</span>:
              </label>
              <input
                type="password"
                className={`form-control ${errors.password && !isEditMode ? "is-invalid" : ""}`}
                {...register("password", {
                  required: !isEditMode
                    ? "Mật khẩu của phụ huynh bắt buộc nhập"
                    : false,
                })}
                placeholder="Nhập mật khẩu của phụ huynh..."
                hidden={isEditMode} // Ẩn khi isEditMode = true
              />
              {!isEditMode && errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>

            {/* Xác nhận mật khẩu */}
            <div className="col-12 col-md-6 mb-3">
              <label hidden={isEditMode}>
                Xác nhận <span className="text-danger">*</span>:
              </label>
              <input
                type="password"
                className={`form-control ${errors.confirmPassword && !isEditMode ? "is-invalid" : ""}`}
                {...register("confirmPassword", {
                  required: !isEditMode
                    ? "Xác nhận mật khẩu của phụ huynh bắt buộc nhập"
                    : false,
                  validate: (value) =>
                    !isEditMode
                      ? value === watch("password") ||
                        "Mật khẩu xác nhận không khớp"
                      : true,
                })}
                placeholder="Nhập xác nhận mật khẩu của phụ huynh..."
                hidden={isEditMode} // Ẩn khi isEditMode = true
              />
              {!isEditMode && errors.confirmPassword && (
                <div className="invalid-feedback">
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>

            {/* Trạng thái */}
            <div className="col-12 col-md-6 mb-3">
              <label>
                Trạng thái <span className="text-danger">*</span>:
              </label>
              <select
                className={`form-control ${errors.status ? "is-invalid" : ""}`}
                {...register("status", {
                  required: "Trạng thái của Phụ huynh bắt buộc chọn",
                })}
              >
                <option value="">Chọn trạng thái</option>
                <option value={STATUS_ACTIVE_ENUM.ACTIVE}>
                  {STATUS_ACTIVE_ENUM.ACTIVE_LABEL}
                </option>
                <option value={STATUS_ACTIVE_ENUM.UN_ACTIVE}>
                  {STATUS_ACTIVE_ENUM.UN_ACTIVE_LABEL}
                </option>
              </select>
              {errors.status && (
                <div className="invalid-feedback">{errors.status.message}</div>
              )}
            </div>

            {/* Giới tính */}
            <div className="col-12 col-md-6 mb-3">
              <label>
                Giới tính <span className="text-danger">*</span>:
              </label>
              <select
                className={`form-control ${errors.gender ? "is-invalid" : ""}`}
                {...register("gender", {
                  required: "Giới tính của Phụ huynh bắt buộc chọn",
                })}
              >
                <option value={GENDER_ENUM.NAM}>{GENDER_ENUM.NAM_LABEL}</option>
                <option value={GENDER_ENUM.WOMAN}>
                  {GENDER_ENUM.WOMAN_LABEL}
                </option>
              </select>
              {errors.gender && (
                <div className="invalid-feedback">{errors.gender.message}</div>
              )}
            </div>

            {/* Số điện thoại */}
            <div className="col-12 col-md-6 mb-3">
              <label>Số điện thoại:</label>
              <input
                type="text"
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                {...register("phone")}
                placeholder="Nhập số điện thoại của học sinh (Nếu có)..."
              />
              {errors.phone && (
                <div className="invalid-feedback">{errors.phone.message}</div>
              )}
            </div>

            {/* Email */}
            <div className="col-12 col-md-6 mb-3">
              <label>Email:</label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                {...register("email", {
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                    message: "Địa chỉ email không hợp lệ",
                  },
                })}
                placeholder="Nhập địa chỉ email của phụ huynh..."
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>

            {/* Ngày sinh */}
            <div className="col-12 col-md-6 mb-3">
              <label>Ngày sinh:</label>
              <input
                type="date"
                className={`form-control ${errors.dob ? "is-invalid" : ""}`}
                {...register("dob")}
                placeholder="DD/MM/YYYY"
              />
            </div>

            {/* Địa chỉ */}
            <div className="col-12 col-md-6 mb-3">
              <label>Địa chỉ:</label>
              <input
                className={`form-control ${errors.address ? "is-invalid" : ""}`}
                {...register("address")}
                placeholder="Nhập địa chỉ của phụ huynh..."
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

        <ModalReuse isOpen={modalIsOpenChangePassword} onClose={closeModalChangePassword} title={isEditMode ? "Chỉnh sửa thông tin phụ huynh" : "Thêm phụ huynh"} width="80%">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
            {/* Tên phụ huynh */}
            <div className="col-12 col-md-6 mb-3">
                <label>Tên phụ huynh <span className="text-danger">*</span>:</label>
                Nguyễn Duy Kiên
            </div>

            {/* Username */}
            <div className="col-12 col-md-6 mb-3">
                <label>Username <span className="text-danger">*</span>:</label>
                Duy kien
            </div>

            {/* Mật khẩu */}
            <div className="col-12 col-md-6 mb-3">
                <label>Mật khẩu <span className="text-danger">*</span>:</label>
                <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                {...register("password", { required: "Mật khẩu của phụ huynh bắt buộc nhập" })}
                placeholder="Nhập mật khẩu của phụ huynh..."
                />
                {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
            </div>

            {/* Xác nhận mật khẩu */}
            <div className="col-12 col-md-6 mb-3">
                <label>Xác nhận <span className="text-danger">*</span>:</label>
                <input
                type="password"
                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                {...register("confirmPassword", {
                    required: "Xác nhận mật khẩu của phụ huynh bắt buộc nhập",
                    validate: value => value === watch("password") || "Mật khẩu xác nhận không khớp"
                })}
                placeholder="Nhập xác nhận mật khẩu của phụ huynh..."
                />
                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
            </div>
            </div>
            <div className="text-center mt-3">
            <button onClick={closeModal} className="btn bg-color-white-smoke me-3 w-100px">Đóng</button>
            <button type="submit" className="btn btn-primary w-100px">Lưu</button>
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="fs-16">Danh sách phụ huynh</h1>

          <div className="d-flex justify-content-between align-items-end mt-2">
            <p>
              Số lượng: <span className="fw-700">32 phụ huynh</span>
            </p>
            <input
              placeholder={t("search")}
              className={`bg-color-white-smoke border-radius-10px w-400px px-3 py-2`}
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
              <tr className="border-bottom align-middle">
                <td className="py-3">
                  <input type="radio" />
                </td>
                <td className="py-3">01</td>
                <td className="py-3">
                  <span>Nguyễn Duy Kiên</span> <br />
                  <span>ID: 0001</span>
                </td>
                <td className="py-3">kiennd@gmail.com</td>
                <td className="py-3">Nam</td>
                <td className="py-3">1/1/2024</td>
                <td className="py-3">0365215485</td>
                <td className="py-3">duykien</td>
                <td className="py-3 text-center">
                  <Tooltip
                    title={title}
                    color={"text-color-blue"}
                    key={"blue"}
                    placement="bottomRight"
                  >
                    <Button>1 con</Button>
                  </Tooltip>
                </td>
              </tr>
              <tr className="border-bottom align-middle">
                <td className="py-3">
                  <input type="radio" />
                </td>
                <td className="py-3">01</td>
                <td className="py-3">
                  <span>Nguyễn Duy Kiên</span> <br />
                  <span>ID: 0001</span>
                </td>
                <td className="py-3">kiennd@gmail.com</td>
                <td className="py-3">Nam</td>
                <td className="py-3">1/1/2024</td>
                <td className="py-3">0365215485</td>
                <td className="py-3">duykien</td>
                <td className="py-3 text-center">
                  <Tooltip
                    title={title}
                    color={"text-color-blue"}
                    key={"blue"}
                    placement="bottomRight"
                  >
                    <Button>1 con</Button>
                  </Tooltip>
                </td>
              </tr>
              <tr className="border-bottom align-middle">
                <td className="py-3">
                  <input type="radio" />
                </td>
                <td className="py-3">01</td>
                <td className="py-3">
                  <span>Nguyễn Duy Kiên</span> <br />
                  <span>ID: 0001</span>
                </td>
                <td className="py-3">kiennd@gmail.com</td>
                <td className="py-3">Nam</td>
                <td className="py-3">1/1/2024</td>
                <td className="py-3">0365215485</td>
                <td className="py-3">duykien</td>
                <td className="py-3 text-center">
                  <Tooltip
                    title={title}
                    color={"text-color-blue"}
                    key={"blue"}
                    placement="bottomRight"
                  >
                    <Button>1 con</Button>
                  </Tooltip>
                </td>
              </tr>
              <tr className="border-bottom align-middle">
                <td className="py-3">
                  <input type="radio" />
                </td>
                <td className="py-3">01</td>
                <td className="py-3">
                  <span>Nguyễn Duy Kiên</span> <br />
                  <span>ID: 0001</span>
                </td>
                <td className="py-3">kiennd@gmail.com</td>
                <td className="py-3">Nam</td>
                <td className="py-3">1/1/2024</td>
                <td className="py-3">0365215485</td>
                <td className="py-3">duykien</td>
                <td className="py-3 text-center">
                  <Tooltip
                    title={title}
                    color={"text-color-blue"}
                    key={"blue"}
                    placement="bottomRight"
                  >
                    <Button>1 con</Button>
                  </Tooltip>
                </td>
              </tr>
              <tr className="border-bottom align-middle">
                <td className="py-3">
                  <input type="radio" />
                </td>
                <td className="py-3">01</td>
                <td className="py-3">
                  <span>Nguyễn Duy Kiên</span> <br />
                  <span>ID: 0001</span>
                </td>
                <td className="py-3">kiennd@gmail.com</td>
                <td className="py-3">Nam</td>
                <td className="py-3">1/1/2024</td>
                <td className="py-3">0365215485</td>
                <td className="py-3">duykien</td>
                <td className="py-3 text-center">
                  <Tooltip
                    title={title}
                    color={"text-color-blue"}
                    key={"blue"}
                    placement="bottomRight"
                  >
                    <Button>1 con</Button>
                  </Tooltip>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="d-flex justify-content-end mb-20 mt-4">
            <PaginationAntd></PaginationAntd>
          </div>
        </form>
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

export default Parent;
