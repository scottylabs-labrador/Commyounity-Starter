import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../AuthContext';

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  tags: string;
}

interface EventListProps {
  keyword: string;
}

const EventList = ({ keyword }: EventListProps) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); 
  const { username } = useAuth(); 
  const flatListRef = useRef<FlatList>(null);

  const fetchEvents = async (pageNum: number) => {
    if (loading) return;
    setLoading(true);
    try {
      const baseUrl = `http://127.0.0.1:8000/api/eventlist/search`;
      const queryParams = `?page=${pageNum}&page_size=10`;
      const usernameParam = username ? `&username=${username}` : "";
      const keywordParam =  keyword ? `&q=${keyword}` : "";
      console.log("keyword is ");
      console.log(keyword);
      const url = `${baseUrl}${queryParams}${usernameParam}${keywordParam}`;

      const response = await fetch(url); // Replace with your API endpoint
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
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  };

  useEffect(() => {
    setEvents([]);
    setPage(1);
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 }); // Scroll to top when keyword changes
    }
  }, [keyword]);

  useEffect(() => {
    fetchEvents(page);
  }, [page]);

  const handleEndReached = () => {
    if (!loading) {
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
