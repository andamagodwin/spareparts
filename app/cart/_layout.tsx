import { Stack } from 'expo-router'
import React from 'react'
import { View } from 'react-native-reanimated/lib/typescript/Animated'

function cartLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: true }} />
    </Stack>
  )
}

export default cartLayout
