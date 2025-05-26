import { Stack } from 'expo-router';
import { LogBox } from 'react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ProgressProvider } from './context/ProgressContext';

LogBox.ignoreAllLogs(true);

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ProgressProvider>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="not-found"
            options={{ title: 'Not Found' }}
          />
        </Stack>
      </ProgressProvider>
    </GestureHandlerRootView>
  );
}
