import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './screens/HomeScreen';
import DrawingScreen from './screens/drawing'
import SpinnerScreen from './screens/SpinnerScreen';
import ColorChangeScreen from './screens/ColorChangeScreen';
import ProfileScreen from './screens/ProfileScreen';

//Screen names
const homeName = "Home";
const drawingName = "Draw"
const spinnerName = "Spinner";
const colorChangeName = "ColorChange";
const profileName = "Profile"

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOption={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === drawingName){
              iconName = focused ? 'brush' : 'brush-outline';
            } else if (rn === spinnerName) {
              iconName = focused ? 'time' : 'time-outline';

            } else if (rn === colorChangeName) {
              iconName = focused ? 'finger-print' : 'finger-print-outline';
            } else if(rn === profileName) {
              iconName = focused ? 'person' : 'person-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        screenOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        }}>

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={drawingName} component={DrawingScreen}/>
        <Tab.Screen name={spinnerName} component={SpinnerScreen} />
        <Tab.Screen name={colorChangeName} component={ColorChangeScreen} />
        <Tab.Screen name={profileName} component={ProfileScreen}/>

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;