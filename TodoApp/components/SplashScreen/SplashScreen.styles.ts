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

  input: {
    width: 250,
    height: 45,
    backgroundColor: '#FBFAF8',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  loginButton: {
    width: 160,
    height: 40,
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  loginButtonText: {
    color: '#6667ab',
    fontWeight: 'bold',
    fontSize: 15,
  },


  signUpBox: {
    width: 40,
    height: 40,
    marginLeft: 10,
    marginTop: -38,
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  signUpText: {
    fontSize: 20,
    color: '#999',
    fontWeight: '600',
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

fullScreen: {
  flex: 1,
},
rowWithMarginTop: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 8,
},

});

export default styles;
