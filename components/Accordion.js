import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedRef,
  useSharedValue,
  useAnimatedStyle,
  runOnUI,
  measure,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {edges, lighten, sizes, variants} from '../lib/common';

const accordionStyle = {color: '#fff', fontSize: 14};
const content = (
  <View>
    <Text style={accordionStyle}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </Text>
  </View>
);

/**
 * A customizable Accordion component with support for size, variant, edge, type, divider and disabled states.
 *
 * @param {Object} props - Accordion component props.
 * @param {{title:string, icon:React.ReactNode, content:React.ReactNode}} [props.item] - Accordion component item.
 * @param {'small' | 'medium' | 'large'} [props.size='medium'] - Size of the Accordion.
 * @param {'default' | 'brand' | 'primary' | 'secondary' | 'danger' | 'success' | 'warn'} [props.variant='default'] - Variant/style type of the Accordion.
 * @param {string} [props.text='Button text'] - Text to display inside the Accordion.
 * @param {'filled' | 'outline' | 'text' | 'icon'} [props.type='filled'] - Type of the Accordion.
 * @param {'square' | 'rounded' | 'capsule'} [props.edge='rounded'] - Button edge style.
 * @param {string|null} [props.brandColor=null] - Custom brand color used when variant is 'brand'.
 * @param {boolean} [props.divider=false] - A top and bottom divider for the Accordion.
 *
 * @returns {JSX.Element} A styled Accordion component.
 */

const Accordion = ({
  item = {
    title: 'Accordion 1',
    icon: null,
    content,
  },
  size = 'medium',
  variant = 'default',
  brandColor = '',
  edge = 'rounded',
  type = 'filled',
  divider = false,
}) => {
  const listRef = useAnimatedRef();
  const heightValue = useSharedValue(0);
  const open = useSharedValue(false);
  const rotate = useDerivedValue(() =>
    open.value ? withTiming(1) : withTiming(-1),
  );

  if (variant === 'brand' && brandColor) {
    variants[variant].bg = brandColor;
  }

  const heightAnimationStyle = useAnimatedStyle(() => ({
    height: heightValue.value,
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotate.value * 45}deg`}],
  }));

  const getContainerStyle = () => {
    let borderWidth, borderTopWidth, marginVertical;
    const backgroundColor =
      type === 'filled'
        ? variant === 'brand' && brandColor
          ? brandColor
          : variants[variant].bg
        : 'transparent';
    const borderColor =
      variant === 'brand' && brandColor ? brandColor : variants[variant].bg;
    const borderRadius = edges[edge];
    if (type === 'text' && divider) {
      borderTopWidth = 1;
      marginVertical = 0;
    } else {
      borderWidth = 1;
      marginVertical = 5;
    }
    return {
      backgroundColor,
      borderColor,
      borderRadius,
      borderWidth,
      borderTopWidth,
      marginVertical,
    };
  };

  const getTitleStyle = () => {
    return {
      color: variants[variant].text,
      fontSize: sizes[size].fontSize,
    };
  };

  const getContentStyle = () => {
    const backgroundColor =
      variant === 'default' ? '#f3f4f6' : lighten(variants[variant].bg, 15);
    return {
      backgroundColor,
      padding: sizes[size].space,
      paddingHorizontal: sizes[size].space,
      paddingTop: sizes[size].space / 2,
      paddingBottom: sizes[size].space,
    };
  };

  const getIconStyle = () => {
    const s = sizes[size].iconSize - 10;
    return {
      width: s,
      height: s,
      borderColor: variants[variant].iconColor,
    };
  };

  const toggleContent = () => {
    if (heightValue.value === 0) {
      runOnUI(() => {
        'worklet';
        const measuredHeight = measure(listRef);
        if (measuredHeight) {
          heightValue.value = withTiming(measuredHeight.height);
        }
      })();
    } else {
      heightValue.value = withTiming(0);
    }
    open.value = !open.value;
  };

  return (
    <View style={[styles.container, getContainerStyle()]}>
      <Pressable
        onPress={() => toggleContent()}
        style={[styles.titleContainer, {padding: sizes[size].space}]}>
        <View style={styles.title}>
          {item?.icon && <View>{item.icon}</View>}
          <Text style={getTitleStyle()}>{item.title}</Text>
        </View>
        <Animated.View style={[iconStyle, getIconStyle(), styles.icon]} />
      </Pressable>
      <Animated.View style={heightAnimationStyle}>
        <Animated.View style={styles.contentContainer} ref={listRef}>
          <View style={getContentStyle()}>{item.content}</View>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  contentContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
});
