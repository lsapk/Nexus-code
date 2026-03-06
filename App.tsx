import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context/lib/commonjs';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ChatScreen from './src/screens/ChatScreen';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#000000' }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
          <StatusBar style="light" />
          <ChatScreen />
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
