import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../AuthContext';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSegments } from 'expo-router';
import SmileyFaceSmall from '@/components/SmileyFaceSmall';

interface Event {
  id: string;
  name: string;
  link: string;
  img: string;
  description: string;
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
  const naviation = useNavigation();
  const segments = useSegments()

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
      const transformedEvents: Event[] = data.map((item: any): Event => ({
        id: item.id.toString(),
        name: item.title,
        img: item.img,
        description: item.description,
        link: item.link,
        date: `${item.month} ${item.day} ${item.year || ''}`, // Format date
        time: item.time,
        tags: item.category.toLowerCase(),
        liked: false,
      }));

      if(account){
        const response_ = await fetch(`http://127.0.0.1:8000/api/get-likes-id/?username=${account}`);
        const data_ = await response_.json();
        const likes = data_.likes;
  
        const updatedEvents = transformedEvents.map((event) => {
          return {
            ...event,  // Keep all existing properties
            liked: likes.includes(parseInt(event.id)) // Set liked to true if event id is in the likes array
          };
        });

        setEvents((prevEvents) => [...prevEvents, ...updatedEvents]);
      } else {
        setEvents((prevEvents) => [...prevEvents, ...transformedEvents]);
      }
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
      setEvents([]);
      setPage(0);
      setEnded(false);
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
      }
     }, [segments])

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

  const handleEventCard = (event: Event) => {
    naviation.navigate('detail', { event });
  };
  
  const renderItem = ({ item }: any) => (
    <TouchableOpacity onPress={() => handleEventCard(item)}>
      <View style={styles.eventCard}>
        <View style={styles.eventImage}>
          <Image source={{ uri: item.img }} style={styles.image} />
        </View>
        <View style={styles.eventTextContainer}>
          <Text style={styles.eventName}>{item.name}</Text>
          <Text style={styles.eventDate}>{item.date}</Text>
          <Text style={styles.eventTime}>{item.time}</Text>
          <Text style={styles.eventTags}>{item.tags}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleLike(item.id)}>
          <Ionicons
            name={item.liked ? 'heart' : 'heart-outline'}
            size={28}
            color={item.liked ? '#4E4AFD' : 'white'}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
      <View style={styles.icon}>
        <SmileyFaceSmall/>
        <Text style={styles.title}>
          Comm-<Text style={styles.highlight}>YOU</Text>-nity
        </Text>
      </View>
      <View style={styles.header}>
        <TextInput
            style={styles.searchBar}
            placeholder="Search"
            placeholderTextColor="#999"
            onChangeText={handleInputChange}
            onSubmitEditing={handleEnterKey}
            value={keyword}
          ></TextInput>
      </View>

      {/* list of events */}
      <EventList keyword={query}/>

    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  icon: {
    margin: 10,
    flexDirection: 'row'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    marginLeft: 40
  },
  highlight: {
    color: '#4E4AFD',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  searchBar: {
    width: '75%',
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
    backgroundColor: '#EDE9FF',
    padding: 8,
    borderRadius: 10,
    marginBottom: 15,
  },
  eventTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  eventName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  eventDate: {
    fontSize: 15,
    color: '#000000',
    marginTop: 3,
  },
  eventTime: {
    fontSize: 14,
    color: '#555555',
    marginTop: 3,
  },
  eventTags: {
    fontSize: 12,
    color: '#999999',
    marginTop: 3,
  },
  eventImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#C5B9FF",
    alignSelf: 'center',
  },
  image: {
    margin: 5,
    width: 90,
    height: 90,
    borderRadius: 9,
    resizeMode: "cover",
  },
});
