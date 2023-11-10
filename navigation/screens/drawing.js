import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  TouchableOpacity,
  Text,
  Share,
  Dimensions,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const colorChangeInterval = 5000; 

const getRandomColor = () => {
  const getRandomValue = () => Math.floor(Math.random() * 256);
  const red = getRandomValue();
  const green = getRandomValue();
  const blue = getRandomValue();
  return `rgb(${red},${green},${blue})`;
};

const DrawingScreen = () => {
  const [path, setPath] = useState('');
  const [drawingPath, setDrawingPath] = useState('');
  const [drawing, setDrawing] = useState(false);
  const navigation = useNavigation();
  const [brushSize, setBrushSize] = useState(2);
  const [pathHistory, setPathHistory] = useState([]);
  const [drawingColor, setDrawingColor] = useState('black');
  const [backgroundColor, setBackgroundColor] = useState(getRandomColor());

  const handlePanResponderMove = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    const point = `${locationX},${locationY - 15}`;

    if (drawing) {
      setDrawingPath((prevPath) => `${prevPath} L${point}`);
    } else {
      setDrawingPath((prevPath) =>
        prevPath === '' ? `M${point}` : `${prevPath} L${point}`
      );
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
      updatedHistory.pop();
      setPathHistory(updatedHistory);
      setPath(updatedHistory[updatedHistory.length - 1] || '');
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

  const saveDrawing = async () => {
    if (path) {
      try {
        const shareResult = await Share.share({
          message: path,
          title: 'Save Drawing',
        });
      } catch (error) {
        console.error('Error saving the drawing:', error);
      }
    }
  };

  useEffect(() => {
    const colorInterval = setInterval(() => {
      setBackgroundColor(getRandomColor());
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
    <View style={[styles.container, { backgroundColor: 'white' }]}>
      <Svg width={Dimensions.get('window').width} height={Dimensions.get('window').height}>
        <Path d={path} stroke={drawingColor} strokeWidth={brushSize} fill="transparent" />
        <Path d={drawingPath} stroke={drawingColor} strokeWidth={brushSize} fill="transparent" />
      </Svg>
      <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
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
        <TouchableOpacity onPress={saveDrawing} style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <Picker
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
    bottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 3,
    paddingHorizontal: 3,
    borderRadius: 5,
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
  backIcon: {
    position: 'absolute',
    top: 5,
    left: 5,
  },
});

export default DrawingScreen;
