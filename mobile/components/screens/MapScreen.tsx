import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import MapView, { Callout, Marker, Polyline } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";

interface MapScreenProps {
  pickup?: string;
  dropoff?: string;
  onLocationSelect?: (
    type: "pickup" | "dropoff",
    location: { latitude: number; longitude: number; text: string }
  ) => void;
  isViewOnly?: boolean;
}

const MapScreen: React.FC<MapScreenProps> = ({
  pickup,
  dropoff,
  onLocationSelect,
  isViewOnly = false,
}) => {
  const mapRef = useRef<MapView>(null);
  const [locations, setLocations] = useState({
    pickup: { latitude: 6.5244, longitude: 3.3792, text: "Lagos" },
    dropoff: { latitude: 0, longitude: 0, text: "" },
  });
  const [route, setRoute] = useState([]);

  // Fetch location when pickup or dropoff text changes
  useEffect(() => {
    if (pickup) fetchLocation(pickup, "pickup");
    if (dropoff) fetchLocation(dropoff, "dropoff");
  }, [pickup, dropoff]);

  //   Handles converting string values to cardinals
  const fetchLocation = async (text: string, type: "pickup" | "dropoff") => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          text
        )}`
      );
      const data = await res.json();
      if (data.length > 0) {
        const newLocation = {
          latitude: +data[0].lat,
          longitude: +data[0].lon,
          text,
        };
        setLocations((prev) => ({ ...prev, [type]: newLocation }));

        // Notify parent component
        onLocationSelect?.(type, newLocation);

        // Move map to new location
        mapRef.current?.animateToRegion({
          ...newLocation,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      }
    } catch (error) {}
  };

  //   Recenter map
  const recenterToLagos = () => {
    setLocations((prev) => ({
      ...prev,
      pickup: locations.pickup,
    }));
    mapRef.current?.animateToRegion({
      latitude: locations.pickup.latitude,
      longitude: locations.pickup.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
  };

  const fetchRoute = async () => {
    try {
      const API_KEY = process.env.EXPO_PUBLIC_ORS_API_KEY;
      const start = `${locations.pickup.longitude},${locations.pickup.latitude}`;
      const end = `${locations.dropoff.longitude},${locations.dropoff.latitude}`;
      const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY}&start=${start}&end=${end}`;

      const response = await fetch(url);
      const data = await response.json();

      setRoute(
        data?.features[0]?.geometry?.coordinates.map(
          ([lng, lat]: [number, number]) => ({
            latitude: lat,
            longitude: lng,
          })
        )
      );
    } catch (error) {}
  };

  useEffect(() => {
    if (locations.pickup?.latitude && locations.dropoff?.latitude) {
      fetchRoute();
    }
  }, [locations]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 6.5244,
          longitude: 3.3792,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        scrollEnabled={!isViewOnly}
        zoomEnabled={!isViewOnly}
        rotateEnabled={!isViewOnly}
        pitchEnabled={!isViewOnly}
      >
        {(["pickup", "dropoff"] as const).map((type) => {
          const location = locations[type];
          if (location?.latitude && location?.longitude) {
            return (
              <Marker
                key={type}
                coordinate={location}
                pinColor={type === "dropoff" ? "blue" : "red"}
              >
                <Callout>
                  <Text>{`${type} Location`}</Text>
                </Callout>
              </Marker>
            );
          }

          return null;
        })}

        {route.length > 0 && (
          <Polyline coordinates={route} strokeWidth={3} strokeColor="blue" />
        )}
      </MapView>

      {!isViewOnly && (
        <TouchableOpacity style={styles.recenter} onPress={recenterToLagos}>
          <MaterialIcons name="my-location" size={20} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  recenter: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 50,
  },
});

export default MapScreen;
