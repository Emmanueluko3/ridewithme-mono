import { StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Formik } from "formik";
import InputField from "@/components/common/Input";
import { signinSchema } from "@/constants/schema";
import { ThemedButton } from "@/components/common/ThemedButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import MapView from "react-native-maps";

export default function HomeScreen() {
  const color = useThemeColor({ light: "#061220", dark: "#A1CEDC" }, "text");

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#061220" }}
      // headerImage={<MapView style={styles.map} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>
          Home
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Formik
          initialValues={{ pickUpPoint: "", destination: "" }}
          validationSchema={signinSchema}
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
                color={color}
                style={{ marginHorizontal: "auto", marginBottom: 8 }}
              />
              <InputField
                name="destination"
                onChangeText={handleChange("destination")}
                error={errors.destination}
                onBlur={handleBlur("destination")}
                placeholder="Destination"
              />

              <ThemedButton style={styles.button} onPress={handleSubmit}>
                Proceed
              </ThemedButton>
            </ThemedView>
          )}
        </Formik>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "medium",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },

  map: {
    width: "100%",
    height: "100%",
  },

  button: {
    marginHorizontal: 36,
    marginBottom: 20,
  },

  centerContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
});
