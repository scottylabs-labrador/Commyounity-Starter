import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../AuthContext';
import { Ionicons } from '@expo/vector-icons';

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  tags: string;
  liked: boolean;
}

interface EventListProps {
  keyword: string;
}

const EventList = ({ keyword }: EventListProps) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); 
  const [ended, setEnded] = useState(false); 
  const { account } = useAuth(); 
  const flatListRef = useRef<FlatList>(null);

  const fetchEvents = async (pageNum: number) => {
    if (loading) return;
    setLoading(true);
    try {
      const baseUrl = `http://127.0.0.1:8000/api/eventlist/search`;
      const queryParams = `?page=${pageNum}&page_size=10`;
      const usernameParam = account ? `&username=${account}` : "";
      const keywordParam =  keyword ? `&q=${keyword}` : "";
      const url = `${baseUrl}${queryParams}${usernameParam}${keywordParam}`;

      const response = await fetch(url);
      const data = await response.json();
      const transformedEvents = data.map((item: any) => ({
        id: item.id.toString(),
        name: item.title,
        date: `${item.month} ${item.day}, ${item.year || ''}`, // Format date using month and day
        time: item.time,
        tags: item.category.toLowerCase(),
        liked: false,
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
    setEvents([]);
    setPage(0);
    setEnded(false);
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 }); // Scroll to top when keyword changes
    }
  }, [keyword]);

  useEffect(() => {
    setEvents([]);
    setPage(0);
    setEnded(false);
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 }); // Scroll to top when keyword changes
    }
  }, [account]);

  useEffect(() => {
    if(page === 0) setPage(1);
    else fetchEvents(page);
  }, [page]);

  const handleEndReached = () => {
    if (!loading && !ended) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const toggleLike = async (eventId: string) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId ? { ...event, liked: !event.liked } : event
      )
    );
    
    const eventToUpdate = events.find((event) => event.id === eventId);
    if (!eventToUpdate) return;
  
    const action = eventToUpdate.liked ? "remove" : "add"; // Determine the action based on the current state
  
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/add-likes/?username=${account}&event=${eventId}&action=${action}`
      );
  
      if (!response.ok) {
        console.error("Failed to update like status on the server");
        // Revert the change in case of an error
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === eventId ? { ...event, liked: !event.liked } : event
          )
        );
      }
    } catch (error) {
      console.error("Error while updating like status:", error);
      // Revert the change in case of an error
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventId ? { ...event, liked: !event.liked } : event
        )
      );
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
      <TouchableOpacity onPress={() => toggleLike(item.id)}>
        <Ionicons
          name={item.liked ? 'heart' : 'heart-outline'}
          size={24}
          color={item.liked ? 'red' : 'gray'}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      ref={flatListRef}
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

  const [keyword, setKeyword] = useState('');
  const [query, setQuery] = useState('');

  const handleInputChange = (input: string) => {
    setKeyword(input);
  };

  const handleEnterKey = () => {
    setQuery(keyword);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* logo and search bar */}
      <View style={styles.header}>
      <TextInput
          style={styles.searchBar}
          placeholder="Search"
          placeholderTextColor="#999"
          onChangeText={handleInputChange}
          onSubmitEditing={handleEnterKey}
          value={keyword}
        />
      </View>

      {/* list of events */}
      <EventList keyword={query}/>

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
