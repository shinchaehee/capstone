import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import styles from './SignUpModal.styles';
import { signup } from '../../api/authApi'; // ✅ axios 대신 이걸 사용

interface SignUpModalProps {
  visible: boolean;
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ visible, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (visible) resetFields();
  }, [visible]);

  const resetFields = () => {
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleSignUp = async () => {
    if (!username || !password || !confirmPassword) {
      Alert.alert('입력 오류', '모든 필드를 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('비밀번호 불일치', '비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await signup(username, password); // ✅ 수정됨
      Alert.alert('회원가입 성공', '이제 로그인해주세요.');
      onClose();
    } catch (error: any) {
      if (error.response?.status === 409 || error.response?.status === 400) {
        Alert.alert('중복된 아이디', '이미 사용 중인 아이디입니다.');
      } else {
        Alert.alert('회원가입 실패', '서버에 문제가 있습니다.');
      }
      resetFields();
    }
  };

  const handleCancel = () => {
    resetFields();
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flexContainer}
      >
        <ScrollView contentContainerStyle={styles.overlay} keyboardShouldPersistTaps="handled">
          <View style={styles.modalContainer}>
            <Text style={styles.title}>회원가입</Text>

            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              textContentType="none"
              autoComplete="off"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              textContentType="none"
              autoComplete="off"
            />

            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              textContentType="none"
              autoComplete="off"
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelText}>취소</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.submitButton} onPress={handleSignUp}>
                <Text style={styles.submitText}>가입</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default SignUpModal;
