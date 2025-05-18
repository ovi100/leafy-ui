import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {ELEVATIONS} from '../../../lib/common';
import Radio from '../../../components/Radio';
import {Box} from '../../../components';

const BoxScreen = () => {
  const [elevation, setElevation] = useState(1);
  return (
    <View className="flex-1 bg-white p-4">
      <View className="filters flex-row justify-between mb-3">
        <View className="sizes">
          <Text className="text-lg font-semibold mb-2">Select a size</Text>
          <View className="flex-row flex-wrap">
            {ELEVATIONS.map(option => (
              <View className="w-1/5" key={option}>
                <Radio
                  key={option}
                  label={option}
                  value={option}
                  selected={elevation === option}
                  onSelect={setElevation}
                />
              </View>
            ))}
          </View>
        </View>
      </View>
      <View className="mt-5">
        <Box elevation={elevation}>
          <Text className="text-base text-center font-medium">
            Box component can contain any valid react native node element.
          </Text>
        </Box>
      </View>
    </View>
  );
};

export default BoxScreen;
