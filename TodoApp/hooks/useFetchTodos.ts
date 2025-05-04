import { useEffect } from 'react';
import { fetchTodosByDate } from '../api/todoApi';
import { Todo } from '../types/todo';

type SetAllTodos = React.Dispatch<
  React.SetStateAction<{ [date: string]: Todo[] }>
>;

const useFetchTodos = (formattedDate: string, setAllTodos: SetAllTodos) => {
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await fetchTodosByDate(formattedDate);

        const normalized = data.map(todo => ({
          ...todo,
          liked: !!todo.liked, // ✅ undefined 방지
        }));

        setAllTodos(prev => ({
          ...prev,
          [formattedDate]: normalized,
        }));
      } catch (error) {
        console.error('[투두 불러오기 실패]', error);
      }
    };

    fetchTodos();
  }, [formattedDate, setAllTodos]);
};

export default useFetchTodos;
