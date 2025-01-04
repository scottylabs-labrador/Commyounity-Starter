import React, { useState, useEffect } from 'react';
import { View, Modal, Text, ScrollView, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from "../AuthContext";
import { useSegments } from 'expo-router';
import { useNavigation } from 'expo-router';

const monthMap: Record<string, string> = {
  JAN: '01',
  FEB: '02',
  MAR: '03',
  APR: '04',
  MAY: '05',
  JUN: '06',
  JUL: '07',
  AUG: '08',
  SEP: '09',
  OCT: '10',
  NOV: '11',
  DEC: '12',
};

interface Event {
  id: string;
  name: string;
  link: string;
  img: string;
  description: string;
  month: string;
  day: number;
  date: string;
  time: string;
  tags: string;
  liked: boolean;
}

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(); 
  const [likedDates, setLikedDates] = useState<Record<string, { selected: boolean; selectedColor: string }>>({});
  const [events, setEvents] = useState<Event[]>([]);
  const [currentEvents, setCurrentEvents] = useState<Event[]>([]);
  const { account } = useAuth();
  const navigation = useNavigation();
  const today = new Date().toISOString().split('T')[0]; 
  const segments = useSegments();

  useEffect(() => {
    const fetchLikedEvents = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/get-likes/?username=${account}`);
        const data = await response.json();
        const transformedEvents: Event[] = data.map((item: any): Event => ({
          id: item.id.toString(),
          name: item.title,
          img: item.img,
          description: item.description,
          link: item.link,
          month: item.month,
          day: item.day,
          date: `${item.month} ${item.day} ${item.year || ''}`, // Format date
          time: item.time,
          tags: item.category.toLowerCase(),
          liked: true,
        }));
        setEvents(transformedEvents);

        const currentYear = new Date().getFullYear();
        const formattedDates = data.reduce((acc: any, event: { month: string; day: number }) => {
          const month = monthMap[event.month.toUpperCase()];
          if (month) {
            const date = `${currentYear}-${month}-${String(event.day).padStart(2, '0')}`;
            acc[date] = { selected: true, selectedColor: '#D9D9D9', selectedTextColor:"black" };
          }
          return acc;
        }, {});
        setLikedDates(formattedDates);
      } catch (error) {
        console.error('Error fetching liked events:', error);
      }
    };

    fetchLikedEvents();
  }, [segments]);

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
  
    const filteredEvents = events.filter(event => {
      const eventDate = new Date(
        new Date(day.dateString).getFullYear(),
        parseInt(monthMap[event.month.toUpperCase()], 10) - 1,
        event.day + 1
      );
      return eventDate.toISOString().split('T')[0] === day.dateString;
    });
  
    setCurrentEvents(filteredEvents);
  };

  const handleEventCard = (event: Event) => {
    navigation.navigate('detail', { event });
  };

  const markedDates = {
    ...likedDates, // Merge liked dates first
    [selectedDate || '']: { // Add selected date
      selected: true,
      marked: true,
      selectedColor: '#C5B9FF',
      selectedTextColor: "black"
    },
    [today]: { // Add today's date
      selected: true,
      selectedColor: 'white',
      selectedTextColor: '#C5B9FF',
    }
  };
  
  return (
    <View style={{ flex: 1 , backgroundColor: "#fff",}}>
      <Calendar
        markedDates={markedDates}
          renderArrow={(direction: 'left' | 'right') => (
            <Ionicons
              name={direction === 'left' ? 'chevron-back' : 'chevron-forward'}
              size={24}
              color="#C5B9FF"
            />
          )}
        onDayPress={handleDayPress} 
      />
      <ScrollView style={styles.eventList}>
        {currentEvents.map(item => (
          <TouchableOpacity key={item.id} onPress={() => handleEventCard(item)}>
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
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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


export default MyCalendar;