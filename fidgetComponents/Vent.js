import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, Animated } from 'react-native';

const VentScreen = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const fadeAnim = useRef(new Animated.Value(1)).current;  // Initial opacity is 1

  const handleSend = () => {
    // Handle sending the message (you can implement this logic)
    console.log('Message sent:', message);

    // Animate and close the MessageScreen
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(onClose); // onClose is called after the animation is complete
  };

  useEffect(() => {
    // Optional: if you want to animate the screen when it appears
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }, [fadeAnim]);

  return (
    <TouchableOpacity onPress={handleSend}>
      <Animated.View style={{ padding: 20, backgroundColor: 'lightblue', borderRadius: 20, margin: 20, opacity: fadeAnim }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Type how you feel and then release it</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 10 }}
          placeholder="Type your message..."
          onChangeText={(text) => setMessage(text)}
          value={message}
        />
        <Button title="Send" onPress={handleSend} />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default VentScreen;
