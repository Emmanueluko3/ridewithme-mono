import { StyleSheet, TouchableOpacity, View } from "react-native";
import DefaultView from "@/components/DefaultView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Formik } from "formik";
import InputField from "@/components/common/Input";
import { bookRideSchema } from "@/constants/validation-schema";
import { ThemedButton } from "@/components/common/ThemedButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import MapView from "react-native-maps";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { useState } from "react";

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

  const carTypes = ["Sedan", "SUV", "Hatchback", "Truck"];
  const [selectedCar, setSelectedCar] = useState(carTypes[0]);

  return (
    <DefaultView style={styles.root}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View style={[styles.mapContainer, mapAnimatedStyle]}>
          <MapView style={styles.map} />
        </Animated.View>

        <ThemedView style={styles.container}>
          <ThemedView style={styles.titleContainer}>
            <ThemedText style={styles.title}>Book a ride</ThemedText>
          </ThemedView>
          <ThemedView style={styles.stepContainer}>
            <Formik
              initialValues={{
                pickUpPoint: "",
                destination: "",
                carType: selectedCar,
              }}
              validationSchema={bookRideSchema}
              onSubmit={(values) => alert("Signup coming soon")}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <ThemedView
                  style={{
                    paddingVertical: 16,
                  }}
                >
                  <InputField
                    name="pickUpPoint"
                    onChangeText={handleChange("pickUpPoint")}
                    error={errors.pickUpPoint}
                    onBlur={handleBlur("pickUpPoint")}
                    placeholder="Pick up location"
                    value={values.pickUpPoint}
                  />
                  <Ionicons
                    name="swap-vertical"
                    size={24}
                    color={"#007AFF"}
                    style={{ marginHorizontal: "auto", marginBottom: 8 }}
                  />
                  <InputField
                    name="destination"
                    onChangeText={handleChange("destination")}
                    error={errors.destination}
                    onBlur={handleBlur("destination")}
                    placeholder="Destination"
                  />

                  <ThemedView style={styles.carTypeContainer}>
                    <ThemedText style={styles.carTypeTitle}>
                      Car type:
                    </ThemedText>
                    <ThemedView style={styles.carType}>
                      {carTypes.map((car, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => setSelectedCar(car)}
                          style={[
                            styles.carTypeItem,
                            {
                              borderColor:
                                selectedCar === car ? "#007AFF" : color,
                              backgroundColor:
                                selectedCar === car
                                  ? "#007AFF22"
                                  : "transparent",
                            },
                          ]}
                        >
                          <ThemedText
                            style={[
                              styles.carTypeText,
                              {
                                color: selectedCar === car ? "#007AFF" : color,
                              },
                            ]}
                          >
                            {car}
                          </ThemedText>
                        </TouchableOpacity>
                      ))}
                    </ThemedView>
                  </ThemedView>

                  <ThemedButton style={styles.button} onPress={handleSubmit}>
                    Proceed
                  </ThemedButton>
                </ThemedView>
              )}
            </Formik>
          </ThemedView>
        </ThemedView>
      </Animated.ScrollView>
    </DefaultView>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 0,
    paddingBottom: 40,
  },

  container: { padding: 20 },

  titleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  stepContainer: {
    gap: 8,
    marginBottom: 8,
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

  carTypeTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },

  carTypeContainer: {
    marginVertical: 40,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  carType: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },

  carTypeItem: {
    width: "46%",
    padding: 4,
    borderWidth: 1,
    backgroundColor: "transparent",
    borderRadius: 8,
    alignItems: "center",
  },

  carTypeText: {
    textAlign: "center",
  },

  button: {
    marginHorizontal: 36,
  },
});
