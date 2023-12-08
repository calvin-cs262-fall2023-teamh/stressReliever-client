import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  TouchableOpacity,
  Text,
  Share,
  Dimensions,
  Animated,
  Platform,
  ActionSheetIOS,
  Alert,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const DrawingScreen = () => {
  const [path, setPath] = useState('');
  const [drawingPath, setDrawingPath] = useState('');
  const [drawing, setDrawing] = useState(false);
  const navigation = useNavigation();
  const [brushSize, setBrushSize] = useState(2);
  const [pathHistory, setPathHistory] = useState([]);
  const [drawingColor] = useState('black');
  const backgroundColor = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const backgroundChangeInterval = setInterval(() => {
      Animated.timing(backgroundColor, {
        toValue: (backgroundColor._value + 1) % 11,
        duration: 15000, // 15 seconds for the transition 
        useNativeDriver: false,
      }).start();
    }, 15000); // Repeat every 15 seconds

    return () => clearInterval(backgroundChangeInterval);
  }, [backgroundColor]);

  const handlePanResponderMove = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    const point = `${locationX},${locationY + 75}`;

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

  const shareOrSaveDrawing = async () => {
    if (path) {
      const options = Platform.select({
        ios: ['Share with others', 'Save', 'Cancel'],
        android: ['Share with others', 'Save', 'Cancel'],
      });

      if (Platform.OS === 'ios') {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options,
            cancelButtonIndex: 2,
          },
          (buttonIndex) => {
            handleShareOrSaveActionSheetButton(buttonIndex);
          }
        );
      } else {
        // For Android
        Alert.alert(
          'Share or Save Drawing',
          'Select an option:',
          [
            { text: 'Share with others', onPress: () => handleShareWithOthers() },
            { text: 'Save', onPress: saveDrawing },
            { text: 'Cancel', style: 'cancel' },
          ],
          { cancelable: true }
        );
      }
    }
  };

  const handleShareOrSaveActionSheetButton = (buttonIndex) => {
    switch (buttonIndex) {
      case 0:
        // Share with others
        handleShareWithOthers();
        break;
      case 1:
        // Save
        saveDrawing();
        break;
      default:
        // Cancel
        break;
    }
  };

  const handleShareWithOthers = async () => {
    try {
      await Share.share({
        message: path,
        title: 'Share Drawing',
      });
    } catch (error) {
      console.error('Error sharing the drawing:', error);
    }
  };

  const saveDrawing = () => {
    if (path) {
      // Implement save logic here
      Alert.alert('Drawing Saved', 'Your drawing has been saved.');
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: handlePanResponderMove,
    onPanResponderRelease: handlePanResponderRelease,
  });

  const interpolatedBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    outputRange: ['gold','red',  'blue', 'maroon', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown', 'cyan'],
  });

  const buttonStyle = Platform.select({
    ios: {
      height: 40,
      width: 80,
      paddingVertical: 10,
      paddingHorizontal: 10,
    },
    android: {
      paddingVertical: 5,
      paddingHorizontal: 5,
    },
    web: {
      paddingVertical: 8,
      paddingHorizontal: 8,
    },
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor: interpolatedBackgroundColor }]}>
      <Svg width={Dimensions.get('window').width} height={Dimensions.get('window').height}>
        <Path d={path} stroke={drawingColor} strokeWidth={brushSize} fill="transparent" />
        <Path d={drawingPath} stroke={drawingColor} strokeWidth={brushSize} fill="transparent" />
      </Svg>
      <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
      <View {...panResponder.panHandlers} style={styles.canvas} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={clearCanvas} style={[styles.button, buttonStyle]}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={undoLastAction} style={[styles.button, buttonStyle]}>
          <Text style={styles.buttonText}>Undo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={shareOrSaveDrawing} style={[styles.button, buttonStyle]}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
        <Picker
          selectedValue={brushSize}
          onValueChange={(itemValue) => setBrushSize(itemValue)}
          style={[styles.picker, buttonStyle]}
        >
          <Picker.Item label="Brush Size: 2" value={2} />
          <Picker.Item label="Brush Size: 4" value={4} />
          <Picker.Item label="Brush Size: 6" value={6} />
          <Picker.Item label="Brush Size: 8" value={8} />
          <Picker.Item label="Brush Size: 10" value={10} />
        </Picker>
      </View>
    </Animated.View>
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
    borderRadius: 5,
    marginHorizontal: 1,
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
