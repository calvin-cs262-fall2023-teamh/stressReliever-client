import React, { useState } from 'react';
import { View, Switch } from 'react-native';

const ToolSquare = ({ title, size, backgroundColor }) => {
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
        padding: 10, // Added padding to create space for the Switch component
        borderRadius: 10, // Added borderRadius to match the grey box style
      }}
    >
      {/* Add content for the square here */}
      <Switch
        value={switchValue}
        onValueChange={toggleSwitch}
      />
    </View>
  );
};

export default ToolSquare;
