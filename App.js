// Import React library
import * as React from 'react';
import { DarkModeProvider } from './color/DarkModeContext';

// Import main navigation container
import MainContainer from './navigation/MainContainer';

// Main app component
function App() {
  return (
    <DarkModeProvider>
      <MainContainer/>
    </DarkModeProvider>
  );
}

// Export the App component
export default App;
