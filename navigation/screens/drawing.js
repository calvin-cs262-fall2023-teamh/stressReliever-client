import React, { useState } from 'react';
import { View, StyleSheet, PanResponder, TouchableOpacity, Text, Share } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Picker } from '@react-native-picker/picker';

const DrawingScreen = () => {
  const [drawingPath, setDrawingPath] = useState('');
  const [drawing, setDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(2);
  const [pathHistory, setPathHistory] = useState([]);
  const [drawingColor, setDrawingColor] = useState('black');

  const handlePanResponderMove = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    const point = `${locationX},${locationY - 15}`;

    if (drawing) {
      setDrawingPath((prevPath) => `${prevPath} L${point}`);
    } else {
      setDrawingPath((prevPath) => (prevPath === '' ? `M${point}` : `${prevPath} L${point}`));
      setDrawing(true);
    }
  };

  const handlePanResponderRelease = () => {
    setDrawing(false);
    if (drawingPath) {
      // Create a new path with the current color and append it to the history
      const updatedPath = `${drawingPath}`;
      setPathHistory([...pathHistory, { path: updatedPath, color: drawingColor }]);
    }
    setDrawingPath('');
  };

  const clearCanvas = () => {
    setDrawingPath('');
    setDrawing(false);
    setPathHistory([]);
  };

  const undoLastAction = () => {
    if (pathHistory.length > 0) {
      const updatedHistory = [...pathHistory];
      updatedHistory.pop();
      setPathHistory(updatedHistory);
    }
  };

  const shareDrawing = async () => {
    const currentPath = pathHistory.map((item) => item.path).join(' ');
    if (currentPath) {
      try {
        await Share.share({
          message: currentPath,
          title: 'Share Drawing',
        });
      } catch (error) {
        console.error('Error sharing the drawing:', error);
      }
    }
  };

  const handleColorChange = (color) => {
    setDrawingColor(color);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: handlePanResponderMove,
    onPanResponderRelease: handlePanResponderRelease,
  });

  return (
    <View style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
      <Svg width="100%" height="100%">
        {/* Render each path in the history with its respective color */}
        {pathHistory.map((item, index) => (
          <Path key={index} d={item.path} stroke={item.color} strokeWidth={brushSize} fill="transparent" />
        ))}
        {/* Render the current drawing path with the selected color */}
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
        <Picker
          selectedValue={drawingColor}
          onValueChange={(itemValue, itemIndex) => handleColorChange(itemValue)}
          style={[styles.picker, { backgroundColor: drawingColor }]}
        >
          <Picker.Item label="Red" value="red" />
          <Picker.Item label="Blue" value="blue" />
          <Picker.Item label="Yellow" value="yellow" />
          <Picker.Item label="Orange" value="orange" />
          <Picker.Item label="Green" value="green" />
          <Picker.Item label="Purple" value="purple" />
          <Picker.Item label="Black" value="black" />
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
    bottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 3,
    paddingHorizontal: 3,
    borderRadius: 10,
    marginHorizontal: 3,
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
