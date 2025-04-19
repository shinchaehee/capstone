import React, { useState } from 'react';
import { Text, View } from 'react-native';
import styles from './HomeScreen.styles';
import CalendarSelector from '../CalendarSelector/CalendarSelector';
import WeekNavigator from '../WeekNavigator/WeekNavigator';
import TodoSection from '../TodoSection/TodoSection';
import AddButton from '../AddButton/AddButton';

interface Todo {
  text: string;
  liked: boolean;
}

const HomeScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [addTrigger, setAddTrigger] = useState(0);
  const [allTodos, setAllTodos] = useState<{ [date: string]: Todo[] | string[] }>({});

  const formattedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1)
    .toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;

  const selectedYear = selectedDate.getFullYear();
  const selectedMonth = selectedDate.getMonth() + 1;

  const rawTodos = allTodos[formattedDate] || [];
  const todosForSelectedDate: Todo[] =
    Array.isArray(rawTodos) && typeof rawTodos[0] === 'object' && rawTodos[0] !== null && 'text' in rawTodos[0]
      ? (rawTodos as Todo[])
      : (rawTodos as string[]).map((text) => ({ text, liked: false })); // ✅ 타입 단언 추가

  const handleTodosChange = (updatedTodos: Todo[]) => {
    setAllTodos((prev) => ({ ...prev, [formattedDate]: updatedTodos }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>todo list Calendar</Text>
      <View style={styles.header}>
        <CalendarSelector
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          onDateChange={(year, month) => {
            const newDate = new Date(year, month - 1, 1);
            setSelectedDate(newDate);
          }}
        />
        <View style={styles.separator} />
      </View>

      <WeekNavigator
        selectedDate={selectedDate}
        onDateSelect={(date) => setSelectedDate(date)}
      />

      <TodoSection
        selectedDate={selectedDate}
        todos={todosForSelectedDate}
        onTodosChange={handleTodosChange}
        addTrigger={addTrigger}
      />

      <AddButton
        onAdd={() => setAddTrigger((prev) => prev + 1)}
        onRemove={() => {
          const currentTodos = allTodos[formattedDate] || [];

          const normalizedTodos: Todo[] =
            typeof currentTodos[0] === 'string'
              ? (currentTodos as string[]).map((text) => ({ text, liked: false }))
              : (currentTodos as Todo[]);

          if (normalizedTodos.length === 0) {
            return;
          }

          const updated = [...normalizedTodos.slice(0, -1)];
          setAllTodos((prev) => ({ ...prev, [formattedDate]: updated }));
        }}
      />
    </View>
  );
};

export default HomeScreen;
