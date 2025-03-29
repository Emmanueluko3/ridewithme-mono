import { createContext, useContext } from "react";
import { Redirect, useRouter } from "expo-router";
import { User } from "@/constants/types";
import { useStorageState } from "@/hooks/useStorageState";
import { ThemedView } from "@/components/views/ThemedView";
import { ActivityIndicator } from "react-native";
import { useApolloClient, useMutation } from "@apollo/client";
import { LOGIN_MUTATION, REGISTER_MUTATION } from "@/grahpql/mutations/auth";
import Toast from "react-native-toast-message";
import { useGlobalStore } from "@/store";

type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  authLoading: boolean;
  login: (payload: User) => void;
  handleRegisterUser: (payload: User) => Promise<any>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [[loadingToken, accessToken], setAccessToken] =
    useStorageState("accessToken");
  const [[loadingRefreshToken, refreshToken], setRefreshToken] =
    useStorageState("refreshToken");
  const [[loadingUser, storedUser], setStoredUser] = useStorageState("user");

  // Gql
  const client = useApolloClient();
  const [registerMutation, { loading: isRegisterLoading }] =
    useMutation(REGISTER_MUTATION);
  const [loginMutation, { loading: isLoginLoading }] =
    useMutation(LOGIN_MUTATION);
  const { setUser } = useGlobalStore();

  const authLoading =
    loadingToken ||
    loadingRefreshToken ||
    loadingUser ||
    isRegisterLoading ||
    isLoginLoading;

  const user = (() => {
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Invalid user data:", error);
      return null;
    }
  })();
  const router = useRouter();

  const setCredentials = (
    accessToken: string,
    refreshToken: string,
    user: User
  ) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setStoredUser(JSON.stringify(user));
    setUser(user);
  };

  const login = async (payload: User) => {
    try {
      const { data } = await loginMutation({
        variables: { input: payload },
      });
      if (data?.login?.accessToken && data?.login?.refreshToken) {
        setCredentials(
          data.login.accessToken,
          data.login.refreshToken,
          data.login.user
        );

        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Login Successful!",
        });
        router.push("/(tabs)");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "Login failed",
      });
    }
  };

  const handleRegisterUser = async (payload: User) => {
    try {
      const { data } = await registerMutation({
        variables: { input: payload },
      });
      if (data?.register?.accessToken && data?.register?.refreshToken) {
        setCredentials(
          data.register.accessToken,
          data.register.refreshToken,
          data.register.user
        );

        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Registration Successful!",
        });
        router.push("/(tabs)");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "Registration failed",
      });
    }
  };

  const logout = () => {
    client.resetStore();
    setAccessToken(null);
    setRefreshToken(null);
    setStoredUser(null);

    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Logout Successful!",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
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
