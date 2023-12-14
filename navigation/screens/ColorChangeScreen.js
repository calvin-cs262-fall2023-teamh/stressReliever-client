import React, { useState } from 'react';
import { View, StyleSheet, Modal, TouchableHighlight, TouchableOpacity, Text, StatusBar } from 'react-native';
import ColorChange from '../../fidgetComponents/ColorChange';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ColorChangeScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const displayHelpMessage = () => {
    setModalVisible(true);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    infoButton: {
      position: 'absolute',
      top: 40,
      right: 20,
      zIndex: 10,
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
      marginTop: 22,
    },
    modalContent: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
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
      <ColorChange />
      <StatusBar style="auto" />

      {/* Help Button */}
      <TouchableOpacity style={styles.infoButton} onPress={displayHelpMessage}>
        <MaterialCommunityIcons name="information" style={styles.infoIcon} />
      </TouchableOpacity>

      {/* Help Modal */}
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
            <Text style={styles.helpText}>
              This is the Color Change page. Tap anywhere to see a fluid color change animation. The animation responds to your taps with a visual and haptic feedback.
            </Text>
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
    </View>
  );
}
