import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { TouchableOpacity, View } from 'react-native'; // Remove Text import

const RoundButton = ({ onPress, backgroundColor }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: backgroundColor,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 10,
        }}
      >
      </View>
    </TouchableOpacity>
  );
};

// Define the prop types
RoundButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string
};

export default RoundButton;
