import React, { useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Image,
} from 'react-native';
import styles from './TodoItem.styles';

// ✅ value 타입 변경: text와 liked를 포함하는 객체로 변경
interface TodoItemProps {
  value: { text: string; liked: boolean }; // ✅ 수정됨
  onChangeText: (text: string) => void;
  onToggleLike: () => void; // ✅ 하트 토글 핸들러 추가
  inputRef?: (ref: TextInput | null) => void;
  autoFocus?: boolean;
  onSave?: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  value,
  onChangeText,
  onToggleLike,
  inputRef,
  autoFocus,
  onSave,
}) => {
  const ref = useRef<TextInput>(null);

  useEffect(() => {
    if (autoFocus && ref.current) {
      ref.current.focus();
    }
  }, [autoFocus]);

  return (
    <View style={styles.todoBox}>
      <TextInput
        ref={(r) => {
          ref.current = r;
          if (inputRef) {
            inputRef(r);
          }
        }}
        value={value.text} // ✅ 수정됨
        onChangeText={onChangeText}
        placeholder="할 일을 입력하세요"
        placeholderTextColor="#999"
        style={styles.todoText}
        returnKeyType="done"
        onSubmitEditing={() => {
          Keyboard.dismiss();
          if (onSave) {
            onSave(); // ✅ 엔터 눌렀을 때 저장 호출
          }
        }}
        contextMenuHidden={true}
      />
      <TouchableOpacity onPress={onToggleLike}>
        <Image
          source={
            value.liked
              ? require('../../../assets/full-heart.png')
              : require('../../../assets/empty-heart.png')
          }
          style={styles.heartIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TodoItem;
