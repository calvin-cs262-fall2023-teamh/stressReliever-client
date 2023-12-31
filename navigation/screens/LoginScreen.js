import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import PropTypes from 'prop-types'; // Import PropTypes

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = () => {
    console.log('username:', email);
    console.log('password:', password);
  
    if (!email || !password) {
      Alert.alert('Email and password are required.');
      return;
    }
  
    fetch(`https://mindfulknights.azurewebsites.net/users`)
      .then(response => {
        console.log('Response Status:', response.status);
  
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch user data');
        }
      })
      .then(users => {
        // Check if the entered email and password match any user
        const matchedUser = users.find(user => user.email === email && user.password_hash === password);
  
        if (matchedUser) {
          console.log('Login successful!');
          Alert.alert('Login successful!');
          // Optionally, you can add logic here to handle the successful login without navigation
        } else {
          Alert.alert('Login failed', 'Please check your credentials.');
        }
      })
      .catch(error => {
        console.error('Fetch Error:', error);
        Alert.alert('An error occurred', 'Please try again later.');
      });
  };

  const handleCreateAccount = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Login</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your password"
          placeholderTextColor="#aaa"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleLoginSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Create Account Link */}
      <TouchableOpacity onPress={handleCreateAccount}>
        <Text style={styles.createAccountText}>Need an account? Create one</Text>
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
  inputContainer: {
    width: '80%',
    marginBottom: 15,
  },
  textInput: {
    backgroundColor: '#333',
    color: '#fff',
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
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
  createAccountText: {
    color: '#fff',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
});

// Define PropTypes for the component
LoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default LoginScreen;
