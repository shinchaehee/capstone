import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import styles from './HomeScreen.styles';
import CalendarSelector from '../CalendarSelector/CalendarSelector';
import WeekNavigator from '../WeekNavigator/WeekNavigator';
import TodoSection from '../TodoSection/TodoSection';
import AddButton from '../AddButton/AddButton';

import useFetchTodos from '../../hooks/useFetchTodos';
import usePostTodo from '../../hooks/usePostTodo';
import usePutTodos from '../../hooks/usePutTodos';
import usePrevious from '../../hooks/usePrevious';
import { Todo } from '../../types/todo';

const HomeScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [addTrigger, setAddTrigger] = useState(0);
  const [allTodos, setAllTodos] = useState<{ [date: string]: Todo[] }>({});

  const formattedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1)
    .toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;

  const selectedYear = selectedDate.getFullYear();
  const selectedMonth = selectedDate.getMonth() + 1;

  const prevDate = usePrevious(selectedDate);
  const saveTodosToServer = usePutTodos();

  // ✅ 날짜 변경 시 이전 날짜의 todo 저장
  useEffect(() => {
    if (!prevDate) {
      return;
    }
    const prevFormattedDate = `${prevDate.getFullYear()}-${(prevDate.getMonth() + 1)
      .toString().padStart(2, '0')}-${prevDate.getDate().toString().padStart(2, '0')}`;

    const prevTodos = allTodos[prevFormattedDate];
    if (prevTodos) {
      saveTodosToServer(prevFormattedDate, prevTodos);
    }
  }, [selectedDate, allTodos, prevDate, saveTodosToServer]); // ✅ missing dependencies 추가

  useFetchTodos(formattedDate, setAllTodos);
  const addTodoToServer = usePostTodo(formattedDate);

  const todosForSelectedDate = allTodos[formattedDate] || [];

  const handleTodosChange = (updatedTodos: Todo[]) => {
    setAllTodos(prev => ({ ...prev, [formattedDate]: updatedTodos }));
  };

  const toggleTodoLike = (id: number, liked: boolean) => {
    const updatedTodos = todosForSelectedDate.map(todo =>
      todo.id === id ? { ...todo, liked } : todo
    );
    setAllTodos(prev => ({ ...prev, [formattedDate]: updatedTodos }));
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
        onToggleLike={(id: number) => {
          const found = todosForSelectedDate.find(todo => todo.id === id);
          if (!found) {
            return;
          }
          toggleTodoLike(id, !found.liked);
        }}
      />

      <AddButton
        onAdd={() => {
          addTodoToServer('', (createdTodo) => {
            if (!createdTodo.id) {
              return;
            }
            setAllTodos(prev => ({
              ...prev,
              [formattedDate]: [...(prev[formattedDate] || []), createdTodo],
            }));
            setAddTrigger(prev => prev + 1);
          });
        }}
        onRemove={() => {
          const current = allTodos[formattedDate] || [];
          const updated = current.slice(0, -1);
          setAllTodos(prev => ({ ...prev, [formattedDate]: updated }));
        }}
      />
    </View>
  );
};

export default HomeScreen;
