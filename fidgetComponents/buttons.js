// RoundButtonToolbox.js

import React from 'react';
import { View } from 'react-native';
import RoundButton from './buttons/buttonOutline';

const RoundButtonToolbox = () => {
  const handleButtonPress = (buttonNumber) => {
    console.log(`Button ${buttonNumber} pressed`);
  };

  return (
    <View style={{ flexDirection: 'row', padding: 15 }}>
      <View style={{ flexDirection: 'column' }}>
        <RoundButton title='1' onPress={() => handleButtonPress(1)} backgroundColor={'red'} />
        <RoundButton title='3' onPress={() => handleButtonPress(3)} backgroundColor={'blue'}/>
      </View>
      <View style={{ flexDirection: 'column' }}>
        <RoundButton title='2' onPress={() => handleButtonPress(2)} backgroundColor={'yellow'} />
        <RoundButton title='4' onPress={() => handleButtonPress(4)} backgroundColor={'green'} />
      </View>
    </View>
  );
};

export default RoundButtonToolbox;
