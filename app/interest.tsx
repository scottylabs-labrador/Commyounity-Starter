import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useFonts } from 'expo-font';

export default function InterestScreen() {
  const router = useRouter();
  const { nickname = "Charlotte" } = useLocalSearchParams();
  const [fontsLoaded] = useFonts({
    'PixelifySans': require('@/assets/fonts/PixelifySans.ttf'), 
    'Inter': require('@/assets/fonts/Inter.ttf'), 
  });

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
  ];

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  const handleDone = () => {
    if (selectedInterests.length >= 3) {
      router.push("/events");
    } else {
      alert("Please select at least 3 interests.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the</Text>
      <Text style={styles.title}>
        Comm<Text style={styles.highlight}>(you)</Text>nity!
      </Text>
      <Text style={styles.subtitle}>Pick 3 or more topics you are interested in</Text>

      <FlatList
        data={interests}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.flatListContainer}
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
        style={[
          styles.doneButton,
          selectedInterests.length >= 3 ? styles.active : styles.disabled,
        ]}
        onPress={handleDone}
      >
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 70,
    backgroundColor: "#fff",
    fontFamily: "Inter",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 14,
    color: "#A3A3A3",
    marginBottom: 50,
    marginTop: 15,
  },
  flatListContainer: {
    alignItems: "flex-start",
    width: "100%",
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 15,
  },
  interestButton: {
    flexShrink: 0,
    height: 40,
    width: 155,
    backgroundColor: "#FFF",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 23,
    paddingVertical: 10,
    borderRadius: 50,
    flex: 1,
    maxWidth: "45%",
    alignSelf: "flex-start",
    marginBottom: 15,
    minWidth: 130,
    flexGrow: 1,
  },
  highlight: {
    color: "#4E4AFD",
    fontFamily: "Inter",
    fontWeight: "800",
  },
  selected: {
    backgroundColor: "#7D6BFF",
    borderColor: "#7D6BFF",
  },
  interestText: {
    fontSize: 20,
    color: "#000",
    fontWeight: "600",
  },
  doneButton: {
    position: "absolute",
    bottom: 40,
    right: 30,
    backgroundColor: "#4D4AF4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    fontFamily: "Inter",
  },
  active: {
    backgroundColor: "#7D6BFF",
  },
  disabled: {
    backgroundColor: "#AAA",
  },
  doneText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
});
