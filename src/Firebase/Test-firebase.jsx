import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Cấu hình Firebase (Thay YOUR_CONFIG bằng cấu hình từ Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyA0f72LUkQv653RDF1cvggtvp8YspZqGrM",
  authDomain: "manager-96391.firebaseapp.com",
  projectId: "manager-96391",
  storageBucket: "manager-96391.firebasestorage.app",
  messagingSenderId: "631701701097",
  appId: "1:631701701097:web:2a1eeaa2bf4f0805378b78",
  measurementId: "G-G9YRH454XD"
};

// Khởi tạo Firebase App
const app = initializeApp(firebaseConfig);

// Component quản lý FCM
const TestFirebase = () => {
  const [fcmToken, setFcmToken] = useState(null); // Lưu FCM Token
  const [notification, setNotification] = useState(null); // Lưu thông báo nhận được

  useEffect(() => {
    const messaging = getMessaging(app);

     // Đăng ký Service Worker
     const registerServiceWorker = async () => {
      try {
        const swRegistration = await navigator.serviceWorker.register("./Firebase.jsx");
        console.log("Service Worker registered:", swRegistration);
      } catch (error) {
        console.error("Lỗi khi đăng ký Service Worker:", error);
      }
    };
    
    // Hàm lấy FCM Token
    const requestFcmToken = async () => {
      try {
        const token = await getToken(messaging, {
          vapidKey: "BP9UCYeiBdTpKpN_HKL9iH7QQRmdvzE6jG8wn7nXXHqs8KqGFByqjHF3K9ijKi3gFTuYkbLvhUr0d9t-emdOPdI",
        });
        if (token) {
          console.log("FCM Token:", token);
          setFcmToken(token); // Lưu Token vào state
        } else {
          console.log("Không lấy được FCM Token.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy FCM Token:", error);
      }
    };

    // Hàm lắng nghe thông báo
    const listenForMessages = () => {
      onMessage(messaging, (payload) => {
        console.log("Thông báo nhận được:", payload);
        setNotification(payload.notification); // Cập nhật thông báo vào state
      });
    };

    // Gọi các hàm khi component được mount
    registerServiceWorker()
    requestFcmToken();
    listenForMessages();
  }, []);

  return (
    <div>
      <h1>Firebase Cloud Messaging (FCM)</h1>
      <div>
        <h2>FCM Token:</h2>
        <p>{fcmToken || "Đang lấy FCM Token..."}</p>
      </div>
      <div>
        <h2>Thông báo nhận được:</h2>
        {notification ? (
          <div>
            <p><strong>Tiêu đề:</strong> {notification.title}</p>
            <p><strong>Nội dung:</strong> {notification.body}</p>
          </div>
        ) : (
          <p>Chưa nhận được thông báo nào.</p>
        )}
      </div>
    </div>
  );
};

export default TestFirebase;
