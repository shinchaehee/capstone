// api/todoApi.ts
import axiosInstance from './axiosInstance';

interface Todo {
  id?: number;
  text: string;
  date: string;
  liked?: boolean; // GET 결과에 liked도 포함되므로 선택적 추가
}

// ✅ POST 요청
export const postTodo = async (todo: Todo) => {
  try {
    console.log('[POST 요청 보내는 중]', todo); // 💡 로그 추가
    const response = await axiosInstance.post('/todos', todo);
    console.log('[POST 성공]', response.data);  // 💡 성공 로그
    return response.data;
  } catch (error) {
    console.error('할 일 등록 실패:', error);
    throw error;
  }
};

// ✅ GET 요청
export const fetchTodosByDate = async (date: string): Promise<Todo[]> => {
  try {
    console.log('[GET 요청 보내는 중]', date); // 💡 로그 추가
    const response = await axiosInstance.get('/todos', {
      params: { date },
    });
    console.log('[GET 성공]', response.data);  // 💡 성공 로그
    return response.data;
  } catch (error) {
    console.error('할 일 불러오기 실패:', error);
    throw error;
  }
};

// api/todoApi.ts
export const toggleLike = async (id: number) => {
  try {
    const response = await axiosInstance.patch(`/todos/${id}/like`);
    console.log('[PATCH 성공]', response.data);
    return response.data;
  } catch (error) {
    console.error('[PATCH 실패]', error);
    throw error;
  }
};

export const putTodosByDate = async (date: string, todos: { text: string }[]) => {
  try {
    const payload = {
      date,
      todos: todos.map((todo) => todo.text), // ✅ 서버는 string[] 원함
    };

    const response = await axiosInstance.put('/todos', payload);
    console.log('[PUT 성공]', response.data);
    return response.data;
  } catch (error) {
    console.error('[PUT 실패]', error);
    throw error;
  }
};

export const login = async (username: string, password: string) => {
  const response = await axiosInstance.post('/login', {
    username,
    password,
  });
  return response.data;
};
