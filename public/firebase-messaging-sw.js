importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDneBlZzfrW08qLbZBPt4zEOl2DgEvux2E",
  authDomain: "expo-web-push.firebaseapp.com",
  projectId: "expo-web-push",
  messagingSenderId: "1061754689798",
  appId: "1:1061754689798:web:1d5c56c8c83a6243ab2687",
});

const messaging = firebase.messaging();

// console.log('[firebase-messaging-sw.js] Received background message ', payload);

messaging.onBackgroundMessage(function (payload) {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "../assets/icon.png",
  };
  console.log("[firebase-messaging-sw.js] showNotification ", notificationTitle, notificationOptions);
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('push', (event) => {
  console.log('Push event received:', event);

  const notificationTitle = 'Test title';
  const notificationOptions = {
    body: 'Test body',
    icon: '/icon.png',
  };

  event.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );
});
