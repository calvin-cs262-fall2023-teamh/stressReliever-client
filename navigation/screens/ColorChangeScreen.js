import * as React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import ColorChange from '../../fidgetComponents/ColorChange';

export default function ColorChangeScreen({ navigation }) {
    // Use navigation as needed

    return (
        <View style={styles.container}>
          <ColorChange />
          <StatusBar style="auto" />
        </View>
    );
}

ColorChangeScreen.propTypes = {
  navigation: PropTypes.object, // Validate navigation prop
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
});
