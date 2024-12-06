import React, { useState, useEffect } from 'react';
import icon_input from "../../../../assets/images/svg/icon_input.svg";
import icon_user from "../../../../assets/images/svg/icon_user.svg";
import icon_plus from "../../../../assets/images/svg/icon_plus.svg";
import icon_unassign_parent from "../../../../assets/images/svg/icon_unassign_parent.svg";
import { Link } from "react-router-dom";
import { formatTimestamp } from "../../../../_Shared/Pipe/Format-timestamp";
import { useForm } from 'react-hook-form';
import ModalReuse from "../../../../_Shared/Components/Modal-reuse/Modal-reuse";
import { ApiService } from "../../../../Services/ApiService";
import { useParams } from 'react-router-dom'; // Import useParams
import { useTranslation } from 'react-i18next';
import genderDirective from "../../../../_Shared/Components/Gender/Gender";

import { Button, Tooltip } from 'antd';
import PaginationAntd from '../../../../_Shared/Components/Pagination/Pagination';
import icon_danger from "../../../../assets/images/svg/icon_danger.svg"

const StudentDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [studentData, setStudentData] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation(); // dịch đa ngôn ngữ
    const [modalIsOpen, setModalIsOpen] = useState(false); // mở dal
    const [modalIsOpenRemoveRelationship, setModalIsOpenRemoveRelationship] = useState(false); // mở dal
    const { register, handleSubmit, formState: { errors }, watch, trigger,reset } = useForm({mode: "onChange"});
    const classCssTitleModal = 'text-danger'

  // Khai báo hàm fetchStudentData
  const fetchStudentData = async () => {
    try {
      const response = await ApiService(`manager/student/show/${id}`, "GET");
      if (response && response.data) {
        setStudentData(response.data);
        console.log(response.data);
        
        // Reset form fields with the fetched student data
        reset({
          fullname: response.data.fullname || "",
          studentCode: response.data.studentCode || "",
          class_id: response.data.class_id || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          gender: response.data.gender || "",
          schoolYear: response.data.schoolYear || "",
          status: response.data.status || "",
          parent: response.data.parent || "",
          address: response.data.address || "",
          dob: response.data.dob  || "",
        });
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Dùng useEffect để gọi hàm fetchStudentData khi component được mount
  useEffect(() => {
    if (id) {
      fetchStudentData(); // Gọi hàm fetchStudentData
    }
  }, [id, reset]); 


  const openModal = (data = null) => {
    setModalIsOpen(true); 
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setModalIsOpenRemoveRelationship(false);
  };

  const onSubmit = async (data) => {
    console.log("Dữ liệu gửi:", data);
    await handleRemoveRelationship(selectedStudentId);
    closeModal();
  };
  const openModalRemoveRelationShip = () => {
    setModalIsOpenRemoveRelationship(true);
  };


  const handleRemoveRelationship = async (studentId) => {
    setLoading(true);
  
    try {
      const response = await ApiService(
        `manager/student/detach-parent/${studentId}`, // API gỡ mối quan hệ phụ huynh
        "POST"
      );
  
      if (response && response.status === 'success') {
        toast.success("Gỡ mối quan hệ phụ huynh thành công!"); // Thông báo thành công
        await getItems(); // Cập nhật danh sách học sinh
      } else {
        toast.error("Có lỗi khi gỡ mối quan hệ phụ huynh. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi gỡ mối quan hệ phụ huynh:", error);
      toast.error("Có lỗi khi gỡ mối quan hệ phụ huynh. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };
  











  const footerModal = () => (
    <div className="text-center mt-3">
      <button onClick={closeModal} className="btn bg-color-white-smoke me-3 w-100px">
        Đóng
      </button>
      <button type="submit" className="btn btn-primary w-100px">
        Lưu
      </button>
    </div>
  );

  const footerModalRemoveRelationship = () => (
    <div className="text-center mt-3">
      <button onClick={closeModal} className="btn bg-color-white-smoke me-3 w-150px py-1">
        Hủy
      </button>
      <button type="submit" className="btn btn-danger w-150px py-1">
        Đồng ý
      </button>
    </div>
  );

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (!studentData) {
    return <div>Không tìm thấy thông tin học sinh.</div>;
  }
  const title = () => {
    return <div>
        <p>Họ tên: Nguyễn Duy kiên</p>
        <p>Sinh năm: 2004</p>
        <p>Lớp: 6a1 - K18.3</p>
    </div>
  }
  return (
    <div className="pt-5rem h-100vh px-4 bg-color-white h-100vh">
        <h1 className='mb-2 mt-4 fs-18'>Chi tiết học sinh</h1>
        <p className='mb-3'>subtitle here</p>
        <Link to="/staff/student"><button className='btn btn-primary'>Quay lại</button></Link>
        <div className='row mt-3'>
            <div className="col-2">
                <div className='border h-70vh'>
                    <h3 className='fw-700 fs-11 text-center my-3'>Danh mục quản lý</h3>
                    <ul>
                        <li className='active py-2 fs-10 fw-700 mb-1'>
                            <div className='d-flex align-items-center ps-3'>
                                <img src={icon_user} className='pe-2' /> Thông tin học sinh
                            </div>
                        </li>
                        <li className='py-2 fs-10 fw-700 mb-1'>
                            <div className='d-flex align-items-center ps-3'>
                                <img src={icon_user} className='pe-2' /> Lịch sử học sinh
                            </div>
                        </li>
                        <li className='py-2 fs-10 fw-700'>
                            <div className='d-flex align-items-center ps-3'>
                                <img src={icon_user} className='pe-2' /> Thông tin học sinh
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-10">
                <div className='border h-70vh px-4 pt-6 overflow-auto pb-5'>
                    <h3 className='fs-18'>Thông tin học sinh</h3>
                    {/* row 1 */}
                    <div className='row mt-3 align-items-center'>
                        <div className='col-12 col-md-2'>
                            <span className='d-flex'><img src={icon_input} className='pe-2'/> Tên học sinh</span>
                        </div>
                        <div className="col-12 col-md-4">
                            <input className='form-control' readOnly value={studentData.fullname}/>
                        </div>
                        <div className='col-12 col-md-2'>
                            <span className='d-flex'><img src={icon_input} className='pe-2'/> Mã học sinh</span>
                        </div>
                        <div className="col-12 col-md-4">
                            <input className='form-control' readOnly value={studentData.student_code}/>
                        </div>
                    </div>

                    {/* row 2 */}
                    <div className='row mt-2 align-items-center'>
                        <div className='col-12 col-md-2'>
                            <span className='d-flex'><img src={icon_input} className='pe-2'/> Tên đăng nhập</span>
                        </div>
                        <div className="col-12 col-md-4">
                            <input className='form-control' readOnly value={studentData.username}/>
                        </div>
                        <div className='col-12 col-md-2'>
                            <span className='d-flex'><img src={icon_input} className='pe-2'/> Ngày sinh</span>
                        </div>
                        <div className="col-12 col-md-4">
                            <input  className='form-control' readOnly value={formatTimestamp(studentData.dob)}/>
                        </div>
                    </div>

                    {/* row 3 */}
                    <div className='row mt-2 align-items-center'>
                        <div className='col-12 col-md-2'>
                            <span className='d-flex'><img src={icon_input} className='pe-2'/> Niên khóa</span>
                        </div>
                        <div className="col-12 col-md-4">
                            <input className='form-control' readOnly value={studentData.current_academic_year_name}/>
                        </div>
                        <div className='col-12 col-md-2'>
                            <span className='d-flex'><img src={icon_input} className='pe-2'/> Lớp học</span>
                        </div>
                        <div className="col-12 col-md-4">
                            <input className='form-control' readOnly value={studentData.current_class_name}/>
                        </div>
                    </div>
                    {/* row 4 */}
                    <div className='row mt-2 align-items-center'>
                       
                        {/* <div className='col-12 col-md-2'>
                            <span className='d-flex'><img src={icon_input} className='pe-2'/> Email</span>
                        </div>
                        <div className="col-12 col-md-4">
                            <input className='form-control' readOnly/>
                        </div> */}
                    </div>
                    {/* row 5 */}
                    <div className='row mt-2 align-items-center'>
                        {/* <div className='col-12 col-md-2'>
                            <span className='d-flex'><img src={icon_input} className='pe-2'/> SĐT</span>
                        </div>
                        <div className="col-12 col-md-4">
                            <input className='form-control' readOnly/>
                        </div> */}
                         <div className='col-12 col-md-2'>
                            <span className='d-flex'><img src={icon_input} className='pe-2'/> Phụ huynh</span>
                        </div>
                        <div className="col-12 col-md-4">
                            <input className='form-control' readOnly  value={studentData.parents && studentData.parents.length > 0 ? studentData.parents[0].fullname : ''}/>
                        </div>
                        <div className='col-12 col-md-2'>
                            <span className='d-flex'><img src={icon_input} className='pe-2'/> Trạng thái</span>
                        </div>
                        <div className="col-12 col-md-4">
                            <input className='form-control' readOnly value={studentData.status}/>
                        </div>
                    </div>

                    {/* row 6 */}
                    <div className='row mt-2 align-items-top'>
                        <div className='col-12 col-md-2'>
                            <span className='d-flex'><img src={icon_input} className='pe-2'/> Địa chỉ</span>
                        </div>
                        <div className="col-12 col-md-10">
                            <textarea className='form-control' readOnly value={studentData.address}/>
                        </div>
                    </div>

                    <hr className='mt-5 mb-4'/>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h3 className='fs-18'>Thông tin gia đình học sinh</h3>
                        <div className='d-flex'>
                            <button className='btn btn-danger me-3 d-flex align-items-center' onClick={() => openModalRemoveRelationShip()}>Gỡ mối quan hệ <img src={icon_unassign_parent} className='ms-2' alt='' /></button>
                            <button className='btn btn-primary d-flex align-items-center' onClick={() => openModal()}>Gán phụ huynh khác <img src={icon_plus} className='ms-2' alt='' /></button>
                        </div>
                    </div>
                    {/* row 1 - studentFamilyInformation */}
                    <div className='row mt-3 align-items-center'>
                        <div className='col-12 col-md-2'>
                            <span className='d-flex'><img src={icon_input} className='pe-2'/> Tên phụ huynh</span>
                        </div>
                        <div className="col-12 col-md-4">
                            <input className='form-control' readOnly value={studentData.parents && studentData.parents.length > 0 ? studentData.parents[0].fullname : ''}/>
                        </div>
                        <div className='col-12 col-md-2'>
                            <span className='d-flex'><img src={icon_input} className='pe-2'/> Ngày sinh</span>
                        </div>
                        <div className="col-12 col-md-4">
                            <input className='form-control' readOnly  value={studentData.parents && studentData.parents.length > 0 ? formatTimestamp(studentData.parents[0].dob) : ''} />
                        </div>
                    </div>
                    {/* row 2 - studentFamilyInformation */}
                    <div className='row mt-3 align-items-center'>
                        <div className='col-12 col-md-2'>
                            <span className='d-flex'><img src={icon_input} className='pe-2'/> Số điện thoại</span>
                        </div>
                        <div className="col-12 col-md-4">
                            <input className='form-control' readOnly value={studentData.parents && studentData.parents.length > 0 ? studentData.parents[0].phone : ''}/>
                        </div>
                        <div className='col-12 col-md-2'>
                            <span className='d-flex'><img src={icon_input} className='pe-2'/> Email</span>
                        </div>
                        <div className="col-12 col-md-4">
                            <input className='form-control' readOnly value={studentData.parents && studentData.parents.length > 0 ? studentData.parents[0].email : ''}/>
                        </div>
                    </div>
                    {/* row 3 - studentFamilyInformation */}
                    <div className='row mt-3 align-items-center'>
                        <div className='col-12 col-md-2'>
                            <span className='d-flex'><img src={icon_input} className='pe-2'/> Mã phụ huynh</span>
                        </div>
                        <div className="col-12 col-md-4">
                            <input className='form-control' readOnly value={studentData.parents && studentData.parents.length > 0 ? studentData.parents[0].code : ''}/>
                        </div>
                        <div className='col-12 col-md-2'>
                            <span className='d-flex'><img src={icon_input} className='pe-2'/> Giới tính</span> 
                        </div>
                        <div className="col-12 col-md-4">
                       
                        <input className='form-control' readOnly value={studentData.parents && studentData.parents.length > 0 ? studentData.parents[0].gender : ''}/>
                       
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <ModalReuse isOpen={modalIsOpen} onClose={closeModal} title={"Gán phụ huynh cho học sinh Duy Kiên"} width="80%" footerModal={footerModal()}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="fs-16">Danh sách phụ huynh</h1>

          <div className="d-flex justify-content-between align-items-end mt-2">
            <p>Số lượng: <span className="fw-700">32 phụ huynh</span></p>
            <input placeholder={t('search')} className={`bg-color-white-smoke px-3 py-2 border-radius-10px w-400px`}/>
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
                  <td className="py-3">
                    kiennd@gmail.com
                  </td>
                  <td className="py-3">Nam</td>
                  <td className="py-3">1/1/2024</td>
                  <td className="py-3">0365215485</td>
                  <td className="py-3">duykien</td>
                  <td className="py-3 text-center">
                    <Tooltip title={title} color={'text-color-blue'} key={'blue'} placement='bottomRight'>
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
                  <td className="py-3">
                    kiennd@gmail.com
                  </td>
                  <td className="py-3">Nam</td>
                  <td className="py-3">1/1/2024</td>
                  <td className="py-3">0365215485</td>
                  <td className="py-3">duykien</td>
                  <td className="py-3 text-center">
                    <Tooltip title={title} color={'text-color-blue'} key={'blue'} placement='bottomRight'>
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
                  <td className="py-3">
                    kiennd@gmail.com
                  </td>
                  <td className="py-3">Nam</td>
                  <td className="py-3">1/1/2024</td>
                  <td className="py-3">0365215485</td>
                  <td className="py-3">duykien</td>
                  <td className="py-3 text-center">
                    <Tooltip title={title} color={'text-color-blue'} key={'blue'} placement='bottomRight'>
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
                  <td className="py-3">
                    kiennd@gmail.com
                  </td>
                  <td className="py-3">Nam</td>
                  <td className="py-3">1/1/2024</td>
                  <td className="py-3">0365215485</td>
                  <td className="py-3">duykien</td>
                  <td className="py-3 text-center">
                    <Tooltip title={title} color={'text-color-blue'} key={'blue'} placement='bottomRight'>
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
                  <td className="py-3">
                    kiennd@gmail.com
                  </td>
                  <td className="py-3">Nam</td>
                  <td className="py-3">1/1/2024</td>
                  <td className="py-3">0365215485</td>
                  <td className="py-3">duykien</td>
                  <td className="py-3 text-center">
                    <Tooltip title={title} color={'text-color-blue'} key={'blue'} placement='bottomRight'>
                        <Button>1 con</Button>
                    </Tooltip>
                  </td>
                </tr>
            </tbody>
          </table>
          <div className="mt-4 d-flex justify-content-end mb-20">
            <PaginationAntd></PaginationAntd>
          </div>
          
        </form>
      </ModalReuse>

      <ModalReuse
        isOpen={modalIsOpenRemoveRelationship}
        onClose={closeModal}
        title={"Gỡ phụ huynh học sinh"}
        width="50%"
        footerModal={footerModalRemoveRelationship()} 
        titleCssCustom={classCssTitleModal}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex align-items-center text-danger justify-content-center">
            <img src={icon_danger} className='me-2'/> Thao tác có thể liên quan đến dữ liệu nhiều nơi. Bạn có chắc chắn muốn thực hiện thao tác?
          </div>
          
        </form>
      </ModalReuse>
    </div>
  );

};

export default StudentDetail;
