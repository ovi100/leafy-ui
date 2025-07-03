import React, {useState} from 'react';
import {
  Dimensions,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {colors, edges, lighten} from '../lib/common';

const {width} = Dimensions.get('window');

/**
 * A customizable tab component with animated transitions between tabs.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array.<{label: string, content: React.ReactNode}>} [props.tabs=null] - Array of tab objects containing label and content
 * @param {'classic'|'rounded'|'square'|'capsule'} [props.theme='classic'] - Visual style of the tab header
 * @param {'small'|'medium'|'large'} [props.size='medium'] - Size variant of the tabs
 * @param {'default' | 'brand' | 'primary' | 'secondary' | 'danger' | 'success'} [props.variant='default'] - Color variant of the active tab indicator
 * @param {Boolean} [props.trackVisibility=false] - Visibility of tab track
 * @returns {React.ReactElement} The tab component
 *
 * @example
 * <Tab
 *   tabs={[
 *     { label: 'Tab 1', content: <View><Text>Content 1</Text></View> },
 *     { label: 'Tab 2', content: <View><Text>Content 2</Text></View> }
 *   ]}
 *   theme="rounded"
 *   size="large"
 *   variant="primary"
 * />
 */

const Tab = ({
  tabs = null,
  theme = 'classic',
  size = 'medium',
  variant = 'default',
  trackVisibility = true,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const translateX = useSharedValue(0);

  const sizes = {
    small: {space: 12, fontSize: 12, iconSize: 12},
    medium: {space: 16, fontSize: 16, iconSize: 16},
    large: {space: 20, fontSize: 20, iconSize: 20},
  };

  const handleTabPress = index => {
    setActiveTab(index);
    translateX.value = withSpring(-width * index, {
      damping: 50,
      stiffness: 200,
    });
  };

  const contentStyle = {width: width * tabs.length, flexDirection: 'row'};

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  const variants = {
    ...Object.fromEntries(
      Object.entries(colors).map(([key]) => [
        key,
        {
          iconColor: '#000',
          common: {
            borderTopWidth: theme !== 'classic' ? 1 : 0,
            borderRightWidth: theme !== 'classic' ? 1 : 0,
            borderBottomWidth: theme !== 'classic' ? 1 : 2,
            borderLeftWidth: theme !== 'classic' ? 1 : 0,
            borderRadius: theme !== 'classic' ? edges[theme] : 0,
            paddingHorizontal: sizes[size].space,
            paddingVertical: sizes[size].space / 3,
            marginRight: 10,
          },
          track: trackVisibility
            ? {
                backgroundColor:
                  theme !== 'classic'
                    ? lighten(colors[variant], 40)
                    : 'transparent',
                borderWidth: 1,
                borderColor:
                  theme !== 'classic'
                    ? lighten(colors[variant], 40)
                    : 'transparent',
                borderRadius: theme !== 'classic' ? edges[theme] : 0,
                padding: sizes[size].space,
              }
            : {},
          button: {
            backgroundColor: 'transparent',
            borderColor: '#6b7280',
          },
          text: {
            color: '#6b7280',
            fontWeight: 'normal',
          },
          active: {
            button: {
              backgroundColor:
                theme !== 'classic' ? colors[variant] : 'transparent',
              borderColor: colors[variant],
            },
            text: {
              color: theme !== 'classic' ? '#fff' : colors[variant],
              fontWeight: 'bold',
            },
          },
        },
      ]),
    ),
  };

  if (tabs === null) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Tab Headers with horizontal scroll */}
      <View style={[styles.header, variants[variant].track]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleTabPress(index)}
              style={[
                variants[variant].common,
                activeTab === index
                  ? variants[variant].active.button
                  : variants[variant].button,
              ]}>
              <Animated.Text
                style={[
                  activeTab === index
                    ? variants[variant].active.text
                    : variants[variant].text,
                ]}>
                {tab.label}
              </Animated.Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Tab Content */}
      <Animated.View style={[contentStyle, animatedStyle]}>
        {tabs.map((tab, index) => (
          <View key={index} style={{width}}>
            {tab.content}
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

export default Tab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 8,
  },
  contentContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  content: {
    backgroundColor: 'transparent',
  },
});
