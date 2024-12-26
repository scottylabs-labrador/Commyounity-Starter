import React from "react";
import SmileyFace from "@/components/SmileyFace";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

const ProfileScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.profilePicture}>
          <SmileyFace/>
        </View>
        <Text style={styles.username}>@Username</Text>
        <Text style={styles.bio}>
          Biography: Hi my name is and I am currently a student at plz hmu if yall are interested
          in going to together! insta: @
        </Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.shareButton]}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.editButton]}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* Past Events */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>My past events</Text>
        <ScrollView horizontal={true}>
          <View style={styles.grid}>
            <View style={styles.gridItem} />
            <View style={styles.gridItem} />
            <View style={styles.gridItem} />
            <View style={styles.gridItem} />
            <View style={styles.gridItem} />
          </View>
        </ScrollView>
      </View>

      {/* Interests */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>My interests</Text>
        <ScrollView horizontal={true}>
          <View style={styles.grid}>
            <View style={styles.gridItem} />
            <View style={styles.gridItem} />
            <View style={styles.gridItem} />
            <View style={styles.gridItem} />
            <View style={styles.gridItem} />
          </View>
        </ScrollView>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#E9FFCA",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bio: {
    fontSize: 14,
    color: "#555",
    textAlign: "center"
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 7,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  shareButton: {
    backgroundColor: "#4A61DD",
  },
  editButton: {
    backgroundColor: "#4A61DD",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  sectionContainer: {
   
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  grid: {
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: "space-between",
    marginBottom: 10,
  },
  gridItem: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#E0D7F9",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  gridText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
  },
});

export default ProfileScreen;
