import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#e9edff',
    paddingTop: 10,
    paddingBottom: 20,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#D9D9D9',
    marginBottom: 12, // ✅ 선과 버튼 사이 여백
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 90, // ✅ 버튼 사이 간격
  },
  button: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    tintColor: '#BBBBBB',
    resizeMode: 'contain',
  },


  minusIcon: {
    width: 48,   // ✅ 플러스보다 살짝 키움
    height: 48,
    tintColor: '#BBBBBB',
    resizeMode: 'contain',
  },
});

export default styles;
