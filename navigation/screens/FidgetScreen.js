import React, { useContext, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RoundButtonToolbox from '../../fidgetComponents/buttons';
import FidgetSpinner from '../../fidgetComponents/Spinner';
import BreathingTool from '../../fidgetComponents/BreathingTool';
import ToolSquare from '../../fidgetComponents/switch';
import Joystick from '../../fidgetComponents/joyStick';
import VentingTool from '../../fidgetComponents/VentingTool'; // Import VentingTool
import DarkModeContext from '../../color/DarkModeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import MaterialCommunityIcons

const ToolScreen = () => {
  const { darkMode } = useContext(DarkModeContext);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const displayHelpMessage = () => {
    setModalVisible(true);
  };

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
    firstRowContainer: {
      marginTop: 30,
    },
    secondRowContainer: {
      marginTop: 20,
    },
    bottomContainer: {
      marginTop: 20,
    },
    infoButton: {
      position: 'absolute',
      top: 10,
      right: 20,
    },
    infoIcon: {
      color: 'white',
      fontSize: 24,
    },
    helpText: {
      textAlign: 'center',
      fontSize: 18,
      marginTop: 20,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      elevation: 5,
    },
    closeButton: {
      marginTop: 20,
      padding: 10,
      backgroundColor: 'lightblue',
      borderRadius: 5,
    },
    closeButtonText: {
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.infoButton} onPress={displayHelpMessage}>
        <MaterialCommunityIcons name="information" style={styles.infoIcon} />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.helpText}>This is the fidget page. You can navigate to the breathing & venting tool by tapping on the boxes. You are also able to use the fidget tools like the buttons, switches, and joystick.</Text>
            <TouchableHighlight
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      {/* Rest of your components */}
      <View style={[styles.rowContainer, styles.firstRowContainer]}>
        <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('Breathing')}>
          <BreathingTool />
        </TouchableOpacity>
        <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('Venting')}>
          {/* VentingTool component */}
          <VentingTool />
        </TouchableOpacity>
        <FidgetSpinner />
      </View>
      <View style={[styles.rowContainer, styles.secondRowContainer]}>
        <RoundButtonToolbox />
        <ToolSquare title="Tool 1" size={{ width: 80, height: 170 }} backgroundColor={'#191b1c'} />
        <ToolSquare title="Tool 2" size={{ width: 80, height: 170 }} backgroundColor={'#191b1c'} />
      </View>
      <View style={[styles.columnContainer, styles.bottomContainer]}>
        <Joystick />
      </View>
    </View>
  );
};

export default ToolScreen;
