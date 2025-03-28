import React, { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import HistoryItem from "@/components/historyItem";
import { useQuery } from "@apollo/client";
import { GET_RIDES } from "@/grahpql/queries/rides";
import { ActivityIndicator } from "react-native-paper";
import { useThemeColor } from "@/hooks/useThemeColor";
import DefaultView from "@/components/views/DefaultView";
import RideDetailsModal from "@/components/RideDetailsModal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemedView } from "@/components/views/ThemedView";

const History = () => {
  const color = useThemeColor({ light: "#061220", dark: "#A1CEDC" }, "text");
  const [selectedRide, setSelectedRide] = useState(null);

  const { data, loading, error } = useQuery(GET_RIDES);
  if (loading)
    return (
      <ThemedView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <ActivityIndicator size="large" color={color} />
      </ThemedView>
    );
  return (
    <DefaultView style={styles.container}>
      <ThemedText style={styles.title}> My Rides</ThemedText>
      {error ? (
        <ThemedText style={styles.error}>Error: {error.message}</ThemedText>
      ) : data.rides.rides.length == 0 ? (
        <ThemedText style={styles.noDataFound}>
          No ride history yet, Please book a ride
        </ThemedText>
      ) : (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <FlatList
            data={data.rides.rides}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setSelectedRide(item)}>
                <HistoryItem item={item} />
              </TouchableOpacity>
            )}
          />
          <RideDetailsModal
            ride={selectedRide}
            onClose={() => setSelectedRide(null)}
          />
        </GestureHandlerRootView>
      )}
    </DefaultView>
  );
};

const styles = StyleSheet.create({
  error: {
    flex: 1,
    color: "red",
    textAlign: "center",
  },
  noDataFound: { flex: 1, color: "gray", textAlign: "center" },
  container: {
    flex: 1,
    paddingVertical: 56,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default History;
