import React from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

const HistoryItem = ({
  history,
}: {
  history: { id: string; amount: number; date: string; type: string };
}) => {
  return (
    <ThemedView style={styles.item}>
      <ThemedText style={styles.amount}>${history.amount}</ThemedText>
      <ThemedText style={styles.date}>{history.date}</ThemedText>
      <ThemedText style={styles.type}>{history.type}</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: "#11181C",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "#555",
  },
  type: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#007BFF",
  },
});

export default HistoryItem;
