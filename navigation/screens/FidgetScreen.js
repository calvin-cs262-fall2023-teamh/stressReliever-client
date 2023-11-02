import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import ToolSquare from '../../fidgetComponents/switch';
import RoundButtonToolbox from '../../fidgetComponents/buttons';
import FidgetSpinner from '../../fidgetComponents/Spinner';
import VentScreen from '../../fidgetComponents/Vent';
import Joystick from '../../fidgetComponents/joyStick'


const ToolScreen = () => {

  const [isVentScreenVisible, setVentScreenVisible] = useState(false);

  const toggleVentScreen = () => {
    setVentScreenVisible(!isVentScreenVisible);
  };

  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <ToolSquare title="Tool 1" size={{ width: 110, height: 110 }} backgroundColor={"red"} />
        <ToolSquare title="Tool 2" size={{ width: 110, height: 110 }} backgroundColor={"blue"}/>
        <ToolSquare title="Tool 3" size={{ width: 110, height: 110 }} backgroundColor={"purple"}/>
      </View>
      <TouchableOpacity onPress={toggleVentScreen}>
        <View style={{ 
          backgroundColor: 'lightblue', 
          borderRadius: 10, 
          padding: 10,
          margin: 10,
          alignItems: 'center'
        }}>
          <Text style={{ fontSize: 18 }}>Vent here...</Text>
        </View>
      </TouchableOpacity>
      {isVentScreenVisible && <VentScreen onClose={toggleVentScreen} />}
      <View style={{ flexDirection: 'row' }}>
      <ToolSquare title="Tool 1" size={{ width: 370, height: 110 }} backgroundColor={"orange"} />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <RoundButtonToolbox />
        <FidgetSpinner />
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Joystick />
      </View>
    </View>
  );
};

export default ToolScreen;