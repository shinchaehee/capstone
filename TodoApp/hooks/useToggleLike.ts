import { useCallback } from 'react';
import { toggleLike } from '../api/todoApi';
import { Todo } from '../types/todo';

const useToggleLike = (
  date: string,
  setAllTodos: React.Dispatch<React.SetStateAction<{ [date: string]: Todo[] }>>
) => {
  const toggleTodoLike = useCallback(
    async (id: number) => {
      try {
        await toggleLike(id); // ✅ PATCH 요청

        setAllTodos(prev => {
          const updated = prev[date]?.map(todo =>
            todo.id === id ? { ...todo, liked: !todo.liked } : todo
          );
          return { ...prev, [date]: updated || [] };
        });
      } catch (error) {
        console.error('[하트 토글 실패]', error);
      }
    },
    [date, setAllTodos]
  );

  return toggleTodoLike;
};

export default useToggleLike;
