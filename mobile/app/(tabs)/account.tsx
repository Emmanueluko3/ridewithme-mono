import DefaultView from "@/components/views/DefaultView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/views/ThemedView";
import { ThemedButton } from "@/components/common/ThemedButton";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { Avatar, IconButton } from "react-native-paper";

const AcountScreen = () => {
  const { authLoading, logout } = useAuth();

  const user = {
    name: "John Doe",
    phone: "+123 456 7890",
    email: "johndoe@email.com",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocJOf5-6C08bTot-KOdhN28fEJyxpjLHDWYK-ZbDSmBReK8e0Hti=s288-c-no",
  };

  return (
    <DefaultView>
      {/* Top Header Background */}
      <ImageBackground
        source={{ uri: "https://source.unsplash.com/random/800x600?city" }}
        style={styles.header}
      >
        <ThemedView style={styles.avatarContainer}>
          <Avatar.Image source={{ uri: user.profileImage }} size={80} />
          <IconButton
            icon="pencil"
            size={16}
            onPress={() => console.log("Edit Profile")}
            style={styles.editIcon}
          />
        </ThemedView>
      </ImageBackground>

      {/* Profile Info */}
      <ThemedView style={styles.profileDetails}>
        <ThemedText style={styles.name}>{user.name}</ThemedText>
        <ThemedView style={styles.infoRow}>
          <IconButton icon="phone" size={20} />
          <ThemedText style={styles.infoText}>{user.phone}</ThemedText>
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
        onPress={logout}
      >
        Logout
      </ThemedButton>
    </DefaultView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarContainer: {
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
});

export default AcountScreen;
