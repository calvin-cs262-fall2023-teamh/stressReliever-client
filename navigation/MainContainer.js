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
import BreathingScreen from './screens/BreathingScreen';
import VentScreen from '../fidgetComponents/Vent';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import PreviousDrawingsScreen from './screens/PreviousDrawingsScreen';
import LastFidgetSessionReview from './screens/LastFidgetSession';
import ColorChangeTapsScreen from './screens/ColorChangeTapsScreen';


const homeName = "Home";
const drawingName = "Draw";
const fidgetName = "Fidget";
const colorChangeName = "ColorChange";
const profileName = "Profile";

const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();
const FidgetStack = createStackNavigator();

const HomeStack = createStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name="HomeDetail"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="PreviousDrawingsScreen" component={PreviousDrawingsScreen} />
      <HomeStack.Screen name="LastFidgetSessionScreen" component={LastFidgetSessionReview} />
      <HomeStack.Screen name="ColorChangeTapsScreen" component={ColorChangeTapsScreen} />
    </HomeStack.Navigator>
  );
}

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
      <ProfileStack.Screen name="Login" component={LoginScreen} />
      <ProfileStack.Screen name="Signup" component={SignupScreen} />
    </ProfileStack.Navigator>
  );
}

function FidgetStackNavigator() {
  return (
    <FidgetStack.Navigator>
      <FidgetStack.Screen 
        name="FidgetDetail"
        component={FidgetScreen}
        options={{ headerShown: false }}
      />
      <FidgetStack.Screen name="Breathing" component={BreathingScreen} />
      <FidgetStack.Screen name="Venting" component={VentScreen} />
    </FidgetStack.Navigator>
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
        
        <Tab.Screen name={homeName} component={HomeStackNavigator} />
        <Tab.Screen name={drawingName} component={DrawingScreen} />
        <Tab.Screen name={fidgetName} component={FidgetStackNavigator} />
        <Tab.Screen name={colorChangeName} component={ColorChangeScreen} />
        <Tab.Screen name={profileName} component={ProfileStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
