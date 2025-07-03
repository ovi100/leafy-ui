import React, {useEffect, useCallback, useState} from 'react';
import {View, StyleSheet, Dimensions, Pressable, Keyboard} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {elevations} from '../lib/common';

const {width, height} = Dimensions.get('window');

const Drawer = ({
  visible,
  onClose,
  position = 'left',
  children,
  width: customWidth,
  height: customHeight,
  corners = 'rounded',
}) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true),
    );
    const hide = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false),
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);
  const drawerSize =
    position === 'top' || position === 'bottom'
      ? customHeight || height * 0.4
      : customWidth || width * 0.7;

  const getHiddenPosition = useCallback(() => {
    switch (position) {
      case 'top':
        return -drawerSize;
      case 'bottom':
        return drawerSize;
      case 'left':
        return -drawerSize;
      case 'right':
        return drawerSize;
      default:
        return 0;
    }
  }, [drawerSize, position]);

  const translate = useSharedValue(visible ? 0 : getHiddenPosition());

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform:
        position === 'top' || position === 'bottom'
          ? [{translateY: translate.value}]
          : [{translateX: translate.value}],
    };
  });

  const openDrawer = useCallback(() => {
    translate.value = withTiming(0);
  }, [translate]);

  const closeDrawer = useCallback(() => {
    translate.value = withTiming(getHiddenPosition(), {}, () => {
      runOnJS(onClose)();
    });
  }, [getHiddenPosition, onClose, translate]);

  useEffect(() => {
    if (visible) {
      openDrawer();
    } else {
      closeDrawer();
    }
  }, [closeDrawer, openDrawer, visible]);

  const getDrawerStyle = () => {
    switch (position) {
      case 'top':
        return {
          top: 0,
          left: 0,
          right: 0,
          height: drawerSize,
          borderBottomLeftRadius: corners === 'rounded' ? 10 : 0,
          borderBottomRightRadius: corners === 'rounded' ? 10 : 0,
        };
      case 'bottom':
        return {
          bottom: 0,
          top: keyboardVisible ? 2 : undefined,
          left: 0,
          right: 0,
          height: drawerSize,
          borderTopLeftRadius: corners === 'rounded' ? 10 : 0,
          borderTopRightRadius: corners === 'rounded' ? 10 : 0,
        };
      case 'left':
        return {left: 0, top: 0, bottom: 0, width: drawerSize};
      case 'right':
        return {right: 0, top: 0, bottom: 0, width: drawerSize};
      default:
        return {};
    }
  };

  const showOverlay = () => {
    if (position === 'top' || position === 'bottom') {
      return height !== customHeight;
    } else {
      return width !== customWidth;
    }
  };

  return (
    <View style={styles.container}>
      {visible && showOverlay() && (
        <Pressable style={styles.overlay} onPress={closeDrawer} />
      )}
      <Animated.View style={[styles.drawer, getDrawerStyle(), animatedStyle]}>
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  drawer: {
    position: 'absolute',
    backgroundColor: 'white',
    ...elevations[4],
  },
});

export default Drawer;
