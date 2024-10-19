import { notification } from 'antd';
import { useEffect } from 'react';

const NotificationComponent = ({ statusCode}) => {
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    // Hàm để mở notification dựa vào statusCode
    const openNotification = (message, description, duration = 3) => {
      api.info({
        message,
        description,
        placement: 'topRight',
        duration,
      });
    };

    console.log(api);
    console.log(contextHolder)
    // Hiển thị thông báo dựa trên statusCode
    if (statusCode) {
      if (statusCode === 422) {
        openNotification('Error 422', 'Unprocessable Entity - Validation failed!', 5);
      } else if (statusCode === 400) {
        openNotification('Error 400', 'Bad Request - Something went wrong!', 3);
      } else if (statusCode === 502) {
        openNotification('Error 502 nhak', 'Bad Gateway - Unable to reach server!', 5);
      } else {
        openNotification(`Error ${statusCode}`, `An error occurred with status code: ${statusCode}`);
      }
    }
  }, [statusCode, api]);  // Chạy mỗi khi statusCode thay đổi

  return <>{contextHolder}</>;
};

export default NotificationComponent;
