import React, { useEffect, useState, useRef } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { differenceInSeconds } from 'date-fns';
import AppStateListener from 'react-native-appstate-listener';

export default function ProfileScreen({ navigation }) {
  const [elapsed, setElapsed] = useState(0);
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
    }, 1000); // Update every 1 second
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    recordStartTime();

    startTimer(); // Start the timer

    return () => {
      stopTimer(); // Stop the timer when the component unmounts
    };
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        onPress={() => alert('This is the "Profile" screen.')}
        style={{ fontSize: 26, fontWeight: 'bold' }}>
        Profile Screen
      </Text>
      <Text style={{ fontSize: 18 }}>
        Time spent on this screen: {elapsed} seconds
      </Text> 
      <AppStateListener onActive={recordStartTime} />
    </View>
  );
}
