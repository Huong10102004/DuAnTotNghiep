import React, { useState, useEffect } from 'react';
import success_icon from "../../../assets/images/png/success.png";
import warning_icon from "../../../assets/images/png/warning.png";
import error_icon from "../../../assets/images/png/error.png";

const NotificationCustom = ({ type, message,title, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  let icon, color, backgroundColor;
  backgroundColor = "#ffffff"
  switch (type) {
    case 'success':
      icon = success_icon;
      color = '#4caf50'; // Màu xanh lá cây
      break;
    case 'warning':
      icon = warning_icon;
      color = '#ff9800'; // Màu vàng
      break;
    case 'error':
      icon = error_icon;
      color = '#f44336'; // Màu đỏ
      break;
    default:
      icon = '';
      color = '#fff';
  }

  return (
    <div className="notification" style={{ color, backgroundColor}}>
      <div className="icon"><img src={icon} alt="" /></div>
      <div>
        <div className="title">{title}</div>
        <div className="message">{message}</div>
      </div>
    </div>
  );
};

export default NotificationCustom;
