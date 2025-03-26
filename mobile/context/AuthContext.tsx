import { createContext, useContext } from "react";
import { Redirect, useRouter } from "expo-router";
import { User } from "@/constants/types";
import { useStorageState } from "@/hooks/useStorageState";
import { ThemedView } from "@/components/ThemedView";
import { ActivityIndicator } from "react-native";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "@/grahpql/mutations/auth";
import Toast from "react-native-toast-message";

type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  authLoading: boolean;
  login: (userData: User) => void;
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
  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION);

  const authLoading =
    loadingToken || loadingRefreshToken || loadingUser || loading;

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
  };

  const login = async (userData: User) => {
    try {
      const { data } = await loginMutation({
        variables: { input: userData },
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
      // console.error("Error during auth login:", error);
    }
  };

  const handleRegisterUser = async (payload: User) => {
    try {
    } catch (error: any) {
      // console.error("Error during auth login:", error);
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
