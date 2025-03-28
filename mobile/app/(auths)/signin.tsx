import { Image, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/views/ThemedView";
import { Formik } from "formik";
import InputField from "@/components/common/Input";
import { signinSchema } from "@/constants/validation-schema";
import { ThemedButton } from "@/components/common/ThemedButton";
import { useRouter } from "expo-router";
import AuthView from "@/components/views/AuthView";
import { useAuth } from "@/context/AuthContext";

export default function Signin() {
  const router = useRouter();
  const { authLoading, login } = useAuth();
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
          onSubmit={(values) => login(values)}
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

              <ThemedButton
                loading={authLoading}
                disabled={authLoading}
                style={styles.button}
                onPress={handleSubmit}
              >
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
