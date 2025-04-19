import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import styles from './AddButton.styles';

interface AddButtonProps {
  onAdd: () => void;
  onRemove?: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onAdd, onRemove }) => {
  return (
    <View style={styles.wrapper}>
      {/* ✅ 선은 항상 위에 고정 */}
      <View style={styles.divider} />

      {/* ✅ 버튼은 아래, 자연스럽게 중앙 정렬 */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.button} onPress={onAdd}>
          <Image source={require('../../assets/plus-icon.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onRemove}>
          <Image source={require('../../assets/minus-icon.png')} style={styles.minusIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddButton;
