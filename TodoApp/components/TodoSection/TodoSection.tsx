import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Platform,
} from 'react-native'; // ✅ Keyboard 제거
import styles from './TodoSection.styles';
import TodoItem from './TodoItem/TodoItem';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { toggleLike, putTodosByDate } from '../../api/todoApi';

interface Todo {
  id: number;
  text: string;
  liked: boolean;
}

interface TodoSectionProps {
  selectedDate: Date;
  todos: Todo[];
  onTodosChange: (todos: Todo[]) => void;
  addTrigger: number;
}

const TodoSection: React.FC<TodoSectionProps> = ({
  selectedDate,
  todos,
  onTodosChange,
  addTrigger,
}) => {
  const [localTodos, setLocalTodos] = useState<Todo[]>(todos);
  const inputRefs = useRef<TextInput[]>([]);
  const scrollRef = useRef<KeyboardAwareScrollView>(null);

  const formattedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1)
    .toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;
  const weekday = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][selectedDate.getDay()];

  useEffect(() => {
    setLocalTodos(todos);
  }, [todos]);

  useLayoutEffect(() => {}, [addTrigger]);

  const handleChangeText = (text: string, index: number) => {
    const updated = [...localTodos];
    updated[index].text = text;
    setLocalTodos(updated);
    onTodosChange(updated);
  };

  const handleSave = async () => {
    try {
      await putTodosByDate(formattedDate, localTodos);
      console.log('✅ 수정 내용 서버에 저장됨');
    } catch (error) {
      console.error('❌ 서버 저장 실패', error);
    }
  };

  const handleToggleLike = async (index: number) => {
    const updated = [...localTodos];
    updated[index].liked = !updated[index].liked;
    setLocalTodos(updated);
    onTodosChange(updated);

    try {
      const todo = updated[index];
      if (todo.id !== undefined) {
        await toggleLike(todo.id); // ✅ 진짜 ID로 요청
        console.log('[PATCH 성공] 하트 토글됨:', todo.id);
      } else {
        console.warn('Todo에 id가 없습니다. PATCH 요청 생략됨.');
      }
    } catch (error) {
      console.error('하트 토글 실패:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.dragBar} />
      <View style={styles.header}>
        <Text style={styles.dateText}>{formattedDate} todo list</Text>
        <Text style={styles.dayText}>{weekday}</Text>
      </View>

      <KeyboardAwareScrollView
        ref={scrollRef}
        style={styles.todoScroll}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        extraScrollHeight={Platform.OS === 'ios' ? 30 : 40}
        enableAutomaticScroll={true}
      >
        {localTodos.map((item, index) => (
          <TodoItem
            key={index}
            value={item}
            onChangeText={(text) => handleChangeText(text, index)}
            onToggleLike={() => handleToggleLike(index)}
            inputRef={(ref) => {
              if (ref) {
                inputRefs.current[index] = ref;
              }
            }}

          />
        ))}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default TodoSection;
