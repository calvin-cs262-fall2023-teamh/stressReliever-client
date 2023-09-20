// App.js

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import FidgetToy from './src/components/FidgetToy';

export default function App() {
  return (
    <View style={styles.container}>
      <FidgetToy />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

