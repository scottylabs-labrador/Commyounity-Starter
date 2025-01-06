import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const FilterButton = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // Sample choices
  const timeChoices = ['Today', 'Tomorrow', 'This Week', 'Next Week', 'This Month'];
  const categoryChoices = ['Music', 'Play', 'Food', 'Hockey'];

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleFilterVisibility} style={styles.button}>
        <Text style={styles.buttonText}>Filter</Text>
      </TouchableOpacity>

      {isFilterVisible && (
        <View style={styles.filterOptions}>
          <View style={styles.filterGroup}>
            <Text style={styles.filterTitle}>Time</Text>
            <FlatList
              data={timeChoices}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.choice}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
          </View>

          <View style={styles.filterGroup}>
            <Text style={styles.filterTitle}>Categories</Text>
            <FlatList
              data={categoryChoices}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.choice}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  filterOptions: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  filterGroup: {
    marginBottom: 10,
  },
  filterTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  choice: {
    padding: 5,
  },
});

export default FilterButton;
