import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './SplashScreen.styles';

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TODO LIST</Text>
      <Text style={styles.subtitle}>투두 리스트에 오신 것을 환영합니다 :)</Text>

      <View style={styles.graphic}>
        <View style={styles.bar} />
        <View style={styles.line} />
        <View style={styles.circle} />
        <View style={styles.halfCircle} />
        <View style={styles.circle} />
      </View>
    </View>
  );
};

export default SplashScreen;
