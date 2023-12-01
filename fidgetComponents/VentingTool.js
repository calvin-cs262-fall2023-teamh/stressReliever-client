import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const VentingTool = ({ navigation }) => {

  return (
      <View style={styles.toolContainer}>
        <MaterialCommunityIcons name="message-text-outline" size={40} color="white" />
      </View>
  );
};


//Take off touch opacity from here and add it to mainContainer
const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  toolContainer: {
    backgroundColor: '#263238',
    padding: 40,
    borderRadius: 10,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: 'gray',
  },
});

export default VentingTool;
