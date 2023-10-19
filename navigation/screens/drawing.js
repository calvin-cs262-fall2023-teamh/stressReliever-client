import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, PanResponder, TouchableOpacity, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Array of colors for drawing and background
const rainbowColors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];
const colorChangeInterval = 3000;

const DrawingScreen = () => {
  // State for managing paths, colors, and drawing status
  const [path, setPath] = useState('');
  const [drawingPath, setDrawingPath] = useState('');
  const [drawing, setDrawing] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  const drawingColor = rainbowColors[colorIndex];
  const backgroundColor = rainbowColors[(colorIndex + 4) % rainbowColors.length];
  
  const colorIndexRef = useRef(colorIndex);

  // Handle drawing move events
  const handlePanResponderMove = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    const point = `${locationX},${locationY -15}`;  

    if (drawing) {
      setDrawingPath((prevPath) => `${prevPath} L${point}`);
    } else {
      setDrawingPath((prevPath) => (prevPath === '' ? `M${point}` : `${prevPath} L${point}`));
      setDrawing(true);
    }
  };

  // Finalize path when drawing ends
  const handlePanResponderRelease = () => {
    setDrawing(false);
    setPath((prevPath) => prevPath + drawingPath);
    setDrawingPath('');
  };

  // Clear the drawing canvas
  const clearCanvas = () => {
    setPath('');
    setDrawingPath('');
    setDrawing(false);
  };

  // Automatically change drawing color
  useEffect(() => {
    const colorInterval = setInterval(() => {
      colorIndexRef.current = (colorIndexRef.current + 1) % rainbowColors.length;
      setColorIndex(colorIndexRef.current);
    }, colorChangeInterval);

    return () => {
      clearInterval(colorInterval);
    };
  }, []);

  // Initialize the pan responder for touch events
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