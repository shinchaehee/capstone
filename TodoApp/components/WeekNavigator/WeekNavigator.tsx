import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from './WeekNavigator.styles';

interface WeekNavigatorProps {
  selectedDate: Date;
  onDateSelect?: (date: Date) => void;
}

const WeekNavigator: React.FC<WeekNavigatorProps> = ({ selectedDate, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(selectedDate);

  // ✅ 외부에서 selectedDate가 변경되면 주간도 업데이트
  useEffect(() => {
    setCurrentDate(selectedDate);
  }, [selectedDate]);

  const getWeekDates = (baseDate: Date) => {
    const startOfWeek = new Date(baseDate);
    startOfWeek.setDate(baseDate.getDate() - baseDate.getDay()); // 일요일부터
    return Array.from({ length: 7 }).map((_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });
  };

  const moveWeek = (direction: 'prev' | 'next') => {
    const diff = direction === 'prev' ? -7 : 7;
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + diff);
    setCurrentDate(newDate);
    onDateSelect?.(newDate);
  };

  const weekDates = getWeekDates(currentDate);

  return (
    <View style={styles.dateNavigationWrapper}>
      {/* 왼쪽 화살표 */}
      <TouchableOpacity style={styles.arrowButton} onPress={() => moveWeek('prev')}>
        <Text style={styles.arrowText}>{'<'}</Text>
      </TouchableOpacity>

      {/* 날짜 스크롤 영역 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dateScrollContainer}
        style={styles.dateScrollArea}
      >
        {weekDates.map((date, index) => {
          const isSelected = date.toDateString() === selectedDate.toDateString();
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onDateSelect?.(date);
              }}
              style={[
                styles.dateBox,
                isSelected && styles.selectedDateBox,
              ]}
            >
              <Text style={[
                styles.dateText,
                isSelected && styles.selectedDateText,
              ]}>
                {date.getDate()}
              </Text>
              <Text style={[
                styles.dayText,
                isSelected && styles.selectedDayText,
              ]}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* 오른쪽 화살표 */}
      <TouchableOpacity style={styles.arrowButton} onPress={() => moveWeek('next')}>
        <Text style={styles.arrowText}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WeekNavigator;
