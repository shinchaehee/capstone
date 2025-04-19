import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    paddingHorizontal: 24,
  },
  header: {
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 13,
    color: '#9A9A9A',
    marginTop: 30,
    textAlign: 'center',
  },
  separator: {
    marginTop: 13,          // 위 텍스트와 간격
    height: 1,              // 선 두께
    backgroundColor: '#E0E0E0', // 연한 회색
    width: '100%',          // 전체 너비
  },






// 화살표 스타일
dateNavigationWrapper: {
  flexDirection: 'row',       // 가로 배치
  alignItems: 'center',       // 수직 정렬
  justifyContent: 'space-between',
  marginTop: 9,
  marginHorizontal: -20,
},

arrowButton: {
  paddingHorizontal: 16,     // 화살표 주변 공간
  height: 60,
  justifyContent: 'center',
  alignItems: 'center',
},

arrowText: {
  fontSize: 18,
  color: '#999',
},




dateScrollArea: {
  flex: 0,                   // 화살표 사이 공간 다 차지
},

dateScrollContainer: {
  flexDirection: 'row',
  paddingVertical: 12,
},

dateBox: {
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#fff',
  paddingVertical: 8,
  paddingHorizontal: 5,
  borderRadius: 10,
  marginRight: 8,
  width: 40,
  height: 53,
  shadowColor: '#000',
  shadowOffset: { width: 4, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 6,
},

  selectedDateBox: {
    backgroundColor: '#ECECFF',
  },
  dateText: {
    fontSize: 15,
    color: '#2E2E2E',
    fontWeight: '600',
  },
  selectedDateText: {
    color: '#6D61FF',
  },
  dayText: {
    fontSize: 9,
    fontWeight: '200',
    color: '#8C8C8C',
  },
  selectedDayText: {
    color: '#6D61FF',
  },
});

export default styles;
