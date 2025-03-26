import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TransactionDetails({
  params,
}: {
  params: Promise<{ id: any }>;
}) {
  // const item = (await params).id;

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Transaction Details</Text>
      <Text style={styles.text}>Amount: ${item.amount}</Text>
      <Text style={styles.text}>Date: {item.date}</Text>
      <Text style={styles.text}>Type: {item.type}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
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
