import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import PropTypes from 'prop-types'; // Import PropTypes

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCreateAccount = () => {
    // Prepare the data to be sent in the request body
    const userData = {
      username: name,
      email: email,
      password_hash: password,
      // Additional properties if needed (type, profileimage, etc.)
    };
  
    console.log('Data Sent to Server:', userData);
  
    fetch('https://mindfulknights.azurewebsites.net/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Server Response:', data);
        // Handle the response data as needed
        // For example, update the state or show a success message
        Alert.alert('Account Created', 'Account made successfully!');
      })
      .catch(error => {
        console.error('Fetch Error:', error);
        // Show an alert when there is an error
        Alert.alert('Error', 'Failed to create account. Please try again.');
      });
  };

  
    const handleLoginNavigation = () => {
      navigation.navigate('Login');
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Sign Up</Text>
  
        <TextInput
          style={styles.textInput}
          placeholder="Enter your name"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />
  
        <TextInput
          style={styles.textInput}
          placeholder="Enter your email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
  
        <TextInput
          style={styles.textInput}
          placeholder="Enter your password"
          placeholderTextColor="#aaa"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
  
        <TextInput
          style={styles.textInput}
          placeholder="Confirm your password"
          placeholderTextColor="#aaa"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
  
        <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
  
        <TouchableOpacity onPress={handleLoginNavigation}>
          <Text style={styles.loginText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  textInput: {
    backgroundColor: '#333',
    color: '#fff',
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    width: '80%',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    color: '#fff',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
});

// Define PropTypes for the component
SignupScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default SignupScreen;