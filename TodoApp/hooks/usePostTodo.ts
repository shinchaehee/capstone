// hooks/usePostTodo.ts
import { postTodo } from '../api/todoApi';
import { useCallback } from 'react';
import { Todo } from '../types/todo';

const usePostTodo = (selectedDate: string) => {
  const addTodo = useCallback(
    async (text: string, onSuccess?: (newTodo: Todo) => void, onError?: () => void) => {
      try {
        const newTodo: Todo = {
          text,
          liked: false,
          date: selectedDate,
        };

        const created = await postTodo(newTodo);
        console.log('[POST 응답]', created);
        onSuccess?.(created);
      } catch (error) {
        console.error('[POST 실패]', error);
        onError?.();
      }
    },
    [selectedDate]
  );

  return addTodo;
};

export default usePostTodo;
