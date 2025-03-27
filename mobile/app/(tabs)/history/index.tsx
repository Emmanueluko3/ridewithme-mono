import React from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import HistoryItem from "@/components/historyItem";
import { useQuery } from "@apollo/client";
import { GET_RIDES } from "@/grahpql/queries/rides";

const histories = [
  { id: "1", amount: 50, date: "2025-03-23", type: "Credit" },
  { id: "2", amount: 30, date: "2025-03-22", type: "Debit" },
  { id: "3", amount: 120, date: "2025-03-20", type: "Credit" },
  { id: "4", amount: 30, date: "2025-03-22", type: "Debit" },
  { id: "5", amount: 120, date: "2025-03-20", type: "Credit" },
];

const History = () => {
  const { data, loading, error } = useQuery(GET_RIDES);

  return (
    <ThemedView style={styles.container}>
      {loading && <ThemedText>Loading...</ThemedText>}
      {error && <ThemedText>Error: {error.message}</ThemedText>}
      <ThemedText style={styles.title}> My Rides</ThemedText>
      <FlatList
        data={data.rides}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
          // onPress={() => navigation.navigate("/history", { item })}
          >
            <HistoryItem history={item} />
          </TouchableOpacity>
        )}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default History;
