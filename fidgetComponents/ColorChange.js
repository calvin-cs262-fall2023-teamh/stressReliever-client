import React, { useState, useEffect } from 'react';
import { Animated, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ColorChange = () => {
  // Animated value for color transition
  const [animatedValue] = useState(new Animated.Value(0));
  // Current color index
  const [colorIndex, setColorIndex] = useState(0);
  
  // List of colors to transition between
  const colors = [
    'rgb(123,104,238)',
    'rgb(255,105,180)',
    'rgb(50,205,50)',
    'rgb(255,165,0)',
    'rgb(64,224,208)'
  ];

  // Start the color transition animation when colorIndex changes
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, [colorIndex]);

  // Update color index when button is pressed
  const handlePress = () => {
    setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
  };

  // Define the color transition style using interpolation
  const animatedStyle = {
    backgroundColor: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [colors[colorIndex], colors[(colorIndex + 1) % colors.length]],
    }),
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {/* Button to trigger color transition */}
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Press Me</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Component styles
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

// Export the ColorChange component
export default ColorChange;
