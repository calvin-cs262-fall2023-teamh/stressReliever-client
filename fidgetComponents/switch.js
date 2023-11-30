import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Switch } from 'react-native';

const ToolSquare = ({ size, backgroundColor }) => {
  const [switchValue, setSwitchValue] = useState(false);

  const toggleSwitch = () => {
    setSwitchValue(previousState => !previousState);
  };

  return (
    <View
      style={{
        width: size.width,
        height: size.height,
        backgroundColor: backgroundColor,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
      }}
    >
      <Switch
        value={switchValue}
        onValueChange={toggleSwitch}
      />
    </View>
  );
};

ToolSquare.propTypes = {
  size: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  backgroundColor: PropTypes.string.isRequired,
};

export default ToolSquare;
