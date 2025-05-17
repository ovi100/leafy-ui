import React, {useEffect} from 'react';
import {Pressable, Text, View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {sizes, variants} from '../lib/common';

const Radio = ({
  label,
  value,
  selected,
  onSelect,
  size = 'medium',
  variant = 'default',
  brandColor = '',
  labelStyle = {},
}) => {
  const scale = useSharedValue(selected ? 1 : 0);
  const opacity = useSharedValue(selected ? 1 : 0.4);

  if (variant === 'brand' && brandColor) {
    variants[variant].bg = brandColor;
  }

  useEffect(() => {
    scale.value = withTiming(selected ? 1 : 0, {duration: 200});
    opacity.value = withTiming(selected ? 1 : 0.4, {duration: 200});
  }, [opacity, scale, selected]);

  const animatedInnerStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
    opacity: opacity.value,
  }));

  return (
    <Pressable onPress={() => onSelect(value)} style={styles.container}>
      <View
        style={[
          styles.radioOuter,
          {
            width: sizes[size].iconSize,
            height: sizes[size].iconSize,
            borderRadius: sizes[size].iconSize / 2,
            borderColor: variants[variant].bg,
          },
        ]}>
        <Animated.View
          style={[
            styles.radioInner,
            {
              width: sizes[size].iconSize / 2,
              height: sizes[size].iconSize / 2,
              borderRadius: sizes[size].iconSize / 4,
              backgroundColor: variants[variant].bg,
            },
            animatedInnerStyle,
          ]}
        />
      </View>
      {label ? (
        <Text
          style={[styles.label, {fontSize: sizes[size].fontSize}, labelStyle]}>
          {label}
        </Text>
      ) : null}
    </Pressable>
  );
};

export default Radio;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  radioOuter: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    backgroundColor: 'black',
  },
  label: {
    marginLeft: 8,
    textTransform: 'capitalize',
  },
});
