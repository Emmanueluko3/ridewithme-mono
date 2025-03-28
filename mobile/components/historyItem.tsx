import React from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { StyleSheet, View } from "react-native";
import { ThemedView } from "./views/ThemedView";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { formatTimestamp, truncateText } from "@/constants/helpers";

const HistoryItem = ({
  item,
}: {
  item: { pickup: string; fare: string; createdAt: string; status: string };
}) => {
  const color = useThemeColor({ light: "#061220", dark: "#A1CEDC" }, "text");

  const statusColors: Record<string, string> = {
    PENDING: "#007BFF",
    CONFIRMED: "#28a745",
    COMPLETED: "#6c757d",
    CANCELLED: "#dc3545",
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.carContainer}>
        <FontAwesome5 name="car" size={24} color={color} />
      </View>
      <ThemedView>
        <ThemedText style={styles.pickup}>
          {truncateText(item.pickup, 18)}
        </ThemedText>
        <ThemedText style={styles.createdAt}>
          {formatTimestamp(parseFloat(item.createdAt))}, ${item.fare}
        </ThemedText>
      </ThemedView>

      <ThemedText style={[styles.status, { color: statusColors[item.status] }]}>
        {item.status}
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 6,
    marginVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  carContainer: {
    padding: 8,
    shadowRadius: 50,
    borderRadius: 50,
    backgroundColor: "rgba(0, 123, 255, 0.2)",
  },
  pickup: {
    fontSize: 16,
    fontWeight: "bold",
  },
  createdAt: {
    fontSize: 14,
    color: "#555",
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default HistoryItem;
