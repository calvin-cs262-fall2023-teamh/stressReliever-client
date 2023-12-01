import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RoundButtonToolbox from '../../fidgetComponents/buttons';
import FidgetSpinner from '../../fidgetComponents/Spinner';
import VentScreen from '../../fidgetComponents/Vent';
import BreathingTool from '../../fidgetComponents/BreathingTool';
import ToolSquare from '../../fidgetComponents/switch';
import Joystick from '../../fidgetComponents/joyStick';
import VentingTool from '../../fidgetComponents/VentingTool';
import DarkModeContext from '../../color/DarkModeContext';

const ToolScreen = () => {
  const { darkMode } = useContext(DarkModeContext);
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: darkMode ? '#000000' : '#FFFFFF',
    },
    toolsWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '100%',
      paddingHorizontal: 5,
    },
    section: {
      margin: 5,
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
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    columnContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 60,
    },
    firstRowContainer: {
      marginTop:20, // Increase this value to move the first row down more
    },
    secondRowContainer: {
      marginTop: 60, // Increase this value to move the second row down more
    },
  });

  return (
    <View style={styles.container}>
      {/* Top Row: Breathing, Text, and FidgetSpinner components */}
      <View style={[styles.rowContainer, styles.firstRowContainer]}>
        <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('Breathing')}>
          <BreathingTool />
        </TouchableOpacity>
        <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('Venting')}>
          <VentingTool />
        </TouchableOpacity>
        <FidgetSpinner />
      </View>
      {/* Second Row: Buttons and ToolSquares */}
      <View style={[styles.rowContainer, styles.secondRowContainer]}>
        <RoundButtonToolbox />
        <ToolSquare title="Tool 1" size={{ width: 70, height: 170 }} backgroundColor={'#191b1c'} />
        <ToolSquare title="Tool 2" size={{ width: 70, height: 170 }} backgroundColor={'#191b1c'} />
      </View>
      {/* Joystick positioned towards the bottom */}
      <View style={[styles.columnContainer, styles.bottomContainer]}>
        <Joystick />
      </View>
    </View>
  );
};

export default ToolScreen;
