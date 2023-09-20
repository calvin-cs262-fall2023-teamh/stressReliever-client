// src/components/InfoCard.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InfoCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fidget App</Text>
      <Text style={styles.text}>Press the button to experience color transitions!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
    elevation: 5,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
  },
});

export default InfoCard;
