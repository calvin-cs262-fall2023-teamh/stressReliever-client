import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DarkModeContext from '../../color/DarkModeContext';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const { darkMode } = useContext(DarkModeContext);
  const navigation = useNavigation(); 

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#000000' : '#EDEDED',
      paddingHorizontal: 20,
      paddingTop: 50,
    },
    header: {
      fontSize: 28,
      fontWeight: 'bold',
      color: darkMode ? 'white' : 'white',
      marginBottom: 40,
      textAlign: 'center',
    },
    card: {
      backgroundColor: '#5A5A5A',
      borderRadius: 15,
      padding: 25,
      marginBottom: 25,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    cardTextContainer: {
      marginLeft: 15,
    },
    cardTitle: {
      fontSize: 22,
      fontWeight: '600',
      color: darkMode ? '#ffffff' : '#333',
    },
    cardDetail: {
      fontSize: 16,
      color: darkMode ? '#ffffff' : '#777',
      marginTop: 5,
    },
    footer: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 30,
    },
    footerText: {
      fontSize: 16,
      color: darkMode ? '#888' : '#888',
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Welcome to MindfulKnight!</Text>

      {/* Card: Previous Drawings */}
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PreviousDrawingsScreen')}>
        <Ionicons name="brush-outline" size={40} color="#4A90E2" />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>Previous Drawings</Text>
          <Text style={styles.cardDetail}>Tap to view your artwork</Text>
        </View>
      </TouchableOpacity>

      {/* Card: Last Fidget Session Review */}
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('LastFidgetSessionScreen')}>
        <Ionicons name="time-outline" size={40} color="#F5A623" />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>Last Fidget Session Review</Text>
          <Text style={styles.cardDetail}>Review your last session activities</Text>
        </View>
      </TouchableOpacity>

      {/* Card: Color Change Taps */}
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ColorChangeTapsScreen')}>
        <Ionicons name="color-palette-outline" size={40} color="#A569BD" />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>Color Change Taps</Text>
          <Text style={styles.cardDetail}>Review the colors you tapped</Text>
        </View>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Keep exploring and stay relaxed!</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
