// components/TodoItem/TodoItem.styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  todoBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todoText: {
    fontSize: 16,
    color: '#333',
    flex: 1, // 텍스트박스가 왼쪽 공간을 채우도록
    marginRight: 12,
  },
  heartIcon: {
    width: 20,
    height: 20,
  },
});

export default styles;
