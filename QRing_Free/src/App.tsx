import React, { useEffect, useState } from 'react';
import SplashScreen from './components/SplashScreen';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return <AppNavigator />;
};

export default App; 