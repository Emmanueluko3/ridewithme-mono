import { StyleSheet, TouchableOpacity, View } from "react-native";
import DefaultView from "@/components/views/DefaultView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/views/ThemedView";
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
import { useMutation } from "@apollo/client";
import { BOOK_RIDE } from "@/grahpql/queries/rides";
import Toast from "react-native-toast-message";

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

  const [bookRide, { loading, data }] = useMutation(BOOK_RIDE);

  const handleBookRide = async (payload: {
    pickup: string;
    dropoff: string;
    carType: string;
  }) => {
    try {
      const response = await bookRide({
        variables: {
          input: payload,
        },
      });
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Ride booked successful!",
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "Error booking ride",
      });
    }
  };

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
                pickup: "",
                dropoff: "",
                carType: selectedCar.toUpperCase(),
              }}
              validationSchema={bookRideSchema}
              onSubmit={(values) => handleBookRide(values)}
            >
              {({
                handleChange,
                setFieldValue,
                handleBlur,
                handleSubmit,
                values,
                errors,
              }) => (
                <ThemedView
                  style={{
                    paddingVertical: 16,
                  }}
                >
                  <InputField
                    name="pickup"
                    onChangeText={handleChange("pickup")}
                    error={errors.pickup}
                    onBlur={handleBlur("pickup")}
                    placeholder="Pick up location"
                    value={values.pickup}
                  />
                  <Ionicons
                    name="swap-vertical"
                    size={24}
                    color={"#007AFF"}
                    style={{ marginHorizontal: "auto", marginBottom: 8 }}
                  />
                  <InputField
                    name="dropoff"
                    onChangeText={handleChange("dropoff")}
                    error={errors.dropoff}
                    onBlur={handleBlur("dropoff")}
                    placeholder="Drop off location"
                  />

                  <ThemedView style={styles.carTypeContainer}>
                    <ThemedText style={styles.carTypeTitle}>
                      Car type:
                    </ThemedText>
                    <ThemedView style={styles.carType}>
                      {carTypes.map((car, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            setFieldValue("carType", car.toUpperCase());
                            setSelectedCar(car);
                          }}
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

                  {values.pickup && values.dropoff && values.carType && (
                    <ThemedButton
                      loading={loading}
                      style={styles.button}
                      onPress={handleSubmit}
                    >
                      Proceed
                    </ThemedButton>
                  )}
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
