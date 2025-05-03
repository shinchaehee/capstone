import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import styles from './HomeScreen.styles';
import CalendarSelector from '../CalendarSelector/CalendarSelector';
import WeekNavigator from '../WeekNavigator/WeekNavigator';
import TodoSection from '../TodoSection/TodoSection';
import AddButton from '../AddButton/AddButton';

import {postTodo, fetchTodosByDate, putTodosByDate} from '../../api/todoApi';

interface Todo {
  id: number;
  text: string;
  liked: boolean;
}

const HomeScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [addTrigger, setAddTrigger] = useState(0);
  const [allTodos, setAllTodos] = useState<{[date: string]: Todo[]}>({});

  const formattedDate = `${selectedDate.getFullYear()}-${(
    selectedDate.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;

  const selectedYear = selectedDate.getFullYear();
  const selectedMonth = selectedDate.getMonth() + 1;

  const rawTodos = allTodos[formattedDate] || [];
  const todosForSelectedDate: Todo[] =
    Array.isArray(rawTodos) &&
    typeof rawTodos[0] === 'object' &&
    rawTodos[0] !== null &&
    'text' in rawTodos[0]
      ? (rawTodos as Todo[])
      : (rawTodos as string[]).map(text => ({text, liked: false})); // ✅ 타입 단언 추가

  const handleTodosChange = (updatedTodos: Todo[]) => {
    setAllTodos(prev => ({...prev, [formattedDate]: updatedTodos}));
  };

  // ✅ 여기에 GET 요청용 useEffect 넣기!
  useEffect(() => {
    const loadTodos = async () => {
      const todos = await fetchTodosByDate(formattedDate);
      setAllTodos(prev => ({...prev, [formattedDate]: todos}));
    };

    loadTodos();
  }, [selectedDate, formattedDate]); // ← 날짜가 바뀔 때마다 호출됨

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
        onDateSelect={date => setSelectedDate(date)}
      />

      <TodoSection
        selectedDate={selectedDate}
        todos={todosForSelectedDate}
        onTodosChange={handleTodosChange}
        addTrigger={addTrigger}
      />

      <AddButton
        onAdd={async () => {
          const newTodo = {
            text: '',
            date: formattedDate,
          };
          await postTodo(newTodo); // 1. 서버에 등록
          const todos = await fetchTodosByDate(formattedDate); // 2. 최신 목록 다시 불러오기
          setAllTodos(prev => ({...prev, [formattedDate]: todos})); // 3. ID 포함된 목록으로 갱신
          setAddTrigger(prev => prev + 1); // 4. UI에 반영
        }}
        onRemove={async () => {
          const currentTodos = allTodos[formattedDate] || [];

          const normalizedTodos: Todo[] =
            typeof currentTodos[0] === 'string'
              ? (currentTodos as string[]).map(text => ({text, liked: false}))
              : (currentTodos as Todo[]);

          if (normalizedTodos.length === 0) return;

          const updated = [...normalizedTodos.slice(0, -1)];

          setAllTodos(prev => ({...prev, [formattedDate]: updated}));

          try {
            await putTodosByDate(formattedDate, updated); // ✅ 삭제 후 서버 반영
            console.log('🗑️ 삭제 후 서버에 저장 완료');
          } catch (error) {
            console.error('❌ 삭제 서버 저장 실패', error);
          }
        }}
      />
    </View>
  );
};

export default HomeScreen;
