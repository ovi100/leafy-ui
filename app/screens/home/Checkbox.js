import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {CheckBox, Radio, Switch} from '../../../components';
import {SIZES, VARIANTS} from '../../../lib/common';

const Checkbox = () => {
  const [isChecked, setIsChecked] = useState(true);
  const [visibleLabel, setVisibleLabel] = useState(true);
  const [size, setSize] = useState('medium');
  const [variant, setVariant] = useState('default');
  const [disabled, setDisabled] = useState(false);
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
      <View className="checks flex-row justify-start gap-x-5 mb-3">
        <View className="disable">
          <Text className="text-sm font-semibold mb-2">Disable checkbox</Text>
          <Switch
            value={disabled}
            size={20}
            type="rounded"
            onChange={setDisabled}
          />
        </View>
        <View className="disable">
          <Text className="text-sm font-semibold mb-2">Show label</Text>
          <Switch
            value={visibleLabel}
            size={20}
            type="rounded"
            onChange={setVisibleLabel}
          />
        </View>
      </View>
      <View className="checkbox mt-5">
        <CheckBox
          label={visibleLabel ? 'accepts terms and conditions' : ''}
          size={size}
          variant={variant}
          checked={isChecked}
          onChange={setIsChecked}
          disabled={disabled}
        />
      </View>
    </View>
  );
};

export default Checkbox;
