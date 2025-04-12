import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useFonts } from 'expo-font';

export default function InterestScreen() {
  const router = useRouter();
  const { nickname = "Charlotte", email } = useLocalSearchParams(); // Get data from sign-up
  const [fontsLoaded] = useFonts({
        'PixelifySans': require('@/assets/fonts/PixelifySans.ttf'), 
    });

  // sample interests data
  const interests = [
    { id: 1, name: "music", emoji: "🎵" },
    { id: 2, name: "dining", emoji: "🍽️" },
    { id: 3, name: "nature", emoji: "🌱" },
    { id: 4, name: "arts", emoji: "🎨" },
    { id: 5, name: "fashion", emoji: "👠" },
    { id: 6, name: "science", emoji: "🧪" },
    { id: 7, name: "film", emoji: "🎬" },
    { id: 8, name: "reading", emoji: "📖" },
    { id: 9, name: "theater", emoji: "🎭" },
    { id: 10, name: "sports", emoji: "🏈" },
    { id: 11, name: "video games", emoji: "👾" },
  ];

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest) // Remove interest
        : [...prev, interest] // Add interest
    );
  };

  const submitInterests = async () => {
    if (selectedInterests.length < 3) {
      alert("Please select at least 3 interests.");
      return;
    }

    const payload = { nickname, email, interests: selectedInterests };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/save-interests/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.status === 201) {
        router.push("/home"); // Redirect to home after interests are saved
      } else {
        alert("Failed to save interests.");
      }
    } catch (error) {
      alert("Error connecting to server.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{nickname},</Text>
      <Text style={styles.title}>Welcome to the</Text>
      <Text style={styles.title}>
              Comm<Text style={styles.highlight}>(you)</Text>nity!
      </Text>
      <Text style={styles.subtitle}>Pick 3 or more topics you are interested in</Text>

      {/* <FlatList
        data={interests}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.interestButton,
              selectedInterests.includes(item.name) && styles.selected,
            ]}
            onPress={() => toggleInterest(item.name)}
          >
            <Text style={styles.interestText}>{item.emoji} {item.name}</Text>
          </TouchableOpacity>
        )}
      /> */}
      <FlatList
        data={interests}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Keeps 2 items per row
        columnWrapperStyle={styles.row} // Aligns items to the left
        contentContainerStyle={styles.flatListContainer} // Ensures proper spacing
        renderItem={({ item }) => (
            <TouchableOpacity
            style={[
                styles.interestButton,
                selectedInterests.includes(item.name) && styles.selected,
            ]}
            onPress={() => toggleInterest(item.name)}
            >
            <Text style={styles.interestText}>{item.emoji} {item.name}</Text>
            </TouchableOpacity>
        )}
      />


      <TouchableOpacity
        style={[styles.doneButton, selectedInterests.length >= 3 ? styles.active : styles.disabled]}
        onPress={submitInterests}
        disabled={selectedInterests.length < 3}
      >
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: "center", paddingTop: 50, backgroundColor: "#fff",
  },
  title: { fontSize: 32, fontWeight: "bold", color: "#000" },
  subtitle: { fontSize: 14, color: "#868686", marginBottom: 50, marginTop: 15},
//   interestButton: {
//     flex: 1, backgroundColor: "#F8F8F8", paddingVertical: 10,
//     paddingHorizontal: 20, margin: 5, borderRadius: 20,
//     borderWidth: 1, borderColor: "#DDD", alignItems: "center",
//   },
  flatListContainer: {
        alignItems: "flex-start", // Aligns list items to the left
        width: "100%", // Ensures full width
        paddingHorizontal: 20, // Adds spacing on the sides
    },
  row: {
        flexDirection: "row",
        justifyContent: "flex-start", // Aligns buttons to the left
        gap: 15, // Adds spacing between buttons
    },
    interestButton: {
        flexShrink: 0,
        height: 40, // ✅ Increased height to avoid cropping
        width: 155,
        backgroundColor: "rgba(255, 255, 255, 1)",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
          width: 0,
          height: 2, // ✅ Moves shadow down slightly
        },
        shadowRadius: 8,
        shadowOpacity: 0.8, // ✅ Ensures shadow doesn't cause cropping
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 23,
        paddingVertical: 10, // ✅ Increased padding to prevent text cut-off
        borderRadius: 50,
        flex: 1,
        maxWidth: "45%",
        alignSelf: "flex-start",
        marginBottom: 15, 
        minWidth: 130, // ✅ Ensures buttons are at least this width
        flexGrow: 1, // ✅ Makes buttons share available space
      },
      
  highlight: {
    color: '#4E4AFD',
    fontFamily: "PixelifySans"
  },
  selected: { backgroundColor: "#7D6BFF", borderColor: "#7D6BFF" },
  interestText: { fontSize: 20, color: "#000", fontWeight: "600" },
  doneButton: { marginTop: 20, paddingVertical: 10, paddingHorizontal: 40, borderRadius: 20 },
  active: { backgroundColor: "#7D6BFF" },
  disabled: { backgroundColor: "#AAA" },
  doneText: { fontSize: 18, color: "#FFF", fontWeight: "bold" },
});
