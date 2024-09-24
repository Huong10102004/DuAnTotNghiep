import React from 'react';
import Logo from '../../../assets/images/png/logo.png'
import avatar from '../../../assets/images/png/avatar.png'
import icon_header_1 from '../../../assets/images/svg/icon_header_1.svg'
import icon_header_2 from '../../../assets/images/svg/icon_header_2.svg'
import icon_header_3 from '../../../assets/images/svg/icon_header_3.svg'
import setting from '../../../assets/images/svg/setting.svg'
import arrow_down from '../../../assets/images/svg/arrow_down.svg'
import './header.css';
import LanguageDropdown from '../LanguageDropdown/LanguageDropdown';

function Header() { 

  return <div className="">
      <div className="row bg-color-white-smoke pb-2 me-1">
        <div className="col-sm-2">
            <img src={Logo} /> 
        </div>
        <div className="col-sm-10 d-flex justify-content-between align-items-center">
          <div className='w-70'>
            <button className='btn btn-primary'>Nguyễn Duy Kiên 2023 - 2024</button>
          </div>
          <div className='d-flex justify-content-end w-30'>
            <div className='d-flex w-40 align-items-center'>
              <img src={icon_header_1} alt=""  className='icon-resize me-4'/>
              <img src={icon_header_2} alt=""  className='icon-resize me-4'/>
              <div className='d-flex me-4 align-items-center'>
                {/* <img src={icon_header_3} alt=""  className='icon-resize'/>
                <img src={arrow_down} className='icon-resize-small me-4 ms-2'/> */}
                <LanguageDropdown></LanguageDropdown>
              </div>
            </div>
            <div className='d-flex align-items-center'>
              <div className='d-flex align-items-center'>
                <img src={avatar} alt="" className='me-2' /> <span className='d-flex align-items-center'>Kiên <img src={arrow_down} className='icon-resize-small me-4 ms-2'/></span>
              </div>
              <img src={setting} alt="" className='me-2 icon-resize'/>
            </div>
          </div>
        </div>
      </div>
  </div>;
}

export default Header;
