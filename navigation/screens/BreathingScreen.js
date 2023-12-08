import React, { useState, useRef } from 'react'; // Removed useEffect from the import
import { View, TouchableOpacity, Text, Animated, Easing, StyleSheet } from 'react-native';

const BreathingTool = () => {
  const [breathingState, setBreathingState] = useState('idle'); // idle, inhale, exhale
  const [timeLeft, setTimeLeft] = useState(4); // Initial time for each inhale/exhale
  const circleSize = useRef(new Animated.Value(150)).current;

  const startBreathing = () => {
    setBreathingState('inhale');
    setTimeLeft(4);

    Animated.timing(circleSize, {
      toValue: 300, // Increase size to 300 during inhale
      duration: 4000, // Inhale for 4 seconds
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      setBreathingState('exhale');
      setTimeLeft(4);

      setTimeout(() => {
        Animated.timing(circleSize, {
          toValue: 150, // Decrease size to 150 during exhale
          duration: 4000, // Exhale for 4 seconds
          easing: Easing.linear,
          useNativeDriver: false,
        }).start(() => {
          setBreathingState('idle');
          setTimeLeft(0);
        });
      }, 4000); // No hold, directly transition from inhale to exhale
    });

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
    }, 4000); // Clear interval after 4 seconds
  };

  const stopBreathing = () => {
    Animated.timing(circleSize).stop();
    setBreathingState('idle');
    setTimeLeft(0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <Animated.View
          style={{
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize,
            backgroundColor: '#87CEFA', // Baby blue color
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={styles.breathText}>
            {breathingState === 'inhale'
              ? `Inhale: ${timeLeft} seconds`
              : breathingState === 'exhale'
              ? `Exhale: ${timeLeft} seconds`
              : 'Ready to breathe'}
          </Text>
        </Animated.View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={breathingState === 'idle' ? startBreathing : stopBreathing}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              {breathingState === 'idle' ? 'Start' : 'Stop'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  circleContainer: {
    marginBottom: 100, // Distance between the circle and button container
  },
  breathText: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50, // Adjust this value for vertical position of the button
  },
  button: {
    backgroundColor: '#87CEFA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default BreathingTool;
