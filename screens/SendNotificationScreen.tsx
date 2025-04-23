import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const SendNotificationScreen = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [url, setUrl] = useState('');

  const handleSendNotification = async () => {
    try {
      await fetch('https://your-backend/send-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body, url }),
      });
      alert('Đã gửi push!');
    } catch (error) {
      console.error('Gửi thất bại:', error);
      alert('Lỗi khi gửi push');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tiêu đề</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Title" />
      
      <Text style={styles.label}>Nội dung</Text>
      <TextInput style={styles.input} value={body} onChangeText={setBody} placeholder="Body" />
      
      <Text style={styles.label}>URL deeplink</Text>
      <TextInput style={styles.input} value={url} onChangeText={setUrl} placeholder="https://..." />
      
      <Button title="Gửi Push Notification" onPress={handleSendNotification} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { marginTop: 10 },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 5, borderRadius: 5
  }
});

export default SendNotificationScreen;