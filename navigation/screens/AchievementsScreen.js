import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AchievementsScreen = () => {
  const achievements = [
    { name: 'Breathing Master', detail: '30 mins of deep breathing', icon: 'leaf-outline', progress: 0.75, color: '#4CAF50' },
    { name: 'Click Champion', detail: '1000 clicks achieved', icon: 'hand-left-outline', progress: 0.5, color: '#FF5722' },
    { name: 'Color Explorer', detail: 'Explored 10 different colors', icon: 'color-palette-outline', progress: 0.9, color: '#3F51B5' },
    { name: 'Venting Veteran', detail: 'Shared thoughts 20 times', icon: 'chatbubble-ellipses-outline', progress: 0.6, color: '#9C27B0' },
    { name: 'Zen Guru', detail: 'Completed 15 mindfulness sessions', icon: 'flower-outline', progress: 0.85, color: '#00BCD4' },
    { name: 'Joyful Journeys', detail: 'Used joystick 50 times', icon: 'game-controller-outline', progress: 0.7, color: '#FFEB3B' },
    { name: 'Art Aficionado', detail: 'Created 5 drawings', icon: 'brush-outline', progress: 0.4, color: '#E91E63' },
    { name: 'Switch Master', detail: '500 switch toggles', icon: 'toggle-outline', progress: 0.3, color: '#FF9800' },
    { name: 'Frequent Logger', detail: 'Logged in 30 times', icon: 'log-in-outline', progress: 0.8, color: '#8BC34A' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Your Achievements</Text>
      {achievements.map((achievement, index) => (
        <View key={index} style={styles.achievementCard}>
          <Ionicons name={achievement.icon} size={30} color={achievement.color} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.achievementName}>{achievement.name}</Text>
            <Text style={styles.achievementDetail}>{achievement.detail}</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${achievement.progress * 100}%` }]} />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  achievementName: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  achievementDetail: {
    fontSize: 14,
    color: 'grey',
  },
  progressBarContainer: {
    height: 10,
    flex: 1,
    backgroundColor: 'grey',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4A90E2',
  },
});

export default AchievementsScreen;
