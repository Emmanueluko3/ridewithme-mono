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

export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);

  return formattedDate.replace(",", "").replace(" ", ", ");
};

export const truncateText = (text: string, maxLength: number = 20): string => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};
