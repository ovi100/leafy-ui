import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Button, CheckBox} from '../../../components';
import {SIZES, VARIANTS} from '../../../lib/common';
import Radio from '../../../components/Radio';

const ButtonScreen = () => {
  const [size, setSize] = useState('medium');
  const [variant, setVariant] = useState('default');
  const [type, setType] = useState('filled');
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <View className="flex-1 bg-white p-4">
      <View className="filters flex-row justify-between mb-3">
        <View className="sizes">
          <Text className="text-lg font-semibold mb-2">Sizes</Text>
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
        <View className="types">
          <Text className="text-lg font-semibold mb-2">Types</Text>
          {['filled', 'outline', 'text'].map(option => (
            <Radio
              key={option}
              label={option}
              value={option}
              selected={type === option}
              onSelect={setType}
            />
          ))}
        </View>
        <View className="variants">
          <Text className="text-lg font-semibold mb-2">Variants</Text>
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
      <View className="checks flex-row justify-between mb-3">
        <View className="disable">
          <CheckBox
            label="Is disable button"
            size="small"
            checked={disabled}
            onChange={setDisabled}
          />
        </View>
        <View className="loading">
          <CheckBox
            label="Is loading button"
            size="small"
            checked={loading}
            onChange={setLoading}
          />
        </View>
      </View>

      <Button
        text="Submit Data"
        size={size}
        variant={variant}
        type={type}
        disabled={disabled}
        loading={loading}
      />
    </View>
  );
};

export default ButtonScreen;
