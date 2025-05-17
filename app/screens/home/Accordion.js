import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Accordion} from '../../../components';
import Radio from '../../../components/Radio';

const options = [
  'default',
  'brand',
  'primary',
  'secondary',
  'danger',
  'success',
];

const AccordionScreen = () => {
  const [selected, setSelected] = useState('default');

  console.log(selected);
  return (
    <View className="flex-1 bg-white p-4">
      <Text className="font-semibold">Select a variant:</Text>
      {options.map(option => (
        <Radio
          key={option}
          label={option}
          value={option}
          variant="secondary"
          selected={selected === option}
          onSelect={setSelected}
        />
      ))}
      <Accordion variant={selected} />
    </View>
  );
};

export default AccordionScreen;
