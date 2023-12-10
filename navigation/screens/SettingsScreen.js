import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const SettingsScreen = () => {
  // For demonstration, these states are not functional
  const [darkMode, setDarkMode] = React.useState(true);
  const [notifications, setNotifications] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={darkMode ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={() => setDarkMode(previousState => !previousState)}
          value={darkMode}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Notifications</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={notifications ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={() => setNotifications(previousState => !previousState)}
          value={notifications}
        />
      </View>

      {/* Add more settings options as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 50, // Adjust padding as needed
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    marginBottom: 30, // Space between title and first setting item
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray', // A subtle line between items
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  settingText: {
    fontSize: 18,
    color: 'white',
  },
});

export default SettingsScreen;
