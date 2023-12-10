// SignupScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';


const SignupScreen = () => {
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
  





  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is where you sign up</Text>

      {/* Name section outline */}
      <TouchableOpacity style={styles.section} disabled={true}>
        <View style={styles.sectionContent}>
          <Text style={styles.sectionTitle}>Name:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your name"
            placeholderTextColor="white"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
      </TouchableOpacity>

      {/* Email section outline */}
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

      {/* Confirm Password section outline */}
      <TouchableOpacity style={styles.section} disabled={true}>
        <View style={styles.sectionContent}>
          <Text style={styles.sectionTitle}>Confirm Password:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Confirm your password"
            placeholderTextColor="white"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </View>
      </TouchableOpacity>

       {/* Create Account button */}
            <TouchableOpacity style={styles.createAccountButton} onPress={() => handleCreateAccount()}>
            <Text style={styles.createAccountButtonText}>Create Account</Text>
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
  createAccountButton: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  createAccountButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SignupScreen;
