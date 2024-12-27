import React, { useState } from 'react';
import { View, Modal, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(); 
  const today = new Date().toISOString().split('T')[0]; 
  
  return (
    <View style={{ flex: 1 }}>
      <Calendar
        
        markedDates={{
            [selectedDate || '']: { 
              selected: true, 
              marked: true, 
              selectedColor: '#C5B9FF' 
            },
            [today]: { 
              selected: true, 
              selectedColor: "white",
              selectedTextColor: '#C5B9FF',
            },
          }}
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