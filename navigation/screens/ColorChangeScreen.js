import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
    View, 
    TouchableOpacity, 
    Text, 
    StyleSheet 
} from 'react-native';
import ColorChange from '../../fidgetComponents/ColorChange';

export default function ColorChangeScreen({ navigation }) {
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
