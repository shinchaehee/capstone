import axiosInstance from './axiosInstance';
import { Todo } from '../types/todo';

export const postTodo = async (todo: Todo) => {
  try {
    console.log('[POST 요청 보내는 중]', todo);
    const response = await axiosInstance.post('/todos', todo);
    console.log('[POST 성공]', response.data);
    return response.data;
  } catch (error) {
    console.error('할 일 등록 실패:', error);
    throw error;
  }
};

export const fetchTodosByDate = async (date: string): Promise<Todo[]> => {
  try {
    console.log('[GET 요청 보내는 중]', date);
    const response = await axiosInstance.get('/todos', {
      params: { date },
    });
    console.log('[GET 성공]', response.data);
    return response.data;
  } catch (error) {
    console.error('할 일 불러오기 실패:', error);
    throw error;
  }
};

export const toggleLike = async (id: number) => {
  try {
    console.log('[PATCH 요청 보내는 중]', id);
    await axiosInstance.patch(`/todos/${id}/like`);
    console.log('[PATCH 성공]');
  } catch (error) {
    console.error('[PATCH 실패]', error);
    throw error;
  }
};


export const putTodosByDate = async (
  date: string,
  todos: { text: string; liked: boolean }[]
) => {
  try {
    const payload = { date, todos };
    console.log('[PUT 요청 보내는 중]', payload);
    const response = await axiosInstance.put('/todos', payload);
    console.log('[PUT 성공]', response.data);
    return response.data;
  } catch (error) {
    console.error('[PUT 실패]', error);
    throw error;
  }
};
