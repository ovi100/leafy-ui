import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

/**
 * A customizable carousel component for React Native that supports auto-play, swipe gestures,
 * navigation controls, and various indicator styles.
 *
 * @component
 * @param {Object} props - The component props
 * @param {(string[]|number[])} props.images - Array of image sources (URIs or require() imports)
 * @param {number} [props.slideInterval=3000] - Interval in milliseconds between auto-slides
 * @param {boolean} [props.autoPlay=false] - Whether the carousel should auto-play
 * @param {boolean} [props.showArrows=false] - Whether to show navigation arrow controls
 * @param {boolean} [props.showIndicators=true] - Whether to show slide indicators
 * @param {('dots'|'bars'|'capsules')} [props.indicatorType='capsules'] - Style of indicators
 * @param {('inside'|'outside')} [props.indicatorPosition='inside'] - Position of indicators relative to carousel
 * @returns {React.ReactElement} The carousel component
 *
 * @example
 * <Carousel
 *   images={['https://example.com/image1.jpg', require('./local-image.jpg')]}
 *   autoPlay={true}
 *   slideInterval={5000}
 *   indicatorType="dots"
 *   indicatorPosition="outside"
 * />
 */

const Carousel = ({
  images,
  slideInterval = 3000,
  autoPlay = false,
  showArrows = true,
  showIndicators = false,
  indicatorType = 'capsules',
  indicatorPosition = 'inside',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(null);
  const translateX = useSharedValue(0);
  const autoSlideTimer = useRef(null);

  const updateAnimation = useCallback(
    index => {
      if (containerWidth !== null) {
        translateX.value = withTiming(-index * containerWidth, {duration: 300});
      }
    },
    [translateX, containerWidth],
  );

  const startAutoSlide = useCallback(() => {
    if (!autoPlay || !containerWidth) {
      return;
    }
    stopAutoSlide();
    autoSlideTimer.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
      updateAnimation(nextIndex);
    }, slideInterval);
  }, [
    autoPlay,
    currentIndex,
    images.length,
    slideInterval,
    updateAnimation,
    containerWidth,
  ]);

  const stopAutoSlide = () => {
    if (autoSlideTimer.current) {
      clearInterval(autoSlideTimer.current);
      autoSlideTimer.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [startAutoSlide]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  const handleSwipe = dir => {
    autoPlay && stopAutoSlide();
    let newIndex = currentIndex;
    if (dir === 'left') {
      newIndex = (currentIndex + 1) % images.length;
    } else if (dir === 'right') {
      newIndex = (currentIndex - 1 + images.length) % images.length;
    }
    setCurrentIndex(newIndex);
    updateAnimation(newIndex);
    autoPlay && startAutoSlide();
  };

  const handleIndicator = index => {
    autoPlay && stopAutoSlide();
    setCurrentIndex(index);
    updateAnimation(index);
    autoPlay && startAutoSlide();
  };

  const panGesture = Gesture.Pan().onEnd(event => {
    if (event.translationX < -50) {
      runOnJS(handleSwipe)('left');
    } else if (event.translationX > 50) {
      runOnJS(handleSwipe)('right');
    }
  });

  const indicatorPositionStyles = {
    marginTop: indicatorPosition === 'inside' ? -30 : 10,
  };

  const indicatorStyles = {
    backgroundColor: '#334155',
    width: indicatorType === 'dots' ? 10 : 25,
    height: indicatorType === 'dots' ? 10 : 5,
    borderRadius: indicatorType === 'bars' ? 0 : 50,
    marginHorizontal: 4,
  };

  return (
    <View style={styles.container}>
      <View
        style={styles.carouselWrapper}
        onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}>
        {containerWidth !== null && (
          <>
            <GestureDetector gesture={panGesture}>
              <Animated.View
                style={[
                  styles.slider,
                  {width: containerWidth * images.length},
                  animatedStyle,
                ]}>
                {images.map((image, index) => (
                  <View
                    key={index}
                    style={[styles.slide, {width: containerWidth}]}>
                    <Image
                      source={typeof image === 'string' ? {uri: image} : image}
                      style={styles.image}
                    />
                  </View>
                ))}
              </Animated.View>
            </GestureDetector>

            {showArrows && (
              <View style={styles.controls}>
                <TouchableOpacity onPress={() => handleSwipe('right')}>
                  <View style={styles.controlLeft} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSwipe('left')}>
                  <View style={styles.controlRight} />
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>

      {showIndicators && (
        <View style={[styles.indicators, indicatorPositionStyles]}>
          {images.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[indicatorStyles, index === currentIndex && styles.active]}
              onPress={() => handleIndicator(index)}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  carouselWrapper: {
    position: 'relative',
    width: '100%',
    height: 200,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  slider: {
    flexDirection: 'row',
    height: '100%',
  },
  slide: {
    height: '100%',
    flexShrink: 0,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  controls: {
    position: 'absolute',
    top: '55%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    zIndex: 10,
    transform: [{translateY: -14}],
  },
  controlLeft: {
    width: 18,
    height: 18,
    borderColor: '#fff',
    borderBottomWidth: 3,
    borderRightWidth: 3,
    transform: [{rotate: '135deg'}],
  },
  controlRight: {
    width: 18,
    height: 18,
    borderColor: '#fff',
    borderBottomWidth: 3,
    borderRightWidth: 3,
    transform: [{rotate: '-45deg'}],
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: '#22c55e',
  },
});

export default Carousel;
