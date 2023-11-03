import React from 'react';
import { View } from 'react-native';
import BreathingComponent from './Breathing';

const BreathingTool = ({ size }) => {
  return (
    <View
      style={{
        width: size.width,
        height: size.height,
        backgroundColor: 'black',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', // Added to clip content that overflows
      }}
    >
      <BreathingComponent />
    </View>
  );
};

export default BreathingTool;
