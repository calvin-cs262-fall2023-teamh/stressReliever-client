import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ColorChangeTapsScreen = () => {
  const stats = [
    { color: 'rgb(123,104,238)', taps: 80, time: '30s' },
    { color: 'rgb(255,105,180)', taps: 70, time: '48s' },
    { color: 'rgb(50,205,50)', taps: 75, time: '26s' },
    { color: 'rgb(255,165,0)', taps: 65, time: '36s' },
    { color: 'rgb(64,224,208)', taps: 45, time: '25s' },
    { color: 'rgb(255,218,185)', taps: 67, time: '36s' },
    { color: 'rgb(255,99,71)', taps: 77, time: '34s' },
    { color: 'rgb(100,149,237)', taps: 56, time: '46s' },
    { color: 'rgb(255,20,147)', taps: 66, time: '34s' },
    { color: 'rgb(50,205,50)', taps: 58, time: '46s' }
  ];

  // Function to dynamically create text style based on color
  const getTextStyle = (color) => ({
    fontSize: 16,
    color: color,
    marginBottom: 5,
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Color Change Taps Details</Text>
      {stats.map((stat, index) => (
        <View key={index} style={[styles.statBox, {borderColor: stat.color}]}>
          <Text style={getTextStyle(stat.color)}>
            {`Color: ${stat.color}`}
          </Text>
          <Text style={styles.statText}>
            {`Taps: ${stat.taps}`}
          </Text>
          <Text style={styles.statText}>
            {`Time: ${stat.time}`}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginVertical: 20,
  },
  statBox: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  statText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
});

export default ColorChangeTapsScreen;
