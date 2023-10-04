import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './screens/HomeScreen';
import DrawingScreen from './screens/drawing';
import SpinnerScreen from './screens/SpinnerScreen';
import ColorChangeScreen from './screens/ColorChangeScreen';
import ProfileScreen from './screens/ProfileScreen';

// Screen names
const homeName = "Home";
const drawingName = "Draw";
const spinnerName = "Spinner";
const colorChangeName = "ColorChange";
const profileName = "Profile";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            let rn = route.name;
            let iconSize = focused ? 30 : 25;
            let iconStyle = { marginBottom: -11 };  

            if (rn === homeName) {
              iconName = 'home-outline';
            } else if (rn === drawingName) {
              iconName = 'brush-outline';
            } else if (rn === spinnerName) {
              iconName = 'reload-outline';  // Consistent icon for both states
            } else if (rn === colorChangeName) {
              iconName = 'color-palette-outline';  // Consistent icon for both states
            } else if (rn === profileName) {
              iconName = 'person-outline';
            }

            return <Ionicons name={iconName} size={iconSize} color={color} style={iconStyle} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'grey',
          tabBarLabelStyle: { paddingTop: 10, fontSize: 10, marginBottom: -5 },
        })}>
        
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={drawingName} component={DrawingScreen} />
        <Tab.Screen name={spinnerName} component={SpinnerScreen} />
        <Tab.Screen name={colorChangeName} component={ColorChangeScreen} />
        <Tab.Screen name={profileName} component={ProfileScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
