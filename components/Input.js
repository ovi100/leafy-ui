import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAppContext} from '../hooks';

const {height} = Dimensions.get('window');

const Input = ({isPassword = false, ...props}) => {
  const {deviceInfo} = useAppContext();
  const [secureText, setSecureText] = useState(isPassword);
  const isDarkMode = deviceInfo.theme === 'dark';

  const getDynamicText = () => {
    return {
      color: isDarkMode ? '#aaa' : '#000',
    };
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor={props.placeholderTextColor || '#aaa'}
        secureTextEntry={secureText}
        {...props}
      />
      {isPassword && props.value && (
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setSecureText(prev => !prev)}>
          <Text style={getDynamicText}>{secureText ? 'hide' : 'show'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  input: {
    height: height >= 600 ? 52 : 46,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    color: '#9ca3af',
    fontSize: height >= 600 ? 14 : 12,
    marginBottom: 8,
    padding: 15,
  },
  toggleButton: {
    position: 'absolute',
    top: height >= 600 ? 20 : 16,
    right: 16,
  },
  toggleButtonText: {},
});
