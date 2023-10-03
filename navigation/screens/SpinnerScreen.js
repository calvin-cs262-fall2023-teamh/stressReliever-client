import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import FidgetSpinner from '../../fidgetComponents/Spinner';

export default function SpinnerScreen({ navigation }) {
  return (
      <View style={styles.container}>
        <FidgetSpinner />
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
