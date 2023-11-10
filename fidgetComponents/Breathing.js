import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, Animated, Easing } from 'react-native';

const BreathingComponent = () => {
  const [breathingState, setBreathingState] = useState('idle'); // idle, inhale, hold, exhale
  const circleSize = useRef(new Animated.Value(50)).current;

  const startBreathing = () => {
    setBreathingState('inhale');

    Animated.timing(circleSize, {
      toValue: 100, // Increase size to 100 during inhale
      duration: 4000, // Inhale for 4 seconds
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      setBreathingState('hold');

      setTimeout(() => {
        setBreathingState('exhale');

        Animated.timing(circleSize, {
          toValue: 50, // Decrease size to 50 during exhale
          duration: 4000, // Exhale for 4 seconds
          easing: Easing.linear,
          useNativeDriver: false,
        }).start(() => {
          setBreathingState('idle');
        });
      }, 4000); // Hold for 4 seconds
    });
  };

  const stopBreathing = () => {
    Animated.timing(circleSize).stop();
    setBreathingState('idle');
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity onPress={breathingState === 'idle' ? startBreathing : stopBreathing}>
        <Animated.View
          style={{
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize,
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 30, color: 'white' }}>🌬️</Text>
        </Animated.View>
      </TouchableOpacity>
      <Text style={{ marginTop: 10, color: 'white' }}>
        {breathingState === 'inhale' ? 'Inhale' : breathingState === 'hold' ? 'Hold' : 'Exhale'}
      </Text>
    </View>
  );
};

export default BreathingComponent;
