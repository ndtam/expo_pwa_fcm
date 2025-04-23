import { useEffect } from 'react';
import { Platform, Text, View } from 'react-native';
import { messaging } from './firebase-messaging';
import { getToken, onMessage } from 'firebase/messaging';
import { useRouter } from 'expo-router';

import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import { useNavigate } from 'react-router-dom';

import * as Linking from 'expo-linking';

export default function App() {

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data?.type === 'navigate' && event.data?.url) {
          console.log('📩 Received deeplink navigation:', event.data.url);
          window.location.href = event.data.url; // 👈 Điều hướng ngay tại đây
        }
      });
    }
  }, []);

  if (Platform.OS === 'web' && 'Notification' in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        getToken(messaging, {
          vapidKey: 'BOwSCuJWhD__o9Hhs5Imol4_dzD9yizEa6DG_qk2_efvyomuxzFsqPb3NyG62ZvZulQF-8H1AkO3xjRHf_vaPgQ',
        }).then((token) => {
          console.log('📬 App() Token:', token);
          console.log('📬 App() messaging:', messaging);
        });
      }
    });
    const router = useRouter();
    onMessage(messaging, (payload) => {
      console.log('🔔 Foreground message: payload', payload);

      const url = payload.data?.url;
      if (url) {
        if (Notification.permission === 'granted') {
          const notification = new Notification(payload.notification?.title || 'Thông báo', {
            body: payload.notification?.body,
            icon: '/icon.png',
            data: { url },
            requireInteraction: true // 👈 giữ notification hiện cho đến khi user tương tác
          });
  
          notification.onclick = (event) => {
            event.preventDefault();
            if (url) {
              Linking.openURL(url);
              // window.open(new URL(url, window.location.origin).toString(), '_blank');
            }
          };
        }



        // Chuyển hướng bằng deeplink
        // console.log('📬 url:', url);
        // showToast({
        //   message: payload.notification?.title,
        //   action: {
        //     label: 'Mở',
        //     onClick: () => {
        //       const absoluteUrl = new URL(url, window.location.origin).toString();
        //       window.open(absoluteUrl, '_blank');
        //     }
        //   }
        // });

        // router.push(url.replace('myapp://', '/'));
      }
    });
  }

  const linking = {
    prefixes: ['http://localhost:8081/', 'yourapp://'], // Web URL và scheme cho mobile
    config: {
      screens: {
        Screen1: 'screen1',
        Screen2: 'screen2',
      },
    },
  };
  return (
    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //   <Text>🔥 Push Notifications PWA + Expo Web</Text>
    // </View>
    <NavigationContainer linking={linking}>
      <StackNavigator />
    </NavigationContainer>
  );
}