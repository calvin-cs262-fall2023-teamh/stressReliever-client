import React, { useContext, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { differenceInSeconds } from 'date-fns';
import AppStateListener from 'react-native-appstate-listener';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DarkModeContext from '../../color/DarkModeContext';

const ProfileScreen = ({ navigation }) => {
  const { darkMode } = useContext(DarkModeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#000000' : '#F9F9F9', // Apply dark mode background color
    },
    contentContainer: {
      paddingBottom: 20,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      alignSelf: 'center',
      marginTop: 40,
      marginBottom: 20,
    },
    infoContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: darkMode ? '#FFFFFF' : '#333', // Apply dark mode text color
    },
    email: {
      fontSize: 16,
      color: darkMode ? '#CCCCCC' : '#777', // Apply dark mode text color
    },
    button: {
      backgroundColor: '#800000',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginHorizontal: 40,
      marginBottom: 30,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
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
    sectionIcon: {
      marginRight: 10,
    },
    sectionContent: {
      flex: 1,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: darkMode ? '#FFFFFF' : '#333', // Apply dark mode text color
      marginBottom: 10,
    },
    sectionSubtitle: {
      fontSize: 14,
      color: darkMode ? '#FFFFFF' : '#777', // Apply dark mode text color
    },
    activityText: {
      fontSize: 16,
      color: darkMode ? '#FFFFFF' : '#555', // Apply dark mode text color
      marginBottom: 10,
    },
    timerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15, // Add a bottom margin for spacing
    },
    input: {
      flex: 1,
      borderColor: darkMode ? '#FFFFFF' : '#ccc', // Adjust as per the dark mode
      borderWidth: 1,
      marginRight: 10,
      padding: 8,
      borderRadius: 5,
      backgroundColor: '#707070', // A darker shade similar to the card color for contrast
      color: '#EFEFEF', // A light but not white color for text for better readability
      fontWeight: '500', // Semi-bold to make text more prominent
      fontSize: 16, // Slightly larger font size for better visibility
      textShadowColor: 'rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 1,
    },
    // Style for time remaining text
    timeRemaining: {
      fontSize: 16,
      color: darkMode ? '#FFFFFF' : '#555',
      marginTop: 10, // Added top margin for spacing
      textAlign: 'center', // Center the text
    },
    footer: {
      alignItems: 'center',
      marginTop: 20,
    },
    footerText: {
      fontSize: 16,
      color: darkMode ? '#CCCCCC' : '#888', // Apply dark mode text color
      textAlign: 'center',
    },
  });

  const [elapsed, setElapsed] = useState(0);
  const [personalTimer, setPersonalTimer] = useState('');
  const [remainingTime, setRemainingTime] = useState(null);
  const intervalRef = useRef(null);

  const recordStartTime = async () => {
    try {
      const now = new Date();
      await AsyncStorage.setItem('@start_time', now.toISOString());
    } catch (err) {
      console.warn(err);
    }
  };

  const getElapsedTime = async () => {
    try {
      const startTime = await AsyncStorage.getItem('@start_time');
      const now = new Date();
      return differenceInSeconds(now, Date.parse(startTime));
    } catch (err) {
      console.warn(err);
    }
  };

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      getElapsedTime().then((elapsedTime) => setElapsed(elapsedTime));
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  const handleSetTimer = () => {
    const time = parseFloat(personalTimer); // Use parseFloat instead of parseInt
    if (!isNaN(time) && time > 0) {
      setRemainingTime(Math.floor(time * 60)); // Convert decimal minutes to seconds
      Alert.alert('Timer Set', `Your timer is set for ${personalTimer} minutes. We'll notify you when time is up.`);
      setPersonalTimer('');
    } else {
      Alert.alert('Invalid Input', 'Please enter a valid number of minutes.');
    }
  };

  useEffect(() => {
    if (remainingTime !== null) {
      if (remainingTime === 0) {
        setRemainingTime(null);
        Alert.alert('Time’s Up!', 'Your personal timer has ended. Take a break or continue exploring!');
      } else {
        const timer = setInterval(() => {
          setRemainingTime((prevTime) => prevTime - 1);
        }, 1000);
        return () => clearInterval(timer);
      }
    }
  }, [remainingTime]);

  useEffect(() => {
    recordStartTime();
    startTimer();
    return () => {
      stopTimer();
    };
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Profile image */}
      <Image 
        style={styles.profileImage}
        source={{ uri: 'https://hips.hearstapps.com/hmg-prod/images/john-calvin-gettyimages-51246861.jpg?crop=1xw:1.0xh;center,top&resize=640:*' }} // Placeholder image with a cute kitten
      />

      {/* User information */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>John Calvin</Text>
        <Text style={styles.email}>john.calvin@calvin.edu</Text>
      </View>

      {/* Login/Sign up button */}
      <TouchableOpacity style={styles.button} onPress={() => alert('Login functionality to be implemented')}>
        <Text style={styles.buttonText}>Log In / Sign Up</Text>
      </TouchableOpacity>

      {/* Recent activity section */}
      <View style={styles.section}>
        <Ionicons name="time-outline" size={30} color="#4A90E2" style={styles.sectionIcon} />
        <View style={styles.sectionContent}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <Text style={styles.activityText}>Time Spent on App: {elapsed} seconds</Text>
          {/* Personal timer input and start button */}
          <View style={styles.timerContainer}>
            <TextInput 
              style={styles.input}
              placeholder="Set a timer (minutes)"
              keyboardType="numeric"
              value={personalTimer}
              onChangeText={setPersonalTimer}
            />
            <Button title="Start" onPress={handleSetTimer} />
          </View>
          {/* Display remaining time if personal timer is set */}
          {remainingTime !== null && (
            <Text style={styles.activityText}>Time Remaining: {Math.floor(remainingTime / 60)}m {remainingTime % 60}s</Text>
          )}
        </View>
      </View>

      {/* Settings section */}
      <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('Settings')}>
        <Ionicons name="settings-outline" size={30} color="#F5A623" style={styles.sectionIcon} />
        <View style={styles.sectionContent}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <Text style={styles.sectionSubtitle}>Configure your preferences</Text>
        </View>
      </TouchableOpacity>

      {/* Achievements section */}
      <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('Achievements')}>
        <Ionicons name="trophy-outline" size={30} color="#A569BD" style={styles.sectionIcon} />
        <View style={styles.sectionContent}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <Text style={styles.sectionSubtitle}>View your achievements</Text>
        </View>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Enjoy exploring your profile!</Text>
      </View>

      {/* Listener for app state changes */}
      <AppStateListener onActive={recordStartTime} />
    </ScrollView>
  );
};

ProfileScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileScreen;