import React, { useState } from 'react';
import { View, PanResponder, StyleSheet, Animated } from 'react-native';

const DualJoystickContainer = () => {
  const [joystick1Position] = useState(new Animated.ValueXY({ x: 0, y: 0 }));
  const [joystick2Position] = useState(new Animated.ValueXY({ x: 0, y: 0 }));

  const handleMove1 = (event, gesture) => {
    const { dx, dy } = gesture;
    const newX = Math.min(75, Math.max(-75, dx));
    const newY = Math.min(75, Math.max(-75, dy));
    joystick1Position.setValue({ x: newX, y: newY });
  };

  const handleMove2 = (event, gesture) => {
    const { dx, dy } = gesture;
    const newX = Math.min(75, Math.max(-75, dx));
    const newY = Math.min(75, Math.max(-75, dy));
    joystick2Position.setValue({ x: newX, y: newY });
  };

  const panResponder1 = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: joystick1Position.x,
          dy: joystick1Position.y,
        },
      ],
      { listener: handleMove1, useNativeDriver: false }
    ),
  });

  const panResponder2 = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: joystick2Position.x,
          dy: joystick2Position.y,
        },
      ],
      { listener: handleMove2, useNativeDriver: false }
    ),
  });

  return (
    <View style={styles.container}>
      <View style={[styles.joystickContainer, { marginRight: 50 }]} {...panResponder1.panHandlers}>
        <Animated.View
          style={[
            styles.joystick,
            {
              transform: [
                { translateX: joystick1Position.x },
                { translateY: joystick1Position.y },
              ],
            },
          ]}
        />
      </View>
      <View style={styles.joystickContainer} {...panResponder2.panHandlers}>
        <Animated.View
          style={[
            styles.joystick,
            {
              transform: [
                { translateX: joystick2Position.x },
                { translateY: joystick2Position.y },
              ],
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    marginTop: 10,
    backgroundColor: '#333333',
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
});

export default DualJoystickContainer;
