import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

export const formFeedback = {
  required: (field: string) => `${field} is required`,
  invalidEmail: "Invalid email format",
};

export const getToken = async (key: string) => {
  try {
    if (Platform.OS === "web") {
      return await localStorage.getItem(key);
    } else {
      return await SecureStore.getItemAsync(key);
    }
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};
