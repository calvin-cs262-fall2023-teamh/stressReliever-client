import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DarkModeContext from '../../color/DarkModeContext';

const HomeScreen = ({ navigation }) => {
  const { darkMode } = useContext(DarkModeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#000000' : '#EDEDED', // Apply dark mode background color
      paddingHorizontal: 20,
      paddingTop: 50
    },
    header: {
      fontSize: 28,
      fontWeight: 'bold',
      color: darkMode ? '#800000' : '#333', // Apply dark mode text color
      marginBottom: 40,
      textAlign: 'center'
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
      marginLeft: 15
    },
    cardTitle: {
      fontSize: 22,
      fontWeight: '600',
      color: darkMode ? '#ffffff' : '#333', // Apply dark mode text color
    },
    cardDetail: {
      fontSize: 16,
      color: darkMode ? '#ffffff' : '#777', // Apply dark mode text color
      marginTop: 5
    },
    footer: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 30
    },
    footerText: {
      fontSize: 16,
      color: darkMode ? '#888' : '#888', // Apply dark mode text color
      textAlign: 'center'
    }
  });

  return (
    <View style={styles.container}>

      {/* Header */}
      <Text style={styles.header}>Welcome to MindfulKnight!</Text>

      {/* Card: Previous Drawings */}
      <TouchableOpacity style={styles.card} onPress={() => alert('Show previous drawings')}>
        <Ionicons name="brush-outline" size={40} color="#4A90E2" />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>Previous Drawings</Text>
          <Text style={styles.cardDetail}>Tap to view your artwork</Text>
        </View>
      </TouchableOpacity>

      {/* Card: Last Spin Counts */}
      <TouchableOpacity style={styles.card} onPress={() => alert('Show last spin counts')}>
        <Ionicons name="reload-outline" size={40} color="#F5A623" />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>Last Spin Counts</Text>
          <Text style={styles.cardDetail}>You spun 5 times in the last session</Text>
        </View>
      </TouchableOpacity>

      {/* Card: Color Change Taps */}
      <TouchableOpacity style={styles.card} onPress={() => alert('Show color change taps')}>
        <Ionicons name="color-palette-outline" size={40} color="#A569BD" />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>Color Change Taps</Text>
          <Text style={styles.cardDetail}>You tapped 12 times in the last session</Text>
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
