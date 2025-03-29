import DefaultView from "@/components/views/DefaultView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/views/ThemedView";
import { ThemedButton } from "@/components/common/ThemedButton";
import { useAuth } from "@/context/AuthContext";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, ImageBackground, Text } from "react-native";
import { ActivityIndicator, Avatar, IconButton } from "react-native-paper";
import { useGlobalStore } from "@/store";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useQuery } from "@apollo/client";
import { GET_ME } from "@/grahpql/queries/user";
import ConfirmModal from "@/components/ConfirmModal";
import { useFocusEffect } from "expo-router";

const AcountScreen = () => {
  const color = useThemeColor({ light: "#061220", dark: "#A1CEDC" }, "text");
  const { authLoading, logout } = useAuth();
  const { user, setUser } = useGlobalStore();
  const [modalVisible, setModalVisible] = useState(false);

  const { data, loading, error, refetch } = useQuery(GET_ME, {
    fetchPolicy: "network-only",
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  useEffect(() => {
    if (data?.me) {
      setUser(data.me);
    }
  }, [data, setUser]);

  if (loading) {
    return (
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
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.errorContainer}>
        <ThemedText style={styles.errorText}>
          Failed to load user data.
        </ThemedText>
      </ThemedView>
    );
  }

  if (!user) {
    return (
      <ThemedView style={styles.errorContainer}>
        <ThemedText style={styles.errorText}>
          No user found. Please log in.
        </ThemedText>
        <ThemedButton onPress={logout}>Go to Login</ThemedButton>
      </ThemedView>
    );
  }

  return (
    <DefaultView style={styles.root}>
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1742855751015-5bda25456249?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fA%3D%3D",
        }}
        style={styles.header}
      >
        <ThemedView style={styles.avatarContainer}>
          <Avatar.Image
            source={{
              uri: "https://lh3.googleusercontent.com/a/ACg8ocJOf5-6C08bTot-KOdhN28fEJyxpjLHDWYK-ZbDSmBReK8e0Hti=s288-c-no",
            }}
            size={80}
          />
          <IconButton
            icon="pencil"
            size={16}
            onPress={() => alert("Edit Profile Coming Soon!")}
            style={styles.editIcon}
          />
        </ThemedView>
      </ImageBackground>

      <ThemedView style={styles.profileDetails}>
        <ThemedText style={styles.name}>{user.name}</ThemedText>
        <ThemedView style={styles.infoRow}>
          <IconButton icon="phone" size={20} />
          <ThemedText style={styles.infoText}>{user.phone || "N/A"}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.infoRow}>
          <IconButton icon="email" size={20} />
          <ThemedText style={styles.infoText}>{user.email}</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedButton
        loading={authLoading}
        disabled={authLoading}
        style={styles.logoutButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: "#fff", fontWeight: "700" }}>Logout</Text>
      </ThemedButton>

      <ConfirmModal
        isVisible={modalVisible}
        message="Are you sure you want to logout??"
        onConfirm={logout}
        onCancel={() => setModalVisible(false)}
      />
    </DefaultView>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 0,
    paddingBottom: 40,
  },
  header: {
    height: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarContainer: {
    backgroundColor: "transparent",
    position: "relative",
    alignItems: "center",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    height: 32,
    width: 32,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  profileDetails: {
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 40,
    marginHorizontal: 60,
    backgroundColor: "#FF3B30",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    marginBottom: 10,
  },
});

export default AcountScreen;
