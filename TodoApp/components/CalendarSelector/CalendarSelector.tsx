import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import styles from './CalendarSelector.styles';

interface CalendarSelectorProps {
  selectedYear: number;
  selectedMonth: number;
  onDateChange: (year: number, month: number) => void;
}

const CalendarSelector: React.FC<CalendarSelectorProps> = ({
  selectedYear,
  selectedMonth,
  onDateChange,
}) => {
  const [isYearPickerVisible, setYearPickerVisible] = useState(false);
  const [isMonthPickerVisible, setMonthPickerVisible] = useState(false);

  const yearList = [...Array(51)].map((_, i) => 2000 + i); // 2000~2050
  const yearListRef = useRef<FlatList>(null);

  const handleYearModalOpen = () => {
    setYearPickerVisible(true);
    setTimeout(() => {
      const index = yearList.findIndex((y) => y === selectedYear);
      if (index !== -1 && yearListRef.current) {
        yearListRef.current.scrollToIndex({ index, animated: false });
      }
    }, 10);
  };

  const handleYearSelect = (year: number) => {
    onDateChange(year, selectedMonth);
    setYearPickerVisible(false);
    setMonthPickerVisible(true);
  };

  const handleMonthSelect = (month: number) => {
    onDateChange(selectedYear, month);
    setMonthPickerVisible(false);
  };

  return (
    <>
      {/* 연/월 표시 */}
      <TouchableOpacity onPress={handleYearModalOpen}>
        <Text style={styles.title}>
          {selectedYear}.{' '}
          {selectedMonth < 10 ? `0${selectedMonth}` : selectedMonth} ▼
        </Text>
      </TouchableOpacity>

      {/* ✅ 연도 모달 */}
      <Modal visible={isYearPickerVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <FlatList
              ref={yearListRef}
              data={yearList}
              keyExtractor={(item) => item.toString()}
              getItemLayout={(_, index) => ({
                length: 48,
                offset: 48 * index,
                index,
              })}
              showsVerticalScrollIndicator={true}
              initialScrollIndex={yearList.findIndex((y) => y === selectedYear)}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleYearSelect(item)}>
                  <Text style={styles.modalItem}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* ✅ 월 모달 (3개씩 가운데 정렬) */}
      <Modal visible={isMonthPickerVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <FlatList
              data={[...Array(12)].map((_, i) => i + 1)}
              keyExtractor={(item) => item.toString()}
              numColumns={3}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ flex: 1, alignItems: 'center' }}
                  onPress={() => handleMonthSelect(item)}
                >
                  <Text style={styles.modalItem}>{item}월</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CalendarSelector;
