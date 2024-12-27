import React, { useState, useEffect } from 'react';
import { View, Modal, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from "../AuthContext";
import { useSegments } from 'expo-router';

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

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(); 
  const [likedDates, setLikedDates] = useState<Record<string, { selected: boolean; selectedColor: string }>>({});
  const { account, setAccount } = useAuth();
  const today = new Date().toISOString().split('T')[0]; 
  const segments = useSegments();

  useEffect(() => {
    const fetchLikedEvents = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/get-likes/?username=${account}`);
        const data = await response.json();

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
        console.log(likedDates)
      } catch (error) {
        console.error('Error fetching liked events:', error);
      }
    };

    fetchLikedEvents();
  }, [segments]);

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
    <View style={{ flex: 1 }}>
      <Calendar
        markedDates={markedDates}
          renderArrow={(direction: 'left' | 'right') => (
            <Ionicons
              name={direction === 'left' ? 'chevron-back' : 'chevron-forward'}
              size={24}
              color="#C5B9FF"
            />
          )}
        onDayPress={(day: any) => { setSelectedDate(day.dateString); }} 
      />
    </View>
  );
}

export default MyCalendar;