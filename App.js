import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import SplashScreen from './src/screens/SplashScreen';
import LicenseScreen from './src/screens/LicenseScreen';
import PinSetupScreen from './src/screens/PinSetupScreen';
import BiometricScreen from './src/screens/BiometricScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import MultiSwapScreen from './src/screens/MultiSwapScreen';
import MultiTransferScreen from './src/screens/MultiTransferScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLicense, setHasLicense] = useState(false);
  const [hasPin, setHasPin] = useState(false);

  useEffect(() => {
    checkInitialState();
  }, []);

  const checkInitialState = async () => {
    try {
      const license = await AsyncStorage.getItem('license');
      const pin = await AsyncStorage.getItem('pin');

      setHasLicense(!!license);
      setHasPin(!!pin);
    } catch (error) {
      console.error('Error checking state:', error);
    } finally {
      setTimeout(() => setIsLoading(false), 3000); // Splash screen 3 seconds
    }
  };

  const getInitialRoute = () => {
    if (!hasLicense) return 'License';
    if (!hasPin) return 'PinSetup';
    return 'Biometric';
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={isLoading ? 'Splash' : getInitialRoute()}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="License" component={LicenseScreen} />
        <Stack.Screen name="PinSetup" component={PinSetupScreen} />
        <Stack.Screen name="Biometric" component={BiometricScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="MultiSwap" component={MultiSwapScreen} />
        <Stack.Screen name="MultiTransfer" component={MultiTransferScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
