import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, PanResponder, TouchableOpacity, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const rainbowColors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];
const colorChangeInterval = 3000;

const DrawingScreen = () => {
  const [path, setPath] = useState('');
  const [drawingPath, setDrawingPath] = useState('');
  const [drawing, setDrawing] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  const drawingColor = rainbowColors[colorIndex];
  const backgroundColor = rainbowColors[(colorIndex + 4) % rainbowColors.length];
  const colorIndexRef = useRef(colorIndex);

  const handlePanResponderMove = (event, gestureState) => {
    const { moveX, moveY } = gestureState;
    const point = `${moveX},${moveY}`;

    if (drawing) {
      setDrawingPath((prevPath) => `${prevPath} L${point}`);
    } else {
      setDrawingPath((prevPath) => (prevPath === '' ? `M${point}` : `${prevPath} L${point}`));
      setDrawing(true);
    }
  };

  const handlePanResponderRelease = () => {
    setDrawing(false);
    setPath((prevPath) => prevPath + drawingPath);
    setDrawingPath('');
  };

  const clearCanvas = () => {
    setPath('');
    setDrawingPath('');
    setDrawing(false);
  };

  useEffect(() => {
    const colorInterval = setInterval(() => {
      colorIndexRef.current = (colorIndexRef.current + 1) % rainbowColors.length;
      setColorIndex(colorIndexRef.current);
    }, colorChangeInterval);

    return () => {
      clearInterval(colorInterval);
    };
  }, []);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: handlePanResponderMove,
    onPanResponderRelease: handlePanResponderRelease,
  });

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Svg width="100%" height="100%">
        <Path d={path} stroke={drawingColor} strokeWidth="2" fill="transparent" />
        <Path d={drawingPath} stroke={drawingColor} strokeWidth="2" fill="transparent" />
      </Svg>
      <View {...panResponder.panHandlers} style={styles.canvas} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={clearCanvas} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear</Text>
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
  },
  canvas: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
  },
  clearButton: {
    marginTop: 10,
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default DrawingScreen;
