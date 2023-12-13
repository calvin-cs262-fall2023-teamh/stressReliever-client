import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Animated, Easing, Text, Modal, TouchableHighlight } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const VentingTool = () => {
  const [message, setMessage] = useState('');
  const [sentMessage, setSentMessage] = useState('');
  const moveAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (sentMessage !== '') {
      animateMessageSent();
    }
  }, [sentMessage]);

  const animateMessageSent = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: false,
      }),
      Animated.timing(moveAnim, {
        toValue: -1000,
        duration: 3000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setMessage('');
      setSentMessage('');
      moveAnim.setValue(0);
      scaleAnim.setValue(0);
    });
  };

  const handleSend = () => {
    console.log('Message sent:', message);
    setSentMessage(message);
  };

  const handleInformationPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black', // Set the background color of the screen
      marginTop: '1%',
    },
    toolContainer: {
      flexDirection: 'row',
      backgroundColor: '#263238',
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
    },
    input: {
      height: 40,
      width: '70%',
      borderColor: 'gray',
      borderWidth: 1,
      paddingLeft: 10,
      marginRight: 10,
      color: 'white', // Set text color of the input field
    },
    sentMessageContainer: {
      position: 'absolute',
      top: 50, // Adjust the initial position
      justifyContent: 'center',
      alignItems: 'center',
    },
    sentMessageBubble: {
      backgroundColor: 'lightblue',
      borderRadius: 20,
      padding: 10,
    },
    sentMessageText: {
      fontSize: 16,
      color: 'black',
    },
    infoButton: {
      position: 'absolute',
      top: 10,
      right: 10,
    },

    // Modal styles
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
    <View style={styles.container}>
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
              This is a place where you can vent your emotions. Nothing you type or send will be saved anywhere.
            </Text>
            <TouchableHighlight style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      {/* Remaining tool components */}
      <View style={styles.toolContainer}>
        <TextInput
          style={styles.input}
          placeholder="Vent here..."
          onChangeText={(text) => setMessage(text)}
          value={message}
          placeholderTextColor="white" // Text color in the input field
          selectionColor="white" // Selection color in the input field
          color="white" // Text color of the input value
          backgroundColor="black" // Background color of the input field
        />
        <TouchableOpacity onPress={handleSend}>
          <MaterialCommunityIcons name="send" size={24} color="#87CEFA" />
        </TouchableOpacity>
      </View>
      {sentMessage !== '' && (
        <Animated.View
          style={[
            styles.sentMessageContainer,
            {
              transform: [{ translateY: moveAnim }],
              opacity: scaleAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ]}
        >
          <View style={styles.sentMessageBubble}>
            <Text style={styles.sentMessageText}>{sentMessage}</Text>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default VentingTool;
