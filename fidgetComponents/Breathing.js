import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, Animated, Easing, Modal, StyleSheet, TouchableHighlight } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BreathingComponent = () => {
  const [breathingState, setBreathingState] = useState('idle'); // idle, inhale, hold, exhale
  const circleSize = useRef(new Animated.Value(50)).current;
  const [modalVisible, setModalVisible] = useState(false);

  const startBreathing = () => {
    setBreathingState('inhale');

    Animated.timing(circleSize, {
      toValue: 100, // Increase size to 100 during inhale
      duration: 4000, // Inhale for 4 seconds
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      setBreathingState('hold');

      setTimeout(() => {
        setBreathingState('exhale');

        Animated.timing(circleSize, {
          toValue: 50, // Decrease size to 50 during exhale
          duration: 4000, // Exhale for 4 seconds
          easing: Easing.linear,
          useNativeDriver: false,
        }).start(() => {
          setBreathingState('idle');
        });
      }, 4000); // Hold for 4 seconds
    });
  };

  const stopBreathing = () => {
    Animated.timing(circleSize).stop();
    setBreathingState('idle');
  };

  const handleInformationPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const styles = StyleSheet.create({
    infoButton: {
      position: 'absolute',
      top: 10,
      right: 10,
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
    helpText: {
      textAlign: 'center',
      fontSize: 18,
      marginTop: 20,
    },
  });

  return (
    <View style={{ alignItems: 'center' }}>
      {/* Help Icon Button */}
      <TouchableOpacity onPress={handleInformationPress} style={styles.infoButton}>
        <MaterialCommunityIcons name="information" size={24} color="white" />
      </TouchableOpacity>

      {/* Modal for displaying help message */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.helpText}>
              This is a breathing exercise component. Tap the circle to start and stop the breathing animation.
            </Text>
            <TouchableHighlight style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      {/* Breathing Circle */}
      <TouchableOpacity onPress={breathingState === 'idle' ? startBreathing : stopBreathing}>
        <Animated.View
          style={{
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize,
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 30, color: 'white' }}>🌬️</Text>
        </Animated.View>
      </TouchableOpacity>
      <Text style={{ marginTop: 10, color: 'white' }}>
        {breathingState === 'inhale' ? 'Inhale' : breathingState === 'hold' ? 'Hold' : 'Exhale'}
      </Text>
    </View>
  );
};

export default BreathingComponent;