import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Animated, Easing, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const VentingTool = () => {
  const [message, setMessage] = useState('');
  const [sentMessage, setSentMessage] = useState('');
  const moveAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (sentMessage !== '') {
      // Trigger message sent animation
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
        toValue: -1000, // Change to the value off the screen
        duration: 3000, // Adjust duration as needed
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Animation completed, reset message state
      setMessage('');
      setSentMessage('');
      moveAnim.setValue(0);
      scaleAnim.setValue(0);
    });
  };

  const handleSend = () => {
    // Logic to handle sending the message goes here
    console.log('Message sent:', message);

    // Set the sent message to trigger the animation
    setSentMessage(message);
  };

  const handleInformationPress = () => {
    // Logic to show information about the screen goes here
    // For example, you can show a modal or navigate to another screen
    // For demonstration purposes, an alert is used here
    alert('This is a place where you can vent your emotions. Nothing you type or send will be saved anywhere');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleInformationPress} style={styles.infoButton}>
        <MaterialCommunityIcons name="information" size={24} color="white" />
      </TouchableOpacity>
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
});

export default VentingTool;
