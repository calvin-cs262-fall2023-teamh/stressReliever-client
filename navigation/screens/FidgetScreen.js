import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
//import { useNavigation } from '@react-navigation/native';
import ToolSquare from '../../fidgetComponents/switch';
import RoundButtonToolbox from '../../fidgetComponents/buttons';
import FidgetSpinner from '../../fidgetComponents/Spinner';
import VentScreen from '../../fidgetComponents/Vent';
import Joystick from '../../fidgetComponents/joyStick';
import BreathingTool from '../../fidgetComponents/BreathingTool';
import DarkModeContext from '../../color/DarkModeContext';

const ToolScreen = () => {
  const { darkMode } = useContext(DarkModeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: darkMode ? '#000000' : '#FFFFFF',
    },
    text: {
      color: darkMode ? '#FFFFFF' : '#000000',
    },
    toolContainer: {
      backgroundColor: darkMode ? '#333333' : '#DDDDDD',
      padding: 40,
      borderRadius: 10,
      marginBottom: 10,
      width: 130,
      height: 140,
      marginTop: 10,
      marginRight: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    toolsWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      width: '100%',
      paddingHorizontal: 5,
    },
    ventButton: {
      backgroundColor: 'lightblue',
      width: 10,
      height: 10,
      borderRadius: 10,
      padding: 10,
      margin: 10,
      alignItems: 'center',
    },
  });

  const [isVentScreenVisible, setVentScreenVisible] = useState(false);

  const toggleVentScreen = () => {
    setVentScreenVisible(!isVentScreenVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.toolsWrapper}>
        <View style={styles.toolContainer}>
          <ToolSquare title='Tool 1' size={{ width: 110, height: 110 }} backgroundColor={'red'} />
        </View>
        <View style={styles.toolContainer}>
          < BreathingTool size={{ width: 120, height: 130 }} backgroundColor={'blue'} style={{ borderRadius: 20}} />
        </View>
        <View style={styles.toolContainer}>
          <ToolSquare title='Tool 3' size={{ width: 110, height: 110 }} backgroundColor={'green'} />
        </View>
      </View>
      <TouchableOpacity onPress={toggleVentScreen}>
        <View style={{
          backgroundColor: 'lightblue',
          borderRadius: 10,
          padding: 10,
          margin: 10,
          alignItems: 'center',
        }}>
          <Text style={{ fontSize: 18 }}>Vent here...</Text>
        </View>
      </TouchableOpacity>
      {isVentScreenVisible && <VentScreen onClose={toggleVentScreen} />}
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.toolContainer}>
          <RoundButtonToolbox />
        </View>
        <View style={styles.toolContainer}>
          <FidgetSpinner />
        </View>
      </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Joystick />
      </View>
    </View>

  );
};

export default ToolScreen;
