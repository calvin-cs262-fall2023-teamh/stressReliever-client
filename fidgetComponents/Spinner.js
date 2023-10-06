import React, { useState, useEffect } from 'react';
import { Animated, TouchableOpacity, StyleSheet, View } from 'react-native';

const FidgetSpinner = () => {
  // Declare animated value for rotation
  const [animatedValue] = useState(new Animated.Value(0));

  // Start the rotation animation when the component is mounted
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
      repeat: -1, // Infinite rotation
    }).start();
  }, []);

  // Define the rotation style using interpolation
  const spinnerStyle = {
    transform: [
      {
        rotate: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      {/* Render the animated spinner */}
      <Animated.View style={[styles.spinner, spinnerStyle]} />
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    width: 200,
    height: 200,
    borderStyle: 'solid',
    borderTopWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftWidth: 10,
    borderTopColor: '#3498db',
    borderRightColor: '#e74c3c',
    borderBottomColor: '#f39c12',
    borderLeftColor: '#e74c3c',
    borderRadius: 100,
  },
});

// Export the FidgetSpinner component
export default FidgetSpinner;
