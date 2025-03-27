import DefaultView from "@/components/DefaultView";
import { ThemedText } from "@/components/ThemedText";

import { StyleSheet } from "react-native";

export default function HistoryDetails() {
  return (
    <DefaultView>
      <ThemedText style={styles.title}>History Details</ThemedText>
      <ThemedText style={styles.text}>Amount: $2</ThemedText>
      <ThemedText style={styles.text}>Date: 12-3-2025</ThemedText>
      <ThemedText style={styles.text}>Type: Ride</ThemedText>
    </DefaultView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
  },
});
