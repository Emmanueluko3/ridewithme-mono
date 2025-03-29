import React, { useState } from "react";
import { ThemedButton } from "@/components/common/ThemedButton";
import { ThemedView } from "../views/ThemedView";
import { StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import ConfirmModal from "../ConfirmModal";
import { useMutation } from "@apollo/client";
import { UPDATE_RIDE } from "@/grahpql/mutations/ride";
import Toast from "react-native-toast-message";
import { RideStatus } from "@/constants/types";

interface RideBookedScreenProps {
  onRefetch?: () => void;
  ride: any;
}

export default function RideBookedScreen({
  ride,
  onRefetch,
}: RideBookedScreenProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [cancelRide, { loading }] = useMutation(UPDATE_RIDE);

  const { id, pickup, dropoff, fare, carType, user } = ride;

  const handleCancelRide = async () => {
    try {
      const response = await cancelRide({
        variables: {
          id: parseFloat(id),
          input: { status: RideStatus.CANCELLED },
        },
      });
      if (response.data) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Ride Canceled successful!",
        });
        if (onRefetch) {
          onRefetch();
        }
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "Error canceling ride",
      });
    } finally {
      setModalVisible(false);
    }
  };
  return (
    <ThemedView style={styles.container}>
      <ConfirmModal
        isVisible={modalVisible}
        message="Are you sure you want to can ride?"
        onConfirm={handleCancelRide}
        onCancel={() => setModalVisible(false)}
      />
      <ThemedView style={styles.titleContainer}>
        <ThemedText style={styles.title}>Reservation</ThemedText>
        <ThemedText type="default">Your ride has been booked.</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedView style={styles.rideDetail}>
          <ThemedText style={styles.rideTitle}>Pick up location:</ThemedText>
          <ThemedText style={styles.rideText}>{pickup}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.rideDetail}>
          <ThemedText style={styles.rideTitle}>Drop off location:</ThemedText>
          <ThemedText style={styles.rideText}>{dropoff}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.rideDetail}>
          <ThemedText style={styles.rideTitle}>Car type:</ThemedText>
          <ThemedText style={styles.carTypeText}>{carType}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.rideDetail}>
          <ThemedText style={styles.rideTitle}>Driver:</ThemedText>
          <ThemedText style={styles.rideText}>{user.name}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.rideDetail}>
          <ThemedText style={styles.rideTitle}>Fare:</ThemedText>
          <ThemedText style={styles.rideText}>${fare}</ThemedText>
        </ThemedView>
        <ThemedButton loading={loading} onPress={() => setModalVisible(true)}>
          Cancel Ride
        </ThemedButton>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },

  titleContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  stepContainer: {
    paddingVertical: 16,
    gap: 8,
    marginBottom: 8,
  },

  rideDetail: {
    justifyContent: "space-between",
    alignItems: "center",
    flexBasis: 2,
    flex: 1,
    gap: 10,
    flexDirection: "row",
  },

  rideTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },

  rideText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#007AFF",
    paddingVertical: 1,
  },

  carTypeText: {
    textAlign: "center",
    borderColor: "#007AFF",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#007AFF22",
    color: "#007AFF",
    paddingVertical: 1,
    paddingHorizontal: 8,
  },

  button: {
    marginHorizontal: 36,
  },
});
