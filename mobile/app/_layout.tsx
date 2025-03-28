import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import Providers from "@/providers";
import Toast from "react-native-toast-message";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Providers>
      <Slot />
      {/* <Stack>
        <Stack.Screen
          name="(auths)"
          options={{ headerShown: false, headerLeft: () => <></> }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, headerLeft: () => <></> }}
        />
        <Stack.Screen name="+not-found" />
      </Stack> */}

      <Toast />
      <StatusBar style="auto" />
    </Providers>
  );
}
