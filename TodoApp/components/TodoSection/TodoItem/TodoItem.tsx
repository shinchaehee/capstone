import React, { useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Image,
} from 'react-native';
import styles from './TodoItem.styles';

// ✅ 여기에서 key 속성을 무시하라고 명시
interface TodoItemProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'key'> {
  value: { text: string; liked: boolean };
  onChangeText: (text: string) => void;
  onToggleLike: () => void;
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
        value={value.text}
        onChangeText={onChangeText}
        placeholder="할 일을 입력하세요"
        placeholderTextColor="#999"
        style={styles.todoText}
        returnKeyType="done"
        onSubmitEditing={() => {
          Keyboard.dismiss();
          if (onSave) {
            onSave();
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
