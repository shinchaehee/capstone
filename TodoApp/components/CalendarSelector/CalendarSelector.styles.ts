import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E2E2E',
    marginTop: 18,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: '80%',
    maxHeight: '70%',
  },
  modalItem: {
    fontSize: 20,
    paddingVertical: 10,
    textAlign: 'center',
    marginVertical: 8,
    color: '#444',
    fontWeight: '500',
  },
});

export default styles;
