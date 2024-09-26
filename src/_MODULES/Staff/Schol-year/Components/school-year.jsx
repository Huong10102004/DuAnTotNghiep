import React, { useEffect, useState } from "react";
import PaginationAntd from "../../../../_Shared/Components/Pagination/Pagination";
import export_file from "../../../../assets/images/svg/export_file.svg"
import icon_plus from "../../../../assets/images/svg/icon_plus.svg"
import ModalReuse from "../../../../_Shared/Components/Modal-reuse/Modal-reuse";

const SchoolYear = () => {
    //modal 
    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    const openModal = () => {
        setModalIsOpen(true);
      };
    
      const closeModal = () => {
        setModalIsOpen(false);
      };




  return (
    <div>
      {/* <header className="h-[100px] w-full"></header> */}
      <div className="pt-6rem bg-white h-100vh px-4">
            <h1 className="fs-16">Niên khóa</h1>
            <p className="mt-2">Task/subtitle/subtitle</p>

            <div className="d-flex justify-content-between align-items-end mt-2">
                <p>Số lượng: 23 lớp</p>
                <div className="d-flex">
                    <input placeholder="Tìm kiếm...." class={`bg-color-white-smoke px-3 py-2 border-radius-10px w-300px`}/>
                    <button className="btn bg-color-blue text-color-white mx-3 d-flex align-items-center">Xuất file excel <img className="ps-2" src={export_file}/></button>
                    <button className="btn bg-color-green-bold text-color-white d-flex align-items-center" onClick={openModal}>Thêm mới <img className="ps-2" src={icon_plus}/></button>
                </div>
            </div>

            <div className="table-responsive mt-4">
                <table className="min-w-full table table-bordered border-collapse border border-gray-300">
                    <thead className="bg-color-blue text-white">
                        <tr>
                            <th className="w-5 text-center">STT</th>
                            <th><span className="ps-10">Thông tin niên khóa</span></th>
                            <th className="text-center">Trạng thái</th>
                            <th className="text-center w-10">Thời gian bắt đầu</th>
                            <th className="text-center">Thời gian kết thúc</th>
                            <th className="w-10 text-center">Khối học hiện tại</th>
                            <th className="w-10 text-center">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                         <tr className="align-middle">
                            <td className="text-center">1</td>
                            <td>
                                <span>K10.3</span><br/>
                                <span>Mã: NKTH303</span>
                            </td>
                            <td className="text-center">
                                Đang diễn ra
                            </td>
                            <td className="text-center">
                                05/09/2024
                            </td>
                            <td className="text-center">
                                20/05/2028
                            </td>
                            <td className="text-center">
                                Khối 6
                            </td>
                            <td className="text-center">
                                ...
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-end">
                <PaginationAntd></PaginationAntd>
            </div>
      </div>

      {/* modal  */}
      <ModalReuse isOpen={modalIsOpen} onClose={closeModal} title="My Modal Title">
        <p>This is the content inside the reusable modal!</p>
      </ModalReuse>
    </div>
  );
};

export default SchoolYear;
