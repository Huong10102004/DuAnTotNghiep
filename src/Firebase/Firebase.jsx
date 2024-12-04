// Import các thư viện Firebase cần thiết
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Cấu hình Firebase (lấy từ Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyA0f72LUkQv653RDF1cvggtvp8YspZqGrM",
    authDomain: "manager-96391.firebaseapp.com",
    projectId: "manager-96391",
    storageBucket: "manager-96391.firebasestorage.app",
    messagingSenderId: "631701701097",
    appId: "1:631701701097:web:2a1eeaa2bf4f0805378b78",
    measurementId: "G-G9YRH454XD",
};

// Khởi tạo Firebase App
const app = initializeApp(firebaseConfig);

// Khởi tạo các dịch vụ Firebase
const db = getFirestore(app);
const realtimeDb = getDatabase(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, db, realtimeDb, auth, analytics };
