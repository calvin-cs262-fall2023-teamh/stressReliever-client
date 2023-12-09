import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LastFidgetSessionReview = () => {
  const activities = [
    { name: 'Breathing Exercise', value: '15 mins', icon: 'leaf-outline', color: '#4caf50' },
    { name: 'Venting Out', value: '10 mins', icon: 'chatbubble-ellipses-outline', color: '#f44336' },
    { name: 'Vent Texts Sent', value: '5 texts', icon: 'send-outline', color: '#2196f3' },
    { name: 'Button Taps', value: '20 taps', icon: 'keypad-outline', color: '#9c27b0' },
    { name: 'Switch Taps', value: '15 taps', icon: 'toggle-outline', color: '#ffeb3b' },
    { name: 'Joystick Controls', value: '10 controls', icon: 'game-controller-outline', color: '#ff9800' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Last Fidget Session Review</Text>
      {activities.map((activity, index) => (
        <View key={index} style={styles.card}>
          <Ionicons name={activity.icon} size={24} color={activity.color} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.activityName}>{activity.name}</Text>
            <Text style={styles.activityValue}>{activity.value}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginVertical: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  activityName: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 5,
  },
  activityValue: {
    fontSize: 16,
    color: '#dddddd',
  },
});

export default LastFidgetSessionReview;
