import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AchievementsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Achievements will be available soon!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  text: {
    fontSize: 18,
    color: '#555',
  },
});

export default AchievementsScreen;
