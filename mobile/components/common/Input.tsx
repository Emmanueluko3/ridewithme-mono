import { useState } from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { ErrorMessage } from "formik";
import { Entypo } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

interface InputFieldProps extends TextInputProps {
  label?: string;
  name: string;
  lightColor?: string;
  darkColor?: string;
  error?: string;
  enablePasswordToggle?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  lightColor,
  darkColor,
  error,
  enablePasswordToggle = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <ThemedView style={{ marginBottom: 12 }}>
      {label && (
        <ThemedText style={{ marginBottom: 4, fontSize: 14 }}>
          {label}
        </ThemedText>
      )}

      <ThemedView style={{ position: "relative" }}>
        <ThemedView
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: error ? "red" : "#E8ECEF",
            borderRadius: 14,
            marginBottom: 2,
          }}
        >
          <TextInput
            {...props}
            secureTextEntry={enablePasswordToggle && !showPassword}
            placeholderTextColor={color}
            style={{
              flex: 1,
              fontSize: 16,
              color,
              paddingHorizontal: 10,
              borderRadius: 14,
              paddingVertical: 14,
            }}
          />
          {enablePasswordToggle && (
            <TouchableOpacity onPress={togglePassword} style={{ padding: 8 }}>
              {showPassword ? (
                <Entypo name="eye-with-line" size={20} color={color} />
              ) : (
                <Entypo name="eye" size={20} color={color} />
              )}
            </TouchableOpacity>
          )}
        </ThemedView>

        <ErrorMessage name={name}>
          {(msg) => <Text style={{ color: "red", fontSize: 12 }}>{msg}</Text>}
        </ErrorMessage>
      </ThemedView>
    </ThemedView>
  );
};

export default InputField;
