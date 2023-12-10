import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkModeProvider } from './color/DarkModeContext';
import MainContainer from './navigation/MainContainer';
import { AppContext } from './navigation/screens/AppContext'; // Import from AppContext.js

function App() {
  const [startTime, setStartTime] = useState(null);

  const recordStartTime = async () => {
    try {
      const now = new Date();
      await AsyncStorage.setItem('@start_time', now.toISOString());
      setStartTime(now);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    recordStartTime();
  }, []);

  return (
    <AppContext.Provider value={{ startTime }}>
      <DarkModeProvider>
        <MainContainer />
      </DarkModeProvider>
    </AppContext.Provider>
  );
}

export default App;
