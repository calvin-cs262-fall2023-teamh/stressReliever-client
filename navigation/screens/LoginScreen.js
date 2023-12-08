import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

// eslint-disable-next-line react/prop-types
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = () => {
    // Implement your login logic here
    // For now, we'll just log the email and password to the console
    console.log('email:', email);
    console.log('Password:', password);
  };

  const handleCreateAccount = () => {
    // Navigate to the SignupScreen when the button is pressed
    // eslint-disable-next-line react/prop-types
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is where you login</Text>

      {/* email section outline */}
      <TouchableOpacity style={styles.section} disabled={true}>
        <View style={styles.sectionContent}>
          <Text style={styles.sectionTitle}>Email:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your Calvin email"
            placeholderTextColor="white"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
      </TouchableOpacity>

      {/* Password section outline */}
      <TouchableOpacity style={styles.section} disabled={true}>
        <View style={styles.sectionContent}>
          <Text style={styles.sectionTitle}>Password:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            placeholderTextColor="white"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
      </TouchableOpacity>

      {/* Submit button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleLoginSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      {/* "Need an account?" section */}
      <TouchableOpacity style={[styles.submitButton, styles.createAccountButton]} onPress={handleCreateAccount}>
        <Text style={styles.submitButtonText}>Need an account? Create one</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#5A5A5A',
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  sectionContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    color: 'white',
    padding: 8,
    borderRadius: 5,
    placeholderTextColor: 'white',
  },
  submitButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 40,
    marginBottom: 10,
  },
  submitButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  createAccountButton: {
    marginTop: 10,
  },
});

export default LoginScreen;