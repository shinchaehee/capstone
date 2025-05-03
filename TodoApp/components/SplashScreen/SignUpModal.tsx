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
import axios from 'axios';
import styles from './SignUpModal.styles';

interface SignUpModalProps {
  visible: boolean;
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ visible, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // ✅ 모달 열릴 때마다 입력값 초기화
  useEffect(() => {
    if (visible) {
      resetFields();
    }
  }, [visible]);

  const resetFields = () => {
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleDuplicateCheck = async () => {
    try {
      await axios.post('http://localhost:8080/auth/signup', {
        username,
        password: 'dummy_password',
      });
      Alert.alert('사용 가능', '사용 가능한 아이디입니다.');
    } catch (error: any) {
      if (error.response?.status === 409) {
        Alert.alert('중복된 아이디', '이미 사용 중인 아이디입니다.');
        setUsername('');
      } else {
        Alert.alert('확인 실패', '중복 확인 중 문제가 발생했습니다.');
      }
    }
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
      await axios.post('http://localhost:8080/auth/signup', {
        username,
        password,
      });
      Alert.alert('회원가입 성공', '이제 로그인해주세요.');
      onClose();
    } catch (error: any) {
      if (error.response?.status === 409) {
        Alert.alert('중복된 아이디', '이미 사용 중인 아이디입니다.');
        setUsername('');
      } else {
        Alert.alert('회원가입 실패', '다시 시도해주세요.');
        resetFields();
      }
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

            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.inputFlexGrow]}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                textContentType="none"
                autoComplete="off"
                importantForAutofill="no"
              />
              <TouchableOpacity style={styles.duplicateButton} onPress={handleDuplicateCheck}>
                <Text style={styles.duplicateText}>중복</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              textContentType="none"
              autoComplete="off"
              importantForAutofill="no"
            />

            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              textContentType="none"
              autoComplete="off"
              importantForAutofill="no"
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
