// Importing necessary libraries and components
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { differenceInSeconds } from 'date-fns';
import AppStateListener from 'react-native-appstate-listener';
import Ionicons from 'react-native-vector-icons/Ionicons';

// ProfileScreen component
const ProfileScreen = ({ navigation }) => {
  // State and ref variables
  const [elapsed, setElapsed] = useState(0);
  const [personalTimer, setPersonalTimer] = useState('');
  const [remainingTime, setRemainingTime] = useState(null);
  const intervalRef = useRef(null);

  // Record the start time when the app becomes active
  const recordStartTime = async () => {
    try {
      const now = new Date();
      await AsyncStorage.setItem('@start_time', now.toISOString());
    } catch (err) {
      console.warn(err);
    }
  };

  // Calculate and return the elapsed time since the app became active
  const getElapsedTime = async () => {
    try {
      const startTime = await AsyncStorage.getItem('@start_time');
      const now = new Date();
      return differenceInSeconds(now, Date.parse(startTime));
    } catch (err) {
      console.warn(err);
    }
  };

  // Start the timer to update the elapsed time every second
  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      getElapsedTime().then((elapsedTime) => setElapsed(elapsedTime));
    }, 1000);
  };

  // Stop the timer when the component is unmounted
  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  // Set a personal timer and show an alert when the time is up
  const handleSetTimer = () => {
    const time = parseInt(personalTimer, 10);
    if (!isNaN(time) && time > 0) {
      setRemainingTime(time * 60);
      Alert.alert('Timer Set', `Your timer is set for ${personalTimer} minutes. We'll notify you when time is up.`);
      setPersonalTimer('');
    } else {
      Alert.alert('Invalid Input', 'Please enter a valid number of minutes.');
    }
  };

  // Update the remaining time of the personal timer and show an alert when the time is up
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

  // Record start time and start the timer when the component mounts
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
        source={{ uri: 'https://placekitten.com/150/150' }} // Placeholder image with a cute kitten
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
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
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#777',
  },
  button: {
    backgroundColor: '#FF6347',
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
    backgroundColor: '#fff',
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
    color: '#333',
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#777',
  },
  activityText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 10,
    padding: 8,
    borderRadius: 5,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});

export default ProfileScreen;
