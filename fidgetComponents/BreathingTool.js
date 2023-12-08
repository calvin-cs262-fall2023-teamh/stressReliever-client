// Import React and necessary components from 'react-native'
import React from 'react';
import { View, StyleSheet } from 'react-native';
// Importing MaterialCommunityIcons for icon usage
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Functional component BreathingTool
const BreathingTool = () => {
  // The return statement renders the component UI
  return (
    <View style={styles.toolContainer}>
      <MaterialCommunityIcons name="weather-windy" size={40} color="white" />
    </View>
  );
};

// StyleSheet for the component
const styles = StyleSheet.create({
  toolContainer: {
    backgroundColor: '#263238',
    padding: 40,
    borderRadius: 10,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Removed unused styles for cleaner code
});

// Exporting BreathingTool for use in other parts of the application
export default BreathingTool;
