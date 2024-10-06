import React, { useState } from 'react';
import icon_input from "../../../../assets/images/svg/icon_input.svg"
import icon_user from "../../../../assets/images/svg/icon_user.svg"
import icon_plus from "../../../../assets/images/svg/icon_plus.svg"
import icon_delete from "../../../../assets/images/svg/icon_delete.svg"
import icon_unassign_parent from "../../../../assets/images/svg/icon_unassign_parent.svg"
import icon_danger from "../../../../assets/images/svg/icon_danger.svg"
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PaginationAntd from '../../../../_Shared/Components/Pagination/Pagination';
import ModalReuse from '../../../../_Shared/Components/Modal-reuse/Modal-reuse';
import { useTranslation } from 'react-i18next';
import { Button, Tooltip } from 'antd';

const ParentDetail = () => {
    const { t, i18n } = useTranslation(); // dịch đa ngôn ngữ
    const [modalIsOpen, setModalIsOpen] = useState(false); // mở dal
    const [modalIsOpenRemoveRelationship, setModalIsOpenRemoveRelationship] = useState(false); // mở dal
    const { register, handleSubmit, formState: { errors }, watch, trigger,reset } = useForm({mode: "onChange"});
    const openModal = (data = null) => {
        setModalIsOpen(true); 
      };

      const closeModal = () => {
        setModalIsOpen(false); //set modal mở thêm, sửa về false
        setModalIsOpenRemoveRelationship(false); //set modal mở thêm, sửa về false
      };

      const onSubmit = (data) => {
        console.log("Dữ liệu:", data);
        closeModal();
      };

      const openModalRemoveRelationShip = () => {
        setModalIsOpenRemoveRelationship(true)
      }
      const footerModal = () => {
        return <div className="text-center mt-3">
                <button onClick={closeModal} className="btn bg-color-white-smoke me-3 w-100px">Đóng</button>
                <button type="submit" className="btn btn-primary w-100px">Lưu</button>
              </div>
      }

      const footerModalRemoveRelationship = () => {
        return <div className="text-center mt-3">
                <button onClick={closeModal} className="btn bg-color-white-smoke me-3 w-150px py-1">Hủy</button>
                <button type="submit" className="btn btn-danger w-150px py-1">Đồng ý</button>
              </div>
      }

      const title = () => {
        return <div>
            <p>Họ tên: Nguyễn Duy kiên</p>
            <p>Sinh năm: 2004</p>
            <p>Lớp: 6a1 - K18.3</p>
        </div>
      }

      const classCssTitleModal = 'text-danger'

  return (
    <div className="pt-5rem h-100vh px-4 bg-color-white h-100vh">
        <h1 className='mb-2 mt-4 fs-18'>Thông tin phụ huynh</h1>
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
                <div className='border h-70vh px-4 pt-6 overflow-auto'>
                    <h3 className='fs-18'>Thông tin học sinh</h3>
                    {/* row 1 */}
                    <div className='row mt-3 align-items-center'>
                        <div className='col-12 col-md-2'>
                            <span className='d-flex'><img src={icon_input} className='pe-2'/> Tên PH</span>
                        </div>
                        <div className="col-12 col-md-4">
                            <input className='form-control' readOnly value="Nguyễn Duy Kiên"/>
                        </div>
                        <div className='col-12 col-md-2'>
                            <span className='d-flex'><img src={icon_input} className='pe-2'/> Mã PH</span>
                        </div>
                        <div className="col-12 col-md-4">
                            <input className='form-control' readOnly/>
                        </div>
                    </div>

                    {/* row 2 */}
                    <div className='row mt-2 align-items-center'>
                        <div className='col-12 col-md-2'>
                            <span className='d-flex'><img src={icon_input} className='pe-2'/> Tên đăng nhập</span>
                        </div>
                        <div className="col-12 col-md-4">
                            <input className='form-control' readOnly/>
                        </div>
                        <div className='col-12 col-md-2'>
                            <span className='d-flex'><img src={icon_input} className='pe-2'/> Ngày sinh</span>
                        </div>
                        <div className="col-12 col-md-4">
                            <input className='form-control' readOnly/>
                        </div>
                    </div>

                    {/* row 3 */}
                    <div className='row mt-2 align-items-center'>
                        <div className='col-12 col-md-2'>
                            <span className='d-flex'><img src={icon_input} className='pe-2'/> SĐT</span>
                        </div>
                        <div className="col-12 col-md-4">
                            <input className='form-control' readOnly/>
                        </div>
                        <div className='col-12 col-md-2'>
                            <span className='d-flex'><img src={icon_input} className='pe-2'/> email </span>
                        </div>
                        <div className="col-12 col-md-4">
                            <input className='form-control' readOnly/>
                        </div>
                    </div>
                    {/* row 4 */}
                    <div className='row mt-2 align-items-top'>
                        <div className='col-12 col-md-2'>
                            <span className='d-flex'><img src={icon_input} className='pe-2'/> Địa chỉ</span>
                        </div>
                        <div className="col-12 col-md-10">
                            <textarea className='form-control' readOnly rows={'3'}/>
                        </div>
                    </div>

                    {/* row 5 */}
                    <div className='row mt-2 align-items-top'>
                        <div className='col-12 col-md-2'>
                            <span className='d-flex'><img src={icon_input} className='pe-2'/> Trạng thái</span>
                        </div>
                        <div className="col-12 col-md-10">
                            <div className='d-flex align-items-center'><input type='checkbox' className='custom-checkbox me-2'/> Hoạt động</div>
                        </div>
                    </div>

                    <hr className='mt-5 mb-4'/>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h3 className='fs-18'>Thông tin con của phụ huynh</h3>
                        <div className='d-flex'>
                            <button className='btn btn-primary d-flex align-items-center' onClick={() => openModal()}>Gán học sinh cho PH<img src={icon_plus} className='ms-2' alt='' /></button>
                        </div>
                    </div>
                    
                    <table className="w-100 mt-5">
                        <thead>
                        <tr className="border-bottom">
                            <th className="pb-3">STT</th>
                            <th className="pb-3">Họ tên con</th>
                            <th className="pb-3">Email</th>
                            <th className="pb-3">Giới tính</th>
                            <th className="pb-3">Ngày sinh</th>
                            <th className="pb-3">SĐT</th>
                            <th className="pb-3">Niên khóa</th>
                            <th className="pb-3 w-20"></th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr className="border-bottom align-middle">
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
                                <td className="py-3">K18.3</td>
                                <td className="py-3">
                                    <div className='text-danger d-flex align-items-center fw-700 cursor-pointer'><img src={icon_delete} className='me-2'/> Gỡ mối quan hệ</div>
                                </td>
                            </tr>
                            <tr className="border-bottom align-middle">
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
                                <td className="py-3">K18.3</td>
                                <td className="py-3">
                                    <div className='text-danger d-flex align-items-center fw-700 cursor-pointer'><img src={icon_delete} className='me-2'/> Gỡ mối quan hệ</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <ModalReuse isOpen={modalIsOpen} onClose={closeModal} title={"Gán học sinh cho phụ huynh"} width="80%" footerModal={footerModal()}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="fs-16">Danh sách học sinh</h1>

          <div className="d-flex justify-content-between align-items-end mt-2">
            <p>Số lượng: <span className="fw-700">32 học sinh</span></p>
            <input placeholder={t('search')} className={`bg-color-white-smoke px-3 py-2 border-radius-10px w-400px`}/>
          </div>
          <table className="w-100 mt-5">
            <thead>
              <tr className="border-bottom">
                <th className="pb-3"><input type='checkbox'/></th>
                <th className="pb-3">STT</th>
                <th className="pb-3">Họ tên học sinh</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Giới tính</th>
                <th className="pb-3">Ngày sinh</th>
                <th className="pb-3">SĐT</th>
                <th className="pb-3">Tên đăng nhập</th>
                <th className="pb-3 text-center">Niên khóa</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-bottom align-middle">
                  <td className="py-3">
                    <input type="checkbox" />
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
                  <td className="py-3 text-center">K18.3</td>
                </tr>
                <tr className="border-bottom align-middle">
                  <td className="py-3">
                    <input type="checkbox" />
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
                  <td className="py-3 text-center">K18.3</td>
                </tr>
                <tr className="border-bottom align-middle">
                  <td className="py-3">
                    <input type="checkbox" />
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
                  <td className="py-3 text-center">K18.3</td>
                </tr>
                <tr className="border-bottom align-middle">
                  <td className="py-3">
                    <input type="checkbox" />
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
                  <td className="py-3 text-center">K18.3</td>
                </tr>
                <tr className="border-bottom align-middle">
                  <td className="py-3">
                    <input type="checkbox" />
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
                  <td className="py-3 text-center">K18.3</td>
                </tr>
            </tbody>
          </table>
          <div className="mt-4 d-flex justify-content-end mb-20">
            <PaginationAntd></PaginationAntd>
          </div>
          
        </form>
      </ModalReuse>

      <ModalReuse isOpen={modalIsOpenRemoveRelationship} onClose={closeModal} title={"Gỡ phụ huynh học sinh"} width="50%" footerModal={footerModalRemoveRelationship()} titleCssCustom={classCssTitleModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex align-items-center text-danger justify-content-center">
            <img src={icon_danger} className='me-2'/> Thao tác có thể liên quan đến dữ liệu nhiều nơi. Bạn có chắc chắn muốn thực hiện thao tác?
          </div>
          
        </form>
      </ModalReuse>
    </div>
  );
};

export default ParentDetail;
