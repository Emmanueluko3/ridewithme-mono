import { Image, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Formik } from "formik";
import InputField from "@/components/common/Input";
import { signinSchema } from "@/constants/schema";
import { ThemedButton } from "@/components/common/ThemedButton";
import { useRouter } from "expo-router";
import AuthView from "@/components/AuthView";

export default function Signin() {
  const router = useRouter();
  return (
    <AuthView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#061220" }}
      headerImage={
        <Image
          source={require("@/assets/images/UberLyft.webp")}
          style={styles.banner}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>
          Sign In
        </ThemedText>
        <ThemedText>Jump right back into it!</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={signinSchema}
          onSubmit={(values) => alert("Signin coming soon")}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <ThemedView style={{ paddingVertical: 16 }}>
              <InputField
                name="email"
                label="Email"
                onChangeText={handleChange("email")}
                error={errors.email}
                onBlur={handleBlur("email")}
                placeholder="Enter your email"
                value={values.email}
              />

              <InputField
                name="password"
                label="Password"
                onChangeText={handleChange("password")}
                error={errors.password}
                onBlur={handleBlur("password")}
                placeholder="Enter your password"
                enablePasswordToggle
              />

              <ThemedButton style={styles.button} onPress={handleSubmit}>
                SIGN IN
              </ThemedButton>

              <ThemedView style={styles.centerContainer}>
                <ThemedText style={styles.stepContainer}>
                  Already have an account?{" "}
                  <ThemedText
                    type="link"
                    onPress={() => router.replace("/(auths)/signup")}
                  >
                    Sign up
                  </ThemedText>
                </ThemedText>
              </ThemedView>
            </ThemedView>
          )}
        </Formik>
      </ThemedView>
    </AuthView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexDirection: "column",
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
  banner: {
    height: 278,
    width: "100%",
    bottom: 0,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    left: 0,
    position: "absolute",
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
