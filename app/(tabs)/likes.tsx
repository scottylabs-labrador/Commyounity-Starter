import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../AuthContext';
import {useSegments} from 'expo-router'

// const events = [
//   { id: '1', name: 'Charli xcx Concert', date: 'Oct 28, 2024', time: '7:00 PM', tags: 'concert • music' },
//   { id: '4', name: 'Thanksgiving Parade', date: 'Nov 28, 2024', time: '12:00 PM', tags: 'seasonal • parade' },
// ];

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  tags: string;
}

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); 
  const { username } = useAuth(); 
  const [ended, setEnded] = useState(false); 
  const flatListRef = useRef<FlatList>(null);
  const segments = useSegments()

  const fetchEvents = async (pageNum: number) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/get-likes/?username=${username}&page=${pageNum}`); // Replace with your API endpoint
      const data = await response.json();
      const transformedEvents = data.map((item: any) => ({
        id: item.id.toString(),
        name: item.title,
        date: `${item.month} ${item.day}, ${item.year || ''}`, // Format date using month and day
        time: item.time,
        tags: item.category.toLowerCase(),
      }));
      setEvents((prevEvents) => [...prevEvents, ...transformedEvents]); // Update state with fetched events
    } catch (error) {
      console.error('Error fetching events:', error);
      setEnded(true);
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  };

  useEffect(() => {
    if(page === 0) setPage(1);
    else fetchEvents(page);
  }, [page]);

  useEffect(() => {
    setEvents([]);
    setPage(0);
    setEnded(false);
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
   }, [segments])

  const handleEndReached = () => {
    if (!loading && !ended) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  
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
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.3} 
      ListFooterComponent={loading ? <Text>Loading...</Text> : null} 
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
