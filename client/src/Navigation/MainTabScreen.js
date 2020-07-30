import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeStackScreen from './HomeStackScreen';
import ObservatoryStackScreen from './ObservatoryStackScreen';

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
  return (
    <Tab.Navigator initialRouteName="Home" activeColor="#fff" shifting={true}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#efc4cd',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="ObservatoryTab"
        component={ObservatoryStackScreen}
        options={{
          tabBarLabel: 'Observatory',
          tabBarColor: '#AAD4EC',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-happy" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabScreen;
