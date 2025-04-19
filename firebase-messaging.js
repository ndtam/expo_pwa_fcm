
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyDneBlZzfrW08qLbZBPt4zEOl2DgEvux2E",
  authDomain: "expo-web-push.firebaseapp.com",
  projectId: "expo-web-push",
  storageBucket: "expo-web-push.firebasestorage.app",
  messagingSenderId: "1061754689798",
  appId: "1:1061754689798:web:1d5c56c8c83a6243ab2687",
  measurementId: "G-ZZZRLEX4EV"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
