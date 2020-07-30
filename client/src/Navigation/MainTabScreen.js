import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from '../Screens/Home';
import Observatory from '../Screens/Observatory';

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      activeColor="#fff"
      shifting={true}
    >
      <Tab.Screen
        name="HomeTab"
        component={Home}
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
        component={Observatory}
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
