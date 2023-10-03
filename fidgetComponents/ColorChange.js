import React, { useState, useEffect } from 'react';
import { Animated, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ColorChange = () => {
  const [animatedValue] = useState(new Animated.Value(0));
  const [colorIndex, setColorIndex] = useState(0);
  
  const colors = [
    'rgb(123,104,238)',
    'rgb(255,105,180)',
    'rgb(50,205,50)',
    'rgb(255,165,0)',
    'rgb(64,224,208)'
  ];

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, [colorIndex]);

  const handlePress = () => {
    setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
  };

  const animatedStyle = {
    backgroundColor: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [colors[colorIndex], colors[(colorIndex + 1) % colors.length]],
    }),
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Press Me</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FFF',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    elevation: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ColorChange;
