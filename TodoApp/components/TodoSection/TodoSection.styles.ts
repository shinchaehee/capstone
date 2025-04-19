// components/TodoSection/TodoSection.styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#e9edff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 30,
    paddingTop: 12,
    marginTop: 20,
    marginHorizontal: -22,
  },
  dragBar: {
    width: 150,
    height: 4,
    backgroundColor: 'white',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  header: {
    marginTop: 25,
    marginBottom: 40,
  },
  dateText: {
    fontSize: 12,
    color: '#444',
    fontWeight: '600',
    marginBottom: 4,
  },
  dayText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 5,
  },
  todoScroll: {
    flex: 1,
  },
});

export default styles;
