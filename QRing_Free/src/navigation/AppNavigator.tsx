import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HomeScreen, HistoryScreen, ConfigScreen, HelpScreen } from '@screens/main';
import { COLORS, SHADOWS } from '@constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              switch (route.name) {
                case 'Home':
                  iconName = focused ? 'home' : 'home-outline';
                  break;
                case 'History':
                  iconName = focused ? 'time' : 'time-outline';
                  break;
                case 'Config':
                  iconName = focused ? 'settings' : 'settings-outline';
                  break;
                case 'Help':
                  iconName = focused ? 'help-circle' : 'help-circle-outline';
                  break;
                default:
                  iconName = 'help-circle-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: COLORS.gray[400],
            headerShown: false,
            tabBarStyle: [
              styles.tabBar,
              SHADOWS.md,
              { borderTopWidth: 2, borderTopColor: COLORS.gray[300] },
            ],
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="History" component={HistoryScreen} />
          <Tab.Screen name="Config" component={ConfigScreen} />
          <Tab.Screen name="Help" component={HelpScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.white,
    height: 60,
  },
}); 