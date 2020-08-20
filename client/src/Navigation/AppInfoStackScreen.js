import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';

import AppInfo from "../Screens/AppInfo";

const AppInfoStack = createStackNavigator();

const AppInfoStackScreen = ({ navigation }) => {
  return (
    <AppInfoStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#BCC74F',
        },
        headerTitleStyle: {
          color: '#ffffff',
          fontWeight: 'bold',
        },
      }}
    >
      <AppInfoStack.Screen
        name="AppInfo"
        component={AppInfo}
        options={{
          title: '앱 정보',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Icon.Button
              name="arrow-back-outline"
              size={30}
              backgroundColor="#BCC74F"
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        }}
      />
    </AppInfoStack.Navigator>
  );
};

export default AppInfoStackScreen;
