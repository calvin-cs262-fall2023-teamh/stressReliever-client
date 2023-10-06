import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import randomColor from "randomcolor";

// Get device dimensions
const { height, width } = Dimensions.get('window');

export default () => {
  // State for drawn paths, current path, clear button state, and stroke color
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [isClearButtonClicked, setClearButtonClicked] = useState(false);
  const [strokeColor, setStrokeColor] = useState('black');

  // Finalize the current path when touch ends
  const onTouchEnd = () => {
    paths.push(currentPath);
    setCurrentPath([]);
    setClearButtonClicked(false);
  };

  // Record path as user draws
  const onTouchMove = (event) => {
    const newPath = [...currentPath];
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;
    newPath.push(`${newPath.length === 0 ? 'M' : ''}${locationX.toFixed(0)},${locationY.toFixed(0)} `);
    setCurrentPath(newPath);
  };

  // Clear the drawing and change stroke color
  const handleClearButtonClick = () => {
    setPaths([]);
    setCurrentPath([]);
    setClearButtonClicked(true);
    setStrokeColor(randomColor());
  };

  return (
    <View style={styles.container}>
      {/* Drawing canvas */}
      <View style={styles.svgContainer} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        <Svg height={height * 0.7} width={width}>
          <Path
            d={paths.join('')}
            stroke={isClearButtonClicked ? 'transparent' : strokeColor}
            fill={'transparent'}
            strokeWidth={3}
          />
          {/* Render all the paths */}
          {paths.map((item, index) => (
            <Path
              key={`path-${index}`}
              d={currentPath.join('')}
              stroke={isClearButtonClicked ? 'transparent' : strokeColor}
              fill={'transparent'}
              strokeWidth={2}
            />
          ))}
        </Svg>
      </View>
      {/* Clear button */}
      <TouchableOpacity style={styles.clearButton} onPress={handleClearButtonClick}>
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {
    height: height * 0.7,
    width,
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
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
    fontSize: 16,
    fontWeight: 'bold',
  },
});
