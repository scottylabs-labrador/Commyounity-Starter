import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from "./AuthContext";
import { useNavigation } from 'expo-router';

const CustomizePage = () => {
  const [items, setItems] = useState<string[]>([
    'Art',
    'Performance',
    'Play',
    'Music',
    'Crafts',
    'Travel',
    'Athletic',
    'Outdoors',
    'Comedy',
    'Sports',
    'Food',
    'Urban',
    'Workshop',
  ]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { account, setAccount } = useAuth();
  const navigation = useNavigation();

  const toggleSelection = (item: string) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(item)
        ? prevSelected.filter((selected) => selected !== item) // Deselect
        : [...prevSelected, item] // Select
    );
  };

  const sendToBackend = async () => {
    try {
      const uppercaseList: string[] = selectedItems.map(str => str.toUpperCase());
      const response = await fetch( `http://127.0.0.1:8000/api/update-preference/?username=${account}&preference={${uppercaseList}}`);
      if (response.status == 200){
        navigation.navigate("profile");
      } else {
        window.alert("Failed to update interests");
      }
    } catch (error) {
      window.alert("Failed to update interests");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headline}>
        <Text style={styles.title}> Tell us about </Text>
        <Text style={styles.title}>
          <Text style={styles.highlight}>YOU</Text>!
        </Text>
      </View>

      {/* Scrollable Grid */}
      <ScrollView contentContainerStyle={styles.grid}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.square,
              selectedItems.includes(item) && styles.selectedSquare,
            ]}
            onPress={() => toggleSelection(item)}
          >
            <Text style={styles.squareText}>{item}</Text>
            {selectedItems.includes(item) && (
              <Ionicons
                name="checkmark-circle"
                size={28}
                color="#FFFFFF"
                style={styles.checkIcon}
              />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Button to Send Selected Items */}
      <TouchableOpacity style={styles.button} onPress={sendToBackend}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

    </View>
  );
};

export default CustomizePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  headline: {
    alignItems: 'center',
    padding: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  highlight: {
    color: '#4E4AFD',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 60,
  },
  square: {
    width: '47%', // Two items per row with some spacing
    aspectRatio: 1, // Makes the square
    backgroundColor: '#C5B9FF',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  selectedSquare: {
    backgroundColor: '#4E4AFD', // Selected square color
  },
  squareText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  checkIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  button: {
    backgroundColor: '#4E4AFD',
    borderRadius: 8,
    width: '30%',
    alignItems: 'center',
    paddingVertical: 10,
    margin: 30,
    marginLeft: 170
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
