import React from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { SafeAreaView } from 'react-native-safe-area-context';

const events = [
  { id: '1', name: 'Charli xcx Concert', date: 'Oct 28, 2024', time: '7:00 PM', tags: 'concert • music' },
  { id: '4', name: 'Thanksgiving Parade', date: 'Nov 28, 2024', time: '12:00 PM', tags: 'seasonal • parade' },
];

const EventList = () => {
  const renderItem = ({ item }: any) => (
    <View style={styles.eventCard}>
      <View style={styles.eventTextContainer}>
        <Text style={styles.eventName}>{item.name}</Text>
        <Text style={styles.eventDate}>{item.date}</Text>
        <Text style={styles.eventTime}>{item.time}</Text>
        <Text style={styles.eventTags}>{item.tags}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={events}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.eventList}
    />
  );
};

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* logo and search bar */}
      <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          placeholderTextColor="#999"
        />
      </View>

      {/* list of events */}
      <EventList />

      {/* bottom bar */}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#EFEFEF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  eventList: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  eventTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventDate: {
    fontSize: 14,
    color: '#555555',
    marginTop: 5,
  },
  eventTime: {
    fontSize: 14,
    color: '#555555',
    marginTop: 5,
  },
  eventTags: {
    fontSize: 12,
    color: '#999999',
    marginTop: 5,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopColor: '#CCCCCC',
    borderTopWidth: 1,
  },
});
