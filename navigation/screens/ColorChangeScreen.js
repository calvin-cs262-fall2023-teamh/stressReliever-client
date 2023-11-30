import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import ColorChange from '../../fidgetComponents/ColorChange';

export default function ColorChangeScreen() {
    return (
        <View style={styles.container}>
          <ColorChange />
          <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
});
