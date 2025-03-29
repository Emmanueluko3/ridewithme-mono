import { StyleSheet } from "react-native";
import DefaultView from "@/components/views/DefaultView";
import { ThemedView } from "@/components/views/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKED_RIDE } from "@/grahpql/queries/rides";
import BookRideScreen from "@/components/screens/BookRideScreen";
import RideBookedScreen from "@/components/screens/RideBookedScreen";
import { ActivityIndicator } from "react-native-paper";
import MapScreen from "@/components/screens/MapScreen";

const MAP_HEIGHT = 400;

export default function HomeScreen() {
  const color = useThemeColor({ light: "#061220", dark: "#A1CEDC" }, "text");
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const mapAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-MAP_HEIGHT, 0, MAP_HEIGHT],
            [-MAP_HEIGHT / 2, 0, MAP_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-MAP_HEIGHT, 0, MAP_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  // Map and input location
  const [pickup, setPickup] = useState("Lagos");
  const [dropoff, setDropoff] = useState("");

  const [bookedRide, setBookedRide] = useState<any>();

  const {
    data: bookedData,
    loading: bookedLoading,
    refetch,
  } = useQuery(GET_BOOKED_RIDE, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "network-only",
  });

  useEffect(() => {
    if (bookedData?.getBookedRide) {
      setPickup(bookedData?.getBookedRide?.pickup);
      setDropoff(bookedRide?.getBookedRide?.dropoff);
      setBookedRide(bookedData?.getBookedRide);
    } else refetch();
  }, [bookedData, refetch]);

  return (
    <DefaultView style={styles.root}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View style={[styles.mapContainer, mapAnimatedStyle]}>
          <MapScreen pickup={pickup} dropoff={dropoff} />
        </Animated.View>
        {bookedLoading ? (
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
        ) : bookedRide ? (
          <RideBookedScreen
            ride={bookedRide}
            onRefetch={() => {
              setBookedRide(null);
              setPickup("lagos");
              setDropoff("");
              refetch();
            }}
          />
        ) : (
          <BookRideScreen
            onRefetch={refetch}
            setPickup={(item) => setPickup(item)}
            setDropoff={(item) => setDropoff(item)}
          />
        )}
      </Animated.ScrollView>
    </DefaultView>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 0,
    paddingBottom: 40,
  },

  mapContainer: {
    width: "100%",
    height: MAP_HEIGHT,
    overflow: "hidden",
  },

  map: {
    width: "100%",
    height: "100%",
  },
});
