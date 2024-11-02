import React, { useState } from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(); 
  
  return (
    <View style={{ flex: 1 }}>
      <Calendar
        markedDates={{
            [selectedDate || '']: { selected: true, marked: true, selectedColor: 'gray' }
          }}
        onDayPress={(day: any) => { setSelectedDate(day.dateString); }} 
      />
    </View>
  );
}

export default MyCalendar;