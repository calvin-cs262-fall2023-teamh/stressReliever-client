import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { View } from 'react-native';
import BreathingComponent from './Breathing';

const BreathingTool = ({ size }) => {
  return (
    <View
      style={{
        width: size.width,
        height: size.height,
        backgroundColor: '#333333',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <BreathingComponent />
    </View>
  );
};

BreathingTool.propTypes = {
  size: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }).isRequired
};

export default BreathingTool;
