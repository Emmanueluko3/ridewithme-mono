import {
  Animated,
  Pressable,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { ThemedText } from "../ThemedText";
import { useRef, useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";

interface ThemedButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  lightColor?: string;
  darkColor?: string;
  textStyle?: TextStyle;
  backgroundColors?: [string, string];
}

export function ThemedButton({
  children,
  onPress,
  style,
  lightColor,
  darkColor,
  textStyle,
  backgroundColors = ["transparent", "#fff"],
}: ThemedButtonProps) {
  const animation = useRef(new Animated.Value(0)).current;

  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  const handlePressIn = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 60,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 60,
      useNativeDriver: false,
    }).start();
    onPress?.();
  };

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: backgroundColors,
  });

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View
        style={[
          styles.buttonContainer,
          { backgroundColor },
          { borderColor: "#E8ECEF" ?? color },
          style,
        ]}
      >
        <ThemedText
          style={[{ color: color, fontSize: 16, fontWeight: 500 }, textStyle]}
        >
          {children}
        </ThemedText>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 14,
    padding: 10,
  },
});
