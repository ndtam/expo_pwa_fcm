import { useEffect } from 'react';
import { Platform, Text, View } from 'react-native';
import { messaging } from './firebase-messaging';
import { getToken, onMessage } from 'firebase/messaging';

export default function App() {
  // useEffect(() => {
    
  // }, []);

  if (Platform.OS === 'web' && 'Notification' in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        getToken(messaging, {
          vapidKey: 'BOwSCuJWhD__o9Hhs5Imol4_dzD9yizEa6DG_qk2_efvyomuxzFsqPb3NyG62ZvZulQF-8H1AkO3xjRHf_vaPgQ',
        }).then((token) => {
          console.log('📬 Token:', token);
          console.log('📬 messaging:', messaging);
        });
      }
    });

    onMessage(messaging, (payload) => {
      console.log('📬 payload:', payload);
      alert(`🔔 Push: ${payload.notification?.title}`);
    });
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>🔥 Push Notifications PWA + Expo Web</Text>
    </View>
  );
}