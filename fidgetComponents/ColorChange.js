import React, { useState, useEffect } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
//import * as Haptics from 'expo-haptics';

const ColorChange = () => {
  // Animated value for color transition
  const [animatedValue] = useState(new Animated.Value(0));
  // Current color index
  const [colorIndex, setColorIndex] = useState(0);
  const [circleScale] = useState(new Animated.Value(0));
  const [tapPosition, setTapPosition] = useState({ x: 0, y: 0 });
  
  
  // List of colors to transition between

  // List of colors to transition between
  const colors = [
    'rgb(123,104,238)',
    'rgb(255,105,180)',
    'rgb(50,205,50)',
    'rgb(255,165,0)',
    'rgb(64,224,208)',
    'rgb(255,218,185)',
    'rgb(255,99,71)',
    'rgb(100,149,237)',
    'rgb(255,20,147)',
    'rgb(50,205,50)'
  ];

  // Start the color transition animation when colorIndex changes
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, [colorIndex]);

  const handlePress = (e) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const { locationX, locationY } = e.nativeEvent;
    setTapPosition({ x: locationX, y: locationY });

    circleScale.setValue(0);  // Reset circle scale
    Animated.timing(circleScale, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
      animatedValue.setValue(0);  // Reset background color animation
    });
  };

  // Define the color transition style using interpolation
  const animatedStyle = {
    backgroundColor: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [colors[colorIndex], colors[(colorIndex + 1) % colors.length]],
    }),
  };

  const circleStyle = {
    transform: [{ scale: circleScale }],
    position: 'absolute',
    top: tapPosition.y - 1000,
    left: tapPosition.x - 1000, 
    width: 2000, 
    height: 2000,
    borderRadius: 1000,
    backgroundColor: colors[(colorIndex + 1) % colors.length],
    opacity: 0.6
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]} onStartShouldSetResponder={() => true} onResponderRelease={handlePress}>
      <Animated.View style={circleStyle} />
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
