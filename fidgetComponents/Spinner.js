import React, { useState, useEffect } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

const FidgetSpinner = () => {
  const [animatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
      repeat: -1,
    }).start();
  }, []);

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
    <View style={styles.toolContainer}>
      <Animated.View style={[styles.spinner, spinnerStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  toolContainer: {
    backgroundColor: '#263238', // Set background color to pink
    padding: 40,
    borderRadius: 10,
    marginBottom: 10,
    width: 115,
    height: 125,
    marginTop: 10,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    width: 105,
    height: 105,
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

export default FidgetSpinner;
