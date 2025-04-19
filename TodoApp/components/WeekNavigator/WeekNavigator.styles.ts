import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  dateNavigationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: -20,
  },
  arrowButton: {
    paddingHorizontal: 16,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 18,
    color: '#999',
  },
  dateScrollArea: {
    flex: 0,
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
