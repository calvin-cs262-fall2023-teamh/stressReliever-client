import React, { useState, useEffect } from 'react';
import { View, StyleSheet, PanResponder, TouchableOpacity, Text, Share } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Picker } from '@react-native-picker/picker'; // Import Picker from @react-native-picker/picker

const colorChangeInterval = 3000; // Change color every 500 nanoseconds
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const DrawingScreen = () => {
  const [path, setPath] = useState('');
  const [drawingPath, setDrawingPath] = useState('');
  const [drawing, setDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(2); // Initial brush size
  const [pathHistory, setPathHistory] = useState([]);
  const [drawingColor, setDrawingColor] = useState('black'); // Added drawingColor state
  const [randomBackgroundColor, setRandomBackgroundColor] = useState(getRandomColor());

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
    const updatedPath = path + drawingPath;
    setPath(updatedPath);
    setPathHistory([...pathHistory, updatedPath]);
    setDrawingPath('');
  };

  const clearCanvas = () => {
    setPath('');
    setDrawingPath('');
    setDrawing(false);
    setPathHistory([]);
  };

  const undoLastAction = () => {
    if (pathHistory.length > 0) {
      const updatedHistory = [...pathHistory];
      updatedHistory.pop(); // Remove the last path
      setPathHistory(updatedHistory);
      setPath(updatedHistory[updatedHistory.length - 1] || ''); // Update path
    }
  };

  const shareDrawing = async () => {
    if (path) {
      try {
        const shareResult = await Share.share({
          message: path,
          title: 'Share Drawing',
        });
      } catch (error) {
        console.error('Error sharing the drawing:', error);
      }
    }
  };

  useEffect(() => {
    const colorInterval = setInterval(() => {
      const backgroundRandomColor = getRandomColor();
      setRandomBackgroundColor(backgroundRandomColor);

      // Update the drawing color with a random color
      const randomDrawingColor = getRandomColor();
      setDrawingColor(randomDrawingColor);
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
    <View style={[styles.container, { backgroundColor: randomBackgroundColor }]}>
      <Svg width="100%" height="100%">
        <Path d={path} stroke={drawingColor} strokeWidth={brushSize} fill="transparent" />
        <Path d={drawingPath} stroke={drawingColor} strokeWidth={brushSize} fill="transparent" />
      </Svg>
      <View {...panResponder.panHandlers} style={styles.canvas} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={clearCanvas} style={styles.button}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={undoLastAction} style={styles.button}>
          <Text style={styles.buttonText}>Undo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={shareDrawing} style={styles.button}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
        <Picker // Use @react-native-picker/picker
          selectedValue={brushSize}
          onValueChange={(itemValue, itemIndex) => setBrushSize(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Brush Size: 2" value={2} />
          <Picker.Item label="Brush Size: 4" value={4} />
          <Picker.Item label="Brush Size: 6" value={6} />
          <Picker.Item label="Brush Size: 8" value={8} />
          <Picker.Item label="Brush Size: 10" value={10} />
        </Picker>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  picker: {
    width: 150,
  },
});

export default DrawingScreen;
