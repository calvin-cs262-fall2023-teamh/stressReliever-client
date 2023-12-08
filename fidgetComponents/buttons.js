import React from 'react';
import { View, StyleSheet } from 'react-native';
import RoundButton from './buttons/buttonOutline';

const RoundButtonToolbox = () => {
  const handleButtonPress = (buttonNumber) => {
    console.log(`Button ${buttonNumber} pressed`);
  };

  return (
    <View style={styles.toolContainer}>
      <View style={{ flexDirection: 'row', padding: 15 }}>
        <View style={{ flexDirection: 'column' }}>
          <RoundButton title="1" onPress={() => handleButtonPress(1)} backgroundColor={"#6aa3f7"} />
          <RoundButton title="3" onPress={() => handleButtonPress(3)} backgroundColor={"red"} />
        </View>
        <View style={{ flexDirection: 'column' }}>
          <RoundButton title="2" onPress={() => handleButtonPress(2)} backgroundColor={"yellow"} />
          <RoundButton title="4" onPress={() => handleButtonPress(4)} backgroundColor={"green"} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toolContainer: {
    backgroundColor: '#263238',
    padding: 40,
    borderRadius: 10,
    marginBottom: 10,
    width: 160,
    height: 170,
    marginTop: 10,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RoundButtonToolbox;
