import { createContext, useContext } from "react";
import { Redirect, useRouter } from "expo-router";
import { User } from "@/constants/types";
import axios from "axios";
import { baseUrl } from "@/config/axios";
import { useStorageState } from "@/hooks/useStorageState";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ActivityIndicator } from "react-native";

type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  authLoading: boolean;
  login: (userData: User) => void;
  handleRegisterUser: (payload: User) => Promise<any>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [[loadingToken, accessToken], setAccessToken] =
    useStorageState("accessToken");
  const [[loadingUser, storedUser], setStoredUser] = useStorageState("user");

  const authLoading = loadingToken || loadingUser;

  const user = (() => {
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Invalid user data:", error);
      return null;
    }
  })();
  const router = useRouter();

  const setCredentials = (accessToken: string, user: User) => {
    setAccessToken(accessToken);
    setStoredUser(JSON.stringify(user));
  };

  const login = async (userData: User) => {
    try {
      const response = await axios.post(
        baseUrl + "api/v1/auth/sign-in",
        userData,
        { withCredentials: true }
      );

      // const { accessToken, data: user, message } = response.data;
      // setCredentials(accessToken, user);
      // toast.success(message);
      router.push("/(tabs)");
    } catch (error: any) {
      // toast.error(error?.response.data.message);
      console.error("Error during auth login:", error);
    }
  };

  const handleRegisterUser = async (payload: User) => {
    try {
    } catch (error: any) {
      console.error("Error during auth login:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setStoredUser(null);
    setAccessToken(null);
    router.push("/(auths)/signin");
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        authLoading,
        login,
        handleRegisterUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { authLoading, user, accessToken } = useAuth();

  if (authLoading) {
    return (
      <ThemedView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (!accessToken && !user) {
    return <Redirect href="/(auths)/signin" />;
  }

  return <>{children}</>;
};
