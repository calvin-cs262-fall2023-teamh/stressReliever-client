// RoundButton.js

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

const RoundButton = ({ title, onPress, backgroundColor }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          width: 50, // Adjust the width of the button as needed
          height: 50, // Adjust the height of the button as needed
          borderRadius: 25, // Make it round by setting half of the width/height as borderRadius
          backgroundColor: backgroundColor, // Customize the color as needed
          justifyContent: 'center',
          alignItems: 'center',
          margin: 10, // Adjust the margin as needed
        }}
      >
      </View>
    </TouchableOpacity>
  );
};

export default RoundButton;
