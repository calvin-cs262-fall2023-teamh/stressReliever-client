import * as React from 'react';

// React Navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Icon library for tab bar icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// Importing app screens
import HomeScreen from './screens/HomeScreen';
import DrawingScreen from './screens/drawing';
import SpinnerScreen from './screens/SpinnerScreen';
import ColorChangeScreen from './screens/ColorChangeScreen';
import ProfileScreen from './screens/ProfileScreen';

// Constants for screen names
const homeName = "Home";
const drawingName = "Draw";
const spinnerName = "Spinner";
const colorChangeName = "ColorChange";
const profileName = "Profile";

// Create a bottom tab navigator
const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        // Configuring the tab navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          // Define the tab bar icon based on the route name
          tabBarIcon: ({ focused, color }) => {
            // Logic to determine icon name based on current route
            let iconName;
            let rn = route.name;
            let iconSize = focused ? 30 : 25;
            let iconStyle = { marginBottom: -11 };  
            
            // Mapping route names to icons
            if (rn === homeName) iconName = 'home-outline';
            else if (rn === drawingName) iconName = 'brush-outline';
            else if (rn === spinnerName) iconName = 'reload-outline';  
            else if (rn === colorChangeName) iconName = 'color-palette-outline'; 
            else if (rn === profileName) iconName = 'person-outline';

            return <Ionicons name={iconName} size={iconSize} color={color} style={iconStyle} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'grey',
          tabBarLabelStyle: { paddingTop: 10, fontSize: 10, marginBottom: -5 },
        })}>
        
        {/* Adding screens to the tab navigator */}
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={drawingName} component={DrawingScreen} />
        <Tab.Screen name={spinnerName} component={SpinnerScreen} />
        <Tab.Screen name={colorChangeName} component={ColorChangeScreen} />
        <Tab.Screen name={profileName} component={ProfileScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Export the main container
export default MainContainer;
