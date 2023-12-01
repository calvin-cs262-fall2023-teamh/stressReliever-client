// RoundButton.js

import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Sound from 'react-native-sound';
import { Vibration } from 'react-native';

const RoundButton = ({ title, onPress, backgroundColor }) => {
  const handleButtonPress = () => {
    // Load sound file
    const soundFile = new Sound('pop.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load the sound file', error);
      } else {
        // Play the loaded sound file
        soundFile.play();
      }
    });

    // Trigger haptic feedback
    Vibration.vibrate(100); // Adjust the vibration duration as needed

    // Execute the button onPress callback
    onPress();
  };

  return (
    <TouchableOpacity onPress={handleButtonPress}>
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: backgroundColor,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 10,
        }}
      ></View>
    </TouchableOpacity>
  );
};

export default RoundButton;
