import React, { useState } from 'react';
import axios from 'axios';
import background_image from '../../assets/images/jpg/background_image.jpg'
import Loading from '../../_Shared/Components/Loading/Loading';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang

    try {
      setLoading(true);  // Bắt đầu tải dữ liệu
      const response = await axios.post('http://127.0.0.1:8000/api/auth/login', {
        username,
        password,
      },
      {
        headers: {
          'Accept': 'application/json', // Gửi header
        },
      } 
    );

      // Nếu đăng nhập thành công
      console.log(response.data);
      // Lưu token hoặc chuyển hướng tới trang khác nếu cần
      localStorage.setItem('token', response.data.token);

      // Điều hướng người dùng đến trang khác sau khi đăng nhập thành công
      window.location.href = '/staff/class'; // chuyển hướng đến trang chủ hoặc bất kỳ trang nào
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Đăng nhập thất bại');
    } finally {
      setLoading(false);  // Dừng trạng thái tải dữ liệu
    }
  };

  return (
    <div className='container-fluid'>
      <Loading isLoading={loading} />
      <div className='row p-0'>
          <div className="col-8 p-0 m-0">
              <div className='background-image h-100vh'></div>
          </div>

          <div className="col-4 p-0 m-0">
            <div className='d-flex mt-20 pt-20 justify-content-center'>
              <div className='w-80'>
                <h2 className='fs-18 text-color-orange mb-5 text-center'>Đăng nhập hệ thống</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleLogin}>
                  <div>
                    <input type="text" value={username} onChange={(e) => setusername(e.target.value)} placeholder='Tên đăng nhập...' className='form-control border-none'/>
                  </div>
                  <div className='mt-2'>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='Mật khẩu...' className='form-control border-none'/>
                  </div>
                  <p className='mt-2 d-flex justify-content-end'>Quên mật khẩu ?</p>
                  <button type="submit" className='btn bg-color-orange w-100 text-color-white border-radius-30px mt-3'>Login</button>
                </form>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Login;