import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './SplashScreen.styles';
import { login } from '../../api/todoApi';
import SignUpModal from './SignUpModal';

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUpVisible, setSignUpVisible] = useState(false);

  const handleLogin = async () => {
    try {
      const result = await login(username, password);

      if (result.success) {
        navigation.replace('Home');
      } else {
        throw new Error('로그인 실패');
      }
    } catch (error) {
      Alert.alert('로그인 실패', '아이디 또는 비밀번호가 일치하지 않습니다.');
      setUsername('');
      setPassword('');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.fullScreen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>TODO LIST</Text>
        <Text style={styles.subtitle}>투두 리스트에 오신 것을 환영합니다 :)</Text>

        <TextInput
          placeholder="Username"
          placeholderTextColor="#999"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          textContentType="none"
          autoComplete="off"
          importantForAutofill="no"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          textContentType="none"
          autoComplete="off"
          importantForAutofill="no"
        />

        <View style={styles.rowWithMarginTop}>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signUpBox}
            onPress={() => setSignUpVisible(true)}
          >
            <Text style={styles.signUpText}>＋</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.graphic}>
          <View style={styles.bar} />
          <View style={styles.line} />
          <View style={styles.circle} />
          <View style={styles.halfCircle} />
          <View style={styles.circle} />
        </View>
      </ScrollView>

      <SignUpModal
        visible={isSignUpVisible}
        onClose={() => setSignUpVisible(false)}
      />
    </KeyboardAvoidingView>
  );
};

export default SplashScreen;
