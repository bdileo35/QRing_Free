import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import InicioScreen from '../screens/InicioScreen';
import HistorialScreen from '../screens/HistorialScreen';
import ConfigScreen from '../screens/ConfigScreen';
import HelpScreen from '../screens/HelpScreen';

const Tab = createBottomTabNavigator();

const EmptyScreen = () => null;

export default function TabNavigator() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={InicioScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={size} color={focused ? '#007AFF' : color} />
          ),
          tabBarLabel: 'Inicio',
        }}
      />
      <Tab.Screen
        name="Historial"
        component={HistorialScreen}
        options={{
          tabBarIcon: () => null,
          tabBarLabel: () => null,
          tabBarButton: () => null
        }}
      />
      <Tab.Screen
        name="Config"
        component={ConfigScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "settings" : "settings-outline"} size={size} color={focused ? '#007AFF' : color} />
          ),
          tabBarLabel: 'Configuración',
        }}
      />
      <Tab.Screen
        name="Empty"
        component={EmptyScreen}
        options={{
          tabBarIcon: () => null,
          tabBarLabel: () => null,
          tabBarButton: () => null
        }}
      />
      <Tab.Screen
        name="Ayuda"
        component={HelpScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "help-circle" : "help-circle-outline"} size={size} color={focused ? '#007AFF' : color} />
          ),
          tabBarLabel: 'Ayuda',
        }}
      />
    </Tab.Navigator>
  );
} 