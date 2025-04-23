const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Khởi tạo Firebase Admin SDK từ file key JSON
const serviceAccount = require('./firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const messaging = admin.messaging();

// Endpoint nhận yêu cầu gửi push notification
app.post('/send-notification', async (req, res) => {
  const { title, body, url } = req.body;

  // Gửi đến 1 device token cố định (bạn cần lấy token từ client)
  const targetToken = process.env.DEVICE_TOKEN;

  if (!targetToken) {
    return res.status(400).json({ error: 'Chưa có device token trong .env' });
  }

  const message = {
    token: targetToken,
    notification: {
      title,
      body,
    },
    data: {
      url,
    },
    webpush: {
      fcmOptions: {
        link: url, // Đảm bảo deeplink hoạt động
      },
      notification: {
        requireInteraction: 'true', // Giữ notification không biến mất
      },
    },
  };

  try {
    const response = await messaging.send(message);
    console.log('✅ Notification sent:', response);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Error sending notification:', error);
    res.status(500).json({ error: 'Gửi push thất bại' });
  }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Push server chạy tại http://localhost:${PORT}`));