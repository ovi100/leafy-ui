import React, {useLayoutEffect} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';

const Home = ({navigation}) => {
  useLayoutEffect(() => {
    let screenOptions = {
      headerShown: false,
    };
    navigation.setOptions(screenOptions);
  }, [navigation]);

  const menus = [
    {
      id: 'accordion',
      name: 'Accordion',
      screen: 'Accordion',
      icon: null,
    },
    {
      id: 'box',
      name: 'Box',
      screen: 'Box',
      icon: null,
    },
    {
      id: 'button',
      name: 'Button',
      screen: 'Button',
      icon: null,
    },
    {
      id: 'carousel',
      name: 'Carousel',
      screen: 'Carousel',
      icon: null,
    },
    {
      id: 'checkbox',
      name: 'Checkbox',
      screen: 'Checkbox',
      icon: null,
    },
    {
      id: 'circular-progress',
      name: 'Circular Progress',
      screen: 'CircularProgress',
      icon: null,
    },
    {
      id: 'circular-timer',
      name: 'Circular Timer',
      screen: 'CircularTimer',
      icon: null,
    },
    {
      id: 'data-table',
      name: 'Data Table',
      screen: 'DataTable',
      icon: null,
    },
    {
      id: 'dialog',
      name: 'Dialog',
      screen: 'Dialog',
      icon: null,
    },
    {
      id: 'drawer',
      name: 'Drawer',
      screen: 'Drawer',
      icon: null,
    },
    {
      id: 'dropdown',
      name: 'Dropdown',
      screen: 'Dropdown',
      icon: null,
    },
    {
      id: 'input',
      name: 'Input',
      screen: 'Input',
      icon: null,
    },
    {
      id: 'loading-bar',
      name: 'Loading Bar',
      screen: 'LoadingBar',
      icon: null,
    },
    {
      id: 'menu',
      name: 'Menu',
      screen: 'Menu',
      icon: null,
    },
    {
      id: 'modal',
      name: 'Modal',
      screen: 'Modal',
      icon: null,
    },
    {
      id: 'otp-input',
      name: 'Otp Input',
      screen: 'OtpInput',
      icon: null,
    },
    {
      id: 'picker',
      name: 'Picker',
      screen: 'Picker',
      icon: null,
    },
    {
      id: 'progress-bar',
      name: 'Progress Bar',
      screen: 'ProgressBar',
      icon: null,
    },
    {
      id: 'switch',
      name: 'Switch',
      screen: 'Switch',
      icon: null,
    },
    {
      id: 'tab',
      name: 'Tab',
      screen: 'Tab',
      icon: null,
    },
    {
      id: 'toast',
      name: 'Toast',
      screen: 'Toast',
      icon: null,
    },
  ];

  const renderItem = ({item}) => (
    <TouchableOpacity
      key={item.name}
      className="w-[31%] bg-gray-200 rounded mx-1 mb-4"
      onPress={() => navigation.push(item.screen)}>
      {item.icon && (
        <View className="flex-col items-center justify-center">
          <View className="icon">
            <Image
              className="w-20 h-20 xs:w-24 xs:h-24 rounded-[14px]"
              source={item.icon}
            />
          </View>
          <Text
            className="text-black text-sm font-semibold text-center mt-3"
            numberOfLines={2}>
            {item.name}
          </Text>
        </View>
      )}
      {!item.icon && (
        <View className="flex-1 items-center justify-center p-5">
          <Text
            className="text-black text-sm font-semibold text-center"
            numberOfLines={2}>
            {item.name}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View className="bg-white flex-1">
      <View className="flex-1 px-2.5 py-4">
        <FlatList
          data={menus}
          renderItem={renderItem}
          keyExtractor={item => item.name}
          initialNumToRender={12}
          horizontal={false}
          numColumns={3}
          key={`flatList-${3}`}
          ListFooterComponentStyle={{paddingVertical: 10}}
        />
      </View>
    </View>
  );
};

export default Home;
