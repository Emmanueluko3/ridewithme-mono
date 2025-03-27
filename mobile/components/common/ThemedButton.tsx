import {
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "../ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ActivityIndicator } from "react-native";

interface ThemedButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  lightColor?: string;
  darkColor?: string;
  textStyle?: TextStyle;
  loading?: boolean;
  disabled?: boolean;
}

export function ThemedButton({
  children,
  onPress,
  style,
  lightColor,
  darkColor,
  textStyle,
  loading,
  disabled,
}: ThemedButtonProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.buttonContainer, { borderColor: color }, style]}
    >
      {loading ? (
        <ActivityIndicator animating={true} color={color} />
      ) : (
        <ThemedText
          style={[{ color: color, fontSize: 16, fontWeight: 500 }, textStyle]}
        >
          {children}
        </ThemedText>
      )}
    </TouchableOpacity>
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
