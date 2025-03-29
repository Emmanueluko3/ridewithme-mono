import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { ThemedView } from "./views/ThemedView";
import { ThemedText } from "./ThemedText";
import { ThemedButton } from "./common/ThemedButton";
import { formatTimestamp } from "@/constants/helpers";
import MapScreen from "./screens/MapScreen";

interface Ride {
  id: string;
  pickup: string;
  dropoff: string;
  carType: string;
  fare: number;
  status: string;
  createdAt: string;
  user: {
    name: string;
    phone: string;
  };
}

interface RideDetailsModalProps {
  ride: Ride | null;
  onClose: () => void;
}

const RideDetailsModal: React.FC<RideDetailsModalProps> = ({
  ride,
  onClose,
}) => {
  if (!ride) return null;

  const swipeGesture = Gesture.Pan().onUpdate((event) => {
    if (event.translationX > +100) runOnJS(onClose)();
  });

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={!!ride}
      onRequestClose={onClose}
    >
      <GestureDetector gesture={swipeGesture}>
        <ThemedView style={styles.modalContainer}>
          <View style={{ padding: 20 }}>
            <ThemedText style={styles.modalTitle}>
              Ride With {ride?.user?.name?.split(" ")[0]}
            </ThemedText>
            <ThemedText style={styles.modalSubtitle}>
              {formatTimestamp(parseFloat(ride.createdAt))}
            </ThemedText>
          </View>
          <MapScreen pickup={ride.pickup} dropoff={ride.dropoff} isViewOnly />

          <ThemedView style={styles.content}>
            <ThemedText style={styles.modalText}>
              Pickup: {ride.pickup}
            </ThemedText>
            <ThemedText style={styles.modalText}>
              Dropoff: {ride.dropoff}
            </ThemedText>
            <ThemedText style={styles.modalText}>
              Car Type: {ride.carType}
            </ThemedText>
            <ThemedText style={styles.modalText}>Fare: ${ride.fare}</ThemedText>
            <ThemedText style={styles.modalText}>
              Status: {ride.status}
            </ThemedText>
          </ThemedView>
          <ThemedButton style={styles.closeButton} onPress={onClose}>
            Close
          </ThemedButton>
        </ThemedView>
      </GestureDetector>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    paddingVertical: 100,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  modalSubtitle: {
    fontSize: 16,
  },
  content: {
    padding: 20,
    marginBottom: 60,
  },
  modalText: {
    fontSize: 18,
    marginVertical: 5,
  },
  closeButton: {
    margin: 20,
  },
});

export default RideDetailsModal;
