import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

// Hàm để lấy danh sách items
export const getListClassToAttendance = async () => {
  try {
    const response = await axios.get(`https://65f1604bda8c6584131d9e7f.mockapi.io/api/history_attendance`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching items');
  }
};

// Hàm để lấy item theo ID
export const fetchItemById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/items/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching item');
  }
};