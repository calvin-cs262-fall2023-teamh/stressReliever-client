import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text } from 'react-native';

const VentScreen = ({ onClose }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    // Handle sending the message (you can implement this logic)
    console.log('Message sent:', message);

    // Close the MessageScreen
    onClose();
  };

  return (
    <TouchableOpacity onPress={handleSend}>
      <View style={{ padding: 20, backgroundColor: 'lightblue', borderRadius: 20, margin: 20 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Type how you feel and then release it</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 10 }}
          placeholder="Type your message..."
          onChangeText={(text) => setMessage(text)}
          value={message}
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </TouchableOpacity>
  );
};

export default VentScreen;
