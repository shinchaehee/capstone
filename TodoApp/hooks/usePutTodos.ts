import { useCallback } from 'react';
import { putTodosByDate } from '../api/todoApi';
import { Todo } from '../types/todo';

const usePutTodos = () => {
  const saveTodos = useCallback(
    async (date: string, todos: Todo[]) => {
      try {
        const payload = todos.map(({ text, liked }) => ({ text, liked }));
        await putTodosByDate(date, payload);
        console.log('[✅ PUT 성공] 전체 todo 저장 완료');
      } catch (error) {
        console.error('[❌ PUT 실패]', error);
      }
    },
    []
  );

  return saveTodos;
};

export default usePutTodos;
