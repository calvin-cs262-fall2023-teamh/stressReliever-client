import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AchievementsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Achievements will be displayed here soon!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Consider using a theme variable
  },
  text: {
    fontSize: 18,
    color: 'white', // Consider using a theme variable
  },
});

export default AchievementsScreen;
