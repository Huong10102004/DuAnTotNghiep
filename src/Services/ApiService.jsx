// services/apiService.js
import axios from 'axios';

// URL gốc của API
const API_BASE_URL = 'http://127.0.0.1:8000/api/';

const token = localStorage.getItem('token'); // Lấy token từ localStorage
// Hàm call API chung
export const ApiService = async (endpoint, method = 'GET', data = null) => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}${endpoint}`,
      method: method,
      data: data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Gửi token trong header
      },
    });
    
    // Trả về dữ liệu thành công từ API
    return response.data;
  } catch (error) {
    // Xử lý lỗi
    console.error('Error calling API:', error);
    throw error;
  }
};
