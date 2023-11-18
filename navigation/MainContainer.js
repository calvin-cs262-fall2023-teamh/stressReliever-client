import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import DrawingScreen from './screens/drawing';
import FidgetScreen from './screens/FidgetScreen';
import ColorChangeScreen from './screens/ColorChangeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import AchievementsScreen from './screens/AchievementsScreen';

const homeName = 'Home';
const drawingName = 'Draw';
const fidgetName = 'Fidget';
const colorChangeName = 'ColorChange';
const profileName = 'Profile';

const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileDetail"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
      <ProfileStack.Screen name="Achievements" component={AchievementsScreen} />
    </ProfileStack.Navigator>
  );
}

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

            if (rn === homeName) iconName = 'home-outline';
            else if (rn === drawingName) iconName = 'brush-outline';
            else if (rn === fidgetName) iconName = 'reload-outline';
            else if (rn === colorChangeName) iconName = 'color-palette-outline';
            else if (rn === profileName) iconName = 'person-outline';

            return <Ionicons name={iconName} size={iconSize} color={color} style={iconStyle} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'grey',
          tabBarLabelStyle: { paddingTop: 10, fontSize: 10, marginBottom: 0 },
        })}>

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={drawingName} component={DrawingScreen} />
        <Tab.Screen name={fidgetName} component={FidgetScreen} />
        <Tab.Screen name={colorChangeName} component={ColorChangeScreen} />
        <Tab.Screen name={profileName} component={ProfileStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
