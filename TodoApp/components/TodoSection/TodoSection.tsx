import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Platform,
} from 'react-native';
import styles from './TodoSection.styles';
import TodoItem from './TodoItem/TodoItem';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface Todo {
  id?: number;
  text: string;
  liked: boolean;
}

interface TodoSectionProps {
  selectedDate: Date;
  todos: Todo[];
  onTodosChange: (todos: Todo[]) => void;
  addTrigger: number;
  onToggleLike: (id: number) => void;
}

const TodoSection: React.FC<TodoSectionProps> = ({
  selectedDate,
  todos,
  onTodosChange,
  addTrigger,
  onToggleLike,
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

  // ✅ addTrigger 감지만 함 (경고 제거용)
  useLayoutEffect(() => {}, [addTrigger]);

  const handleChangeText = (text: string, index: number) => {
    const updated = [...localTodos];
    updated[index].text = text;
    setLocalTodos(updated);
    onTodosChange(updated);
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
            key={`todo-${item.id ?? index}`} // ✅ 문자열로 key 보정하여 경고 제거
            value={item}
            onChangeText={(text) => handleChangeText(text, index)}
            onToggleLike={() => {
              if (item.id !== undefined) {
                onToggleLike(item.id);
              }
            }}
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
