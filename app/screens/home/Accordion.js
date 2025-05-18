import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Accordion} from '../../../components';
import Radio from '../../../components/Radio';
import {SIZES, VARIANTS} from '../../../lib/common';

const AccordionScreen = () => {
  const [size, setSize] = useState('medium');
  const [variant, setVariant] = useState('default');

  return (
    <View className="flex-1 bg-white p-4">
      <View className="filters flex-row justify-between mb-3">
        <View className="sizes">
          <Text className="text-lg font-semibold mb-2">Select a size</Text>
          {SIZES.map(option => (
            <Radio
              key={option}
              label={option}
              value={option}
              selected={size === option}
              onSelect={setSize}
            />
          ))}
        </View>
        <View className="variants">
          <Text className="text-lg font-semibold mb-2">Select a variant</Text>
          {VARIANTS.map(option => (
            <Radio
              key={option}
              label={option}
              value={option}
              selected={variant === option}
              onSelect={setVariant}
            />
          ))}
        </View>
      </View>

      <Accordion size={size} variant={variant} />
    </View>
  );
};

export default AccordionScreen;
