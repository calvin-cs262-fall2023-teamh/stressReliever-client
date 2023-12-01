import React, { useRef } from 'react';
import { View, PanResponder, StyleSheet, Animated, Vibration } from 'react-native';

const Joystick = () => {
  const position1 = useRef(new Animated.ValueXY()).current;
  const position2 = useRef(new Animated.ValueXY()).current;

  const handleMove1 = (_, gesture) => {
    const { dx, dy } = gesture;
    const newX = Math.min(75, Math.max(-75, dx));
    const newY = Math.min(75, Math.max(-75, dy));
    position1.setValue({ x: newX, y: newY });
    // Trigger haptic feedback
    Vibration.vibrate();
  };

  const handleMove2 = (_, gesture) => {
    const { dx, dy } = gesture;
    const newX = Math.min(75, Math.max(-75, dx));
    const newY = Math.min(75, Math.max(-75, dy));
    position2.setValue({ x: newX, y: newY });
    // Trigger haptic feedback
    Vibration.vibrate();
  };

  const handleRelease = (position) => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const panResponder1 = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: position1.x,
          dy: position1.y,
        },
      ],
      { listener: handleMove1, useNativeDriver: false }
    ),
    onPanResponderRelease: () => handleRelease(position1),
  });

  const panResponder2 = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: position2.x,
          dy: position2.y,
        },
      ],
      { listener: handleMove2, useNativeDriver: false }
    ),
    onPanResponderRelease: () => handleRelease(position2),
  });

  return (
    <View style={styles.toolContainer}>
      <View style={styles.container}>
        <View style={[styles.joystickContainer, styles.marginRight]} {...panResponder1.panHandlers}>
          <Animated.View
            style={[
              styles.joystick,
              {
                transform: position1.getTranslateTransform(),
              },
            ]}
          />
        </View>
        <View style={styles.joystickContainer} {...panResponder2.panHandlers}>
          <Animated.View
            style={[
              styles.joystick,
              {
                transform: position2.getTranslateTransform(),
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toolContainer: {
    backgroundColor: '#263238',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 140,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  joystickContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'green',
  },
  joystick: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    position: 'absolute',
  },
  marginRight: {
    marginRight: 20,
  },
});

export default Joystick;
