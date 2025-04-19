import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 11.5,
    color: '#666',
    marginBottom: 50,
  },
  graphic: {
    alignItems: 'center',
  },
  bar: {
    width: 95,
    height: 12,
    backgroundColor: '#333',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  line: {
    width: 11.5,
    height: 66,
    backgroundColor: '#333',
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#333',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  halfCircle: {
    width: 40,                  // 정사각형 너비
    height: 80,                 // 정사각형 높이
    backgroundColor: '#333',   // 배경색
    borderTopLeftRadius: 0,    // 왼쪽 위 직각
    borderBottomLeftRadius: 0, // 왼쪽 아래 직각
    borderTopRightRadius: 40,  // 오른쪽 위 반지름
    borderBottomRightRadius: 40, // 오른쪽 아래 반지름
    transform: [{ translateX: 17 }], // 👉 원하는 만큼 이동
    overflow: 'hidden',        // 넘치는 모서리 잘라냄
    elevation: 6,              // 안드로이드 그림자
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
},
});

export default styles;
