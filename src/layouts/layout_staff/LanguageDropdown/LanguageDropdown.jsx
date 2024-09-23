import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import icon_header_3 from '../../../assets/images/svg/icon_header_3.svg'
import arrow_down from '../../../assets/images/svg/arrow_down.svg'

function LanguageDropdown() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language); // Lưu ngôn ngữ hiện tại
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng); // Cập nhật ngôn ngữ được chọn
    setIsOpen(false); // Đóng dropdown sau khi chọn
  };

  return (
    <div className=" d-flex align-items-center">
    <div className='d-flex align-items-center cursor-pointer' onClick={toggleDropdown}>
        <img src={icon_header_3} alt=""  className='icon-resize'/>
        <img src={arrow_down} className='icon-resize-small me-4 ms-2'/>
    </div>
      <div className="relative inline-block text-left">
        {isOpen && (
          <div className="absolute right-0 z-10 mt-3 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="none">
              <button
                onClick={() => changeLanguage('en')}
                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${selectedLanguage === 'en' ? 'active' : ''}`}
              >
                {t('en')}
              </button>
              <button
                onClick={() => changeLanguage('vi')}
                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${selectedLanguage === 'vi' ? 'active' : ''}`}
              >
                {t('vi')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LanguageDropdown;