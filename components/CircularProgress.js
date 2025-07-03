import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import {Svg, Circle} from 'react-native-svg';

const {width} = Dimensions.get('window');

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

/**
 * @typedef {'small' | 'medium' | 'large'} Size
 * @typedef {'default' | 'brand' | 'primary' | 'secondary' | 'danger' | 'success' | 'warn'} Variant
 */

/**
 * CircularProgress renders an animated circular progress indicator with percentage text.
 *
 * @component
 *
 * @param {Object} props
 * @param {Size} [props.size='medium'] - The size of the progress indicator.
 * @param {Variant} [props.variant='default'] - The color variant of the progress and text.
 * @param {number} [props.progress=75] - The progress value (0 to 100).
 * @param {number} [props.duration=1000] - The animation duration in milliseconds.
 *
 * @returns {JSX.Element}
 */

const CircularProgress = ({
  size = 'medium',
  variant = 'default',
  progress = 75,
  duration = 1000,
}) => {
  const sizes = {
    small: {width: 0.15, fontSize: 12, strokeWidth: 6},
    medium: {width: 0.2, fontSize: 14, strokeWidth: 8},
    large: {width: 0.25, fontSize: 16, strokeWidth: 10},
  };

  const variants = {
    default: {track: '#e5e7eb', fill: '#374151', text: '#374151'},
    brand: {track: '#e5e7eb', fill: '#c03221', text: '#c03221'},
    primary: {track: '#e5e7eb', fill: '#3b82f6', text: '#3b82f6'},
    secondary: {track: '#e5e7eb', fill: '#a855f7', text: '#a855f7'},
    danger: {track: '#e5e7eb', fill: '#ef4444', text: '#ef4444'},
    success: {track: '#e5e7eb', fill: '#22c55e', text: '#22c55e'},
    warn: {track: '#e5e7eb', fill: '#ff8904', text: '#ff8904'},
  };

  const SIZE = width * sizes[size].width;
  const strokeWidth = sizes[size].strokeWidth;
  const radius = (SIZE - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progressValue = useSharedValue(0);

  useEffect(() => {
    progressValue.value = withTiming(progress, {
      duration,
      easing: Easing.out(Easing.ease),
    });
  }, [duration, progress, progressValue]);

  const animatedCircleProps = useAnimatedProps(() => {
    const strokeDashoffset = interpolate(
      progressValue.value,
      [0, 100],
      [circumference, 0],
    );
    return {
      strokeDashoffset,
    };
  });

  return (
    <View style={[styles.container, {width: SIZE, height: SIZE}]}>
      <Svg width={SIZE} height={SIZE} style={styles.svg}>
        {/* Track */}
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={radius}
          stroke={variants[variant].track}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress */}
        <AnimatedCircle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={radius}
          stroke={variants[variant].fill}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={`${circumference}, ${circumference}`}
          animatedProps={animatedCircleProps}
          strokeLinecap="round"
        />
      </Svg>
      {/* Progress Text */}
      <Animated.View style={styles.progress}>
        <Text
          style={[
            styles.progressText,
            {color: variants[variant].text, fontSize: sizes[size].fontSize},
          ]}>
          {Math.round(progress)}%
        </Text>
      </Animated.View>
    </View>
  );
};

export default CircularProgress;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    transform: [{rotate: '-90deg'}],
    position: 'absolute',
  },
  progressText: {
    fontWeight: '600',
    textAlign: 'center',
  },
});
