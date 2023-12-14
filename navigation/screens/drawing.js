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
import RNPickerSelect from 'react-native-picker-select';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const DrawingScreen = () => {
  //const [path, setPath] = useState('');
  //const [drawingPath, setDrawingPath] = useState('');
  const [drawing, setDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(2);
  //const [pathHistory, setPathHistory] = useState([]);
  const [drawingColor] = useState('black');
  const backgroundColor = useRef(new Animated.Value(0)).current;
  const [currentDrawingPath, setCurrentDrawingPath] = useState('');
  const [drawingSessions, setDrawingSessions] = useState([]);

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

  // Help session questions and solutions
  const helpSessionQuestions = () => 
    {
      alert('Touch and drag on the screen to draw. Adjust brush size using the picker.');
    };
   


  const handlePanResponderMove = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    const point = `${locationX},${locationY + 75}`;
    
    if (drawing) {
      setCurrentDrawingPath((prevPath) => `${prevPath} L${point}`);
      } else {
        setCurrentDrawingPath((prevPath) =>
          prevPath === '' ? `M${point}` : `${prevPath} L${point}`
        );
        setDrawing(true);
      }
    };
    

  const handlePanResponderRelease = () => {
    setDrawing(false);
  const updatedSession = { path: currentDrawingPath, brushSize };
  setDrawingSessions([...drawingSessions, updatedSession]);
  setCurrentDrawingPath('');
  };

  const clearCanvas = () => {
    setDrawing(false);
    setCurrentDrawingPath('');
    setDrawingSessions([]);
  };

  const undoLastAction = () => {
    if (drawingSessions.length > 0) {
      const updatedSessions = [...drawingSessions];
      updatedSessions.pop();
      setDrawingSessions(updatedSessions);
    }
  };

  const shareOrSaveDrawing = async () => {
    if (drawingSessions.length > 0) {
      if (Platform.OS === 'ios') {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options: ['Share with others', 'Save', 'Cancel'],
            cancelButtonIndex: 2,
          },
          (buttonIndex) => {
            handleShareOrSaveActionSheetButton(buttonIndex);
          }
        );
      } else if (Platform.OS === 'android') {
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
      } else {
        // For web or other platforms without navigator.share
        try {
          const drawingText = drawingSessions.map((session) => session.path).join('\n');
          await Share.share({
            title: 'Share Drawing',
            message: `Check out my drawing:\n${drawingText}`,
          });
        } catch (error) {
          console.error('Error sharing the drawing:', error);
          // Handle the error or provide feedback to the user
        }
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
        message: currentDrawingPath, // Change 'path' to 'currentDrawingPath'
        title: 'Share Drawing',
      });
    } catch (error) {
      console.error('Error sharing the drawing:', error);
    }
  };
  
  const saveDrawing = () => {
    if (currentDrawingPath) {
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
          {drawingSessions.map((session, index) => (
            <Path
              key={index}
              d={session.path}
              stroke={drawingColor}
              strokeWidth={session.brushSize}
              fill="transparent"
            />
          ))}
          <Path d={currentDrawingPath} stroke={drawingColor} strokeWidth={brushSize} fill="transparent" />
        </Svg>

      <TouchableOpacity onPress={helpSessionQuestions} style={[styles.helpIcon, { zIndex: 2 }]}>
        <MaterialCommunityIcons name="information" size={30} color="white" />
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
        <RNPickerSelect
            onValueChange={(itemValue) => setBrushSize(itemValue)}
            items={[
              { label: 'Brush Size: 2', value: 2 },
              { label: 'Brush Size: 4', value: 4 },
              { label: 'Brush Size: 6', value: 6 },
              { label: 'Brush Size: 8', value: 8 },
              { label: 'Brush Size: 10', value: 10 },
            ]}
            style={{
              inputIOS: {
                height: 40,
                width: 150,
                fontSize: 16,
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 5,
                backgroundColor: 'black',
                color: 'white',
              },
              inputAndroid: {
                height: 40,
                width: 150,
                fontSize: 16,
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 5,
                backgroundColor: 'black',
                color: 'white',
              },
            }}
            value={brushSize}
          />

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
  helpIcon: {
    position: 'absolute',
    top: 5,
    right: 5, 
  },
  helpSessionContainer: {
    position: 'absolute',
    top: 50,
    left: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    elevation: 5, // For Android shadow
  },
  helpSessionText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default DrawingScreen;
