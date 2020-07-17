import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeStackScreen from '../HomeStackScreen/HomeStackScreen';
import ObservatoryStackScreen from '../ObservatoryStackScreen/ObservatoryStackScreen';
import SearchStackScreen from '../SearchStackScreen/SearchStackScreen';

Icon.loadFont();

const Tab = createMaterialBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator initialRouteName="Home" activeColor="#fff" shifting={true}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#EEB3A3',
          tabBarIcon: ({ color }) => <Icon name="ios-home" color={color} size={26} />,
        }}
      />
      {/*<Tab.Screen*/}
      {/*    name="Search"*/}
      {/*    component={SearchStackScreen}*/}
      {/*    options={{*/}
      {/*      tabBarLabel: 'Search',*/}
      {/*      tabBarColor: '#BCC74F',*/}
      {/*      tabBarIcon: ({ color }) => <Icon name="ios-create" color={color} size={26} />,*/}
      {/*    }}*/}
      {/*/>*/}
      <Tab.Screen
        name="Observatory"
        component={ObservatoryStackScreen}
        options={{
          tabBarLabel: 'Observatory',
          tabBarColor: '#AAD4EC',
          tabBarIcon: ({ color }) => <Icon name="ios-happy" color={color} size={26} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
