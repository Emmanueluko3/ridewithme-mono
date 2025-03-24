import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { AuthProvider } from "@/context/AuthContext";
import { ReactNode } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";

const Providers = ({ children }: { children: ReactNode }) => {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
};

export default Providers;
