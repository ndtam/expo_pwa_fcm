// Là một Service Worker Script do Firebase yêu cầu khi bạn dùng Firebase Cloud Messaging (FCM) cho Web Push Notifications.
// Nó chạy ngầm trong trình duyệt (background), không phụ thuộc vào app React Native Web của bạn đang mở hay không.
// Giúp nhận và hiển thị notification ngay cả khi user không mở trang web.

// Import Firebase SDK dành cho service worker.
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js');

// Khởi tạo app Firebase bên trong service worker.
firebase.initializeApp({
  apiKey: "AIzaSyDneBlZzfrW08qLbZBPt4zEOl2DgEvux2E",
  authDomain: "expo-web-push.firebaseapp.com",
  projectId: "expo-web-push",
  messagingSenderId: "1061754689798",
  appId: "1:1061754689798:web:1d5c56c8c83a6243ab2687",
});

// Lấy đối tượng FCM để xử lý message.
const messaging = firebase.messaging();

// Xử lý message khi trang web đang tắt hoặc không focus.
messaging.onBackgroundMessage(function (payload) {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const { notificationUrl } = payload.data?.url;
  const notificationOptions = {
    body: payload.notification.body,
    data: payload.data.url,
    icon: "../assets/icon.png",
    requireInteraction: true // 👈 Notification sẽ không tự đóng
  };

  console.log('🔕 Background message:', payload);
  console.log("[firebase-messaging-sw.js] showNotification ", notificationTitle, notificationUrl, notificationOptions);
  // Hiển thị push notification thủ công với tiêu đề và nội dung.
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle click → Open new tab with deeplink
self.addEventListener('notificationclick', function(event) {
  const urlToOpen = event.notification.data;
  console.log("[firebase-messaging-sw.js] addEventListener urlToOpen ", urlToOpen);
  event.notification.close();

  if (urlToOpen) {
    // Mở tab mới với deeplink
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
        for (const client of windowClients) {
          // if ('focus' in client) {
          //   client.navigate(urlToOpen);
          //   return client.focus();
          // }
          // Nếu tab đang mở có cùng origin, chuyển hướng bằng postMessage
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            client.postMessage({ type: 'navigate', url: urlToOpen });
            return client.focus();
          }
        }
        // Nếu chưa có tab mở, mở tab mới
        if (clients.openWindow) {
          console.log("[firebase-messaging-sw.js] addEventListener openWindow ", client.url);
      
          return clients.openWindow(urlToOpen);
        }
      })
    );

    // event.waitUntil(
    //   clients.openWindow(urlToOpen)
    // );
  }
});
