import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="menu" />
      <Stack.Screen name="pet-profile" />
      <Stack.Screen name="ai-monitor" />
      <Stack.Screen name="reminders" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="petProfile" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}