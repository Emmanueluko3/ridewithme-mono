import { Stack, Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ProtectedRoute } from "@/context/AuthContext";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <ProtectedRoute>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: "absolute",
              height: "8.5%",
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            animation: "fade",
            tabBarIcon: ({ color }) => (
              <Entypo size={24} name="home" color={color} />
            ),
            tabBarLabelStyle: {
              fontSize: 10,
              fontWeight: "semibold",
            },
          }}
        />
        <Tabs.Screen
          name="rides"
          options={{
            title: "Rides",
            animation: "fade",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={24} name="history" color={color} />
            ),
            tabBarLabelStyle: {
              fontSize: 10,
              fontWeight: "semibold",
            },
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: "Account",
            animation: "fade",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user-circle-o" size={24} color={color} />
            ),
            tabBarLabelStyle: {
              fontSize: 10,
              fontWeight: "semibold",
            },
          }}
        />
      </Tabs>
    </ProtectedRoute>
  );
}
