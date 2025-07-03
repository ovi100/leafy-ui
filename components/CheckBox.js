import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

/**
 * A customizable check box component with support for size, variant, loading, and disabled states.
 *
 * @param {Object} props - check box component props.
 * @param {string} [props.label=''] - Text to display inside the label.
 * @param {boolean} [props.checked=false] - Whether the check box is disabled.
 * @param {() => void|null} [props.onChange=null] - Function to call when the check box is pressed.
 * @param {'small' | 'medium' | 'large'} [props.size='medium'] - Size of the check box.
 * @param {'default' | 'brand' | 'primary' | 'secondary' | 'danger' | 'success' | 'warn' | 'cancel' | 'action'} [props.variant='default'] - Variant/style type of the check box.
 * @param {string|null} [props.brandColor=null] - Custom brand color used when variant is 'brand'.
 * @param {boolean} [props.disabled=false] - Whether the check box is disabled.
 * @param {Object} style - check box component styles.
 *
 * @returns {JSX.Element} A styled check box component.
 */
const CheckBox = ({
  label = '',
  checked = false,
  onChange = () => null,
  variant = 'default',
  size = 'medium',
  brandColor = '',
  disabled = false,
  style = {},
}) => {
  const sizes = {
    small: {
      box: {width: 20, height: 20},
      sign: {left: 4, width: 8, height: 12},
      fontSize: 14,
    },
    medium: {
      box: {width: 24, height: 24},
      sign: {left: 6, width: 8, height: 14},
      fontSize: 16,
    },
    large: {
      box: {width: 28, height: 28},
      sign: {left: 8, width: 8, height: 16},
      fontSize: 18,
    },
  };
  const variants = {
    default: {bg: '#000000', border: '#000000', sign: '#ffffff'},
    brand: {bg: '#4f46e5', border: '#4f46e5', sign: '#ffffff'},
    primary: {bg: '#3b82f6', border: '#3b82f6', sign: '#ffffff'},
    secondary: {bg: '#a855f7', border: '#a855f7', sign: '#ffffff'},
    danger: {bg: '#ef4444', border: '#ef4444', sign: '#ffffff'},
    success: {bg: '#22c55e', border: '#22c55e', sign: '#ffffff'},
    warn: {bg: '#fb923c', border: '#fb923c', sign: '#ffffff'},
    cancel: {bg: '#e5e7eb', border: '#374151', sign: '#ffffff'},
    action: {bg: '#bae6fd', border: '#1d4ed8', sign: '#ffffff'},
  };

  if (variant === 'brand' && brandColor) {
    variants[variant].bg = brandColor;
    variants[variant].border = brandColor;
    variants[variant].text = brandColor;
  }

  const Wrapper = !disabled ? Pressable : View;

  const checkboxStyle = {
    ...sizes[size].box,
    borderColor: checked
      ? variants[variant].border
      : disabled
      ? 'transparent'
      : '#d1d5db',
    backgroundColor: checked ? variants[variant].bg : 'transparent',
    opacity: disabled ? 0.2 : 1,
  };

  const signStyle = {
    ...sizes[size].sign,
    borderColor: checked ? variants[variant].sign : 'transparent',
  };

  const labelStyle = {
    ...style.label,
    fontSize: sizes[size].fontSize,
    opacity: disabled ? 0.2 : 1,
  };

  return (
    <Wrapper style={styles.container} onPress={() => onChange(!checked)}>
      <View style={[styles.checkbox, checkboxStyle]}>
        {checked && <View style={[styles.sign, signStyle]} />}
      </View>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
    </Wrapper>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  checkbox: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    marginRight: 10,
  },
  sign: {
    position: 'absolute',
    borderBottomWidth: 2,
    borderRightWidth: 2,
    transform: [{rotate: '40deg'}],
    marginRight: 10,
  },
  label: {
    color: '#000000',
  },
});
