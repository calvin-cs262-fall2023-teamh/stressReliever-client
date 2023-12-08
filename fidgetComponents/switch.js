import React, { useState } from 'react';
import { View, Switch } from 'react-native';
import PropTypes from 'prop-types'; // Import PropTypes

const ToolSquare = ({ size }) => {
  const [switch1Value, setSwitch1Value] = useState(false);
  const [switch2Value, setSwitch2Value] = useState(false);
  const [switch3Value, setSwitch3Value] = useState(false);
  return (
    <View
      style={{
        width: size.width,
        height: size.height,
        backgroundColor: "#263238",
        margin: 10,
        justifyContent: 'space-between', // Arrange switches vertically with space between them
        alignItems: 'center', // Align switches to the center horizontally
        paddingVertical: 10, // Added vertical padding for space between switches
        paddingHorizontal: 20, // Added horizontal padding for aesthetics
        borderRadius: 10, // Added borderRadius to match the rectangle style
      }}
    >
      {/* Switch 1 */}
      <Switch
        value={switch1Value}
        onValueChange={(value) => setSwitch1Value(value)}
        thumbColor={switch1Value ? 'white' : 'white'} // Change thumb color when switch is on/off
        trackColor={{ false: 'gray', true: '#4685e3' }} // Change track color when switch is on/off
        style={{ marginBottom: 10 }} // Add margin between switches for spacing
      />

      {/* Switch 2 */}
      <Switch
        value={switch2Value}
        onValueChange={(value) => setSwitch2Value(value)}
        thumbColor={switch2Value ? 'white' : 'white'} // Change thumb color when switch is on/off
        trackColor={{ false: 'gray', true: '#29f20f' }} // Change track color when switch is on/off
        style={{ marginBottom: 10 }} // Add margin between switches for spacing
      />

      {/* Switch 3 */}
      <Switch
        value={switch3Value}
        onValueChange={(value) => setSwitch3Value(value)}
        thumbColor={switch3Value ? 'white' : 'white'} // Change thumb color when switch is on/off
        trackColor={{ false: 'gray', true: 'orange' }} // Change track color when switch is on/off
      />
    </View>
  );
};

// Define PropTypes for ToolSquare
ToolSquare.propTypes = {
  size: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
};

export default ToolSquare;
