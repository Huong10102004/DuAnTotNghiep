import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // or "modern"
      }
    }
  },
  server: {
    port: 5173,
    open: true, // Tự động mở trình duyệt
    fs: {
      strict: true, // Đảm bảo chỉ đọc từ thư mục dự án
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        sw: './public/firebase-messaging-sw', // Xác định rõ đường dẫn
      },
    },
  },
  homepage: "."
})
