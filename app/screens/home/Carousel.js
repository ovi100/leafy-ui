import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Carousel, Radio, Switch} from '../../../components';

const CarouselScreen = () => {
  const base_image_url = 'https://placehold.jp/500x250.jpg?text=Image%20';
  const [images, setImages] = useState([]);
  const [imagesLength, setImagesLength] = useState(3);
  const [autoPlay, setAutoPlay] = useState(true);
  const [showControl, setShowControl] = useState(true);
  const [interval, setInterval] = useState(3000);
  const [indicatorType, setIndicatorType] = useState('capsules');
  const [indicatorPosition, setIndicatorPosition] = useState('outside');

  useEffect(() => {
    const data = Array.from(
      {length: imagesLength},
      (_, i) => base_image_url + (i + 1),
    );
    setImages(data);
  }, [imagesLength]);

  return (
    <View className="flex-1 bg-white p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="filters flex-row justify-between mb-3">
          <View className="types">
            <Text className="text-lg font-semibold mb-2">Indicator Type</Text>
            {['dots', 'bars', 'capsules'].map(option => (
              <Radio
                key={option}
                label={option}
                value={option}
                selected={indicatorType === option}
                onSelect={setIndicatorType}
              />
            ))}
          </View>
          <View className="positions">
            <Text className="text-lg font-semibold mb-2">
              Indicator Position
            </Text>
            {['inside', 'outside'].map(option => (
              <Radio
                key={option}
                label={option}
                value={option}
                selected={indicatorPosition === option}
                onSelect={setIndicatorPosition}
              />
            ))}
          </View>
        </View>
        <Text className="text-xl font-semibold my-2">Controls</Text>
        <View className="checks flex-row justify-start gap-x-5 flex-wrap mb-3">
          <View className="controls">
            <Text className="text-sm font-semibold mb-2">Show control</Text>
            <Switch
              value={showControl}
              size={20}
              type="rounded"
              onChange={setShowControl}
            />
          </View>
          <View className="auto-play">
            <Text className="text-sm font-semibold mb-2">Auto play</Text>
            <Switch
              value={autoPlay}
              size={20}
              type="rounded"
              onChange={setAutoPlay}
            />
          </View>
          <View className="interval">
            <Text className="text-sm font-semibold mb-2">Slide interval</Text>
            <View className="flex-row items-center justify-between mb-3">
              <TouchableOpacity
                className="bg-gray-500 px-3 py-0.5 rounded"
                onPress={() => setInterval(prev => prev - 500)}>
                <Text className="text-xl">-</Text>
              </TouchableOpacity>
              <Text className="text-sm mx-2">{interval}</Text>
              <TouchableOpacity
                className="bg-gray-500 px-3 py-0.5 rounded"
                onPress={() => setInterval(prev => prev + 500)}>
                <Text className="text-lg">+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="images">
            <Text className="text-sm font-semibold mb-2">Total Images</Text>
            <View className="flex-row items-center justify-between mb-3">
              <TouchableOpacity
                className="bg-gray-500 px-3 py-0.5 rounded"
                onPress={() => setImagesLength(prev => prev - 1)}>
                <Text className="text-xl">-</Text>
              </TouchableOpacity>
              <Text className="text-sm mx-2">{imagesLength}</Text>
              <TouchableOpacity
                className="bg-gray-500 px-3 py-0.5 rounded"
                onPress={() => setImagesLength(prev => prev + 1)}>
                <Text className="text-lg">+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="carousel flex-1 mt-5">
          <Carousel
            images={images}
            autoPlay={autoPlay}
            showArrows={showControl}
            showIndicators={showControl}
            indicatorPosition={indicatorPosition}
            indicatorType={indicatorType}
            slideInterval={interval}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CarouselScreen;
