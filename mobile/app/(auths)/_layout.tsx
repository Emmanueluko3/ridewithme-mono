import { Slot, Stack, Tabs } from "expo-router";
import React from "react";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="signin"
        options={{ headerShown: false, headerLeft: () => <></> }}
      />
      <Stack.Screen
        name="signup"
        options={{ headerShown: false, headerLeft: () => <></> }}
      />
    </Stack>
  );
}
