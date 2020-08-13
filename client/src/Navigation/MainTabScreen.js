import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Observatory from '../Screens/Observatory';
import Report from '../Screens/Report';

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="ObservatoryTab"
      activeColor="#fff"
      shifting={true}
    >
      <Tab.Screen
        name="ObservatoryTab"
        component={Observatory}
        options={{
          tabBarLabel: 'Observatory',
          tabBarColor: '#efc4cd',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="ReportTab"
        component={Report}
        options={{
          tabBarLabel: 'Report',
          tabBarColor: '#AAD4EC',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-bar-chart-sharp" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabScreen;
