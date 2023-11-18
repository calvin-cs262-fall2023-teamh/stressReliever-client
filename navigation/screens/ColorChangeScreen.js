import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native'; // Removed unused imports
import ColorChange from '../../fidgetComponents/ColorChange';

export default function ColorChangeScreen({ navigation }) {
    // If use navigation, add PropTypes validation here
    // Otherwise, you can remove 'navigation' from the parameters

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

// Optional: If using 'navigation', add PropTypes validation
// ColorChangeScreen.propTypes = {
//   navigation: PropTypes.object,
// };
