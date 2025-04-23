import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screen1 from '../screens/Screen1';
import Screen2 from '../screens/Screen2';
import { View, Text, Pressable } from 'react-native';

const Stack = createNativeStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator
    screenOptions={({ navigation }) => ({
      headerRight: () => (
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Pressable onPress={() => navigation.navigate('Screen1')}>
            <Text style={{ color: 'blue', marginRight: 10 }}>Tab 1</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Screen2')}>
            <Text style={{ color: 'blue' }}>Tab 2</Text>
          </Pressable>
        </View>
      ),
    })}
  >
    <Stack.Screen name="Screen1" component={Screen1} />
    <Stack.Screen name="Screen2" component={Screen2} />
  </Stack.Navigator>
);

export default StackNavigator;
