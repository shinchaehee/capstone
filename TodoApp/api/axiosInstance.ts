import axios from 'axios';

// 너의 컴퓨터 IP 주소를 정확히 넣어줘! (예시 주소로는 연결 안 돼)
const axiosInstance = axios.create({
  baseURL: 'http://192.168.0.33:8080', // ← 여기 너의 실제 IP 주소로 바꿔야 해!
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // ✅ 쿠키 포함 설정 추가!!
});

export default axiosInstance;
