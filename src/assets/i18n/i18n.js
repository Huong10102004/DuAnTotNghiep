import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import vi from './locales/vi.json';


// Cấu hình i18next
i18n
  .use(LanguageDetector) // Tự động phát hiện ngôn ngữ
  .use(initReactI18next) // Kết nối với React
  .init({
    lng: 'vi', // Ngôn ngữ mặc định khởi động
    resources: {
      en: { translation: en },
      vi: { translation: vi },
    },
    fallbackLng: 'vi', // Ngôn ngữ mặc định
    interpolation: {
      escapeValue: false, // React đã tự động escape
    },
  });

export default i18n;