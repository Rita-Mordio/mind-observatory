import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';

import MyAccount from '../Screens/MyAccount';

const MyAccountStack = createStackNavigator();

const MyAccountStackScreen = ({ navigation }) => {
  return (
    <MyAccountStack.Navigator
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
      <MyAccountStack.Screen
        name="MyAccount"
        component={MyAccount}
        options={{
          title: '내 정보 변경',
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
    </MyAccountStack.Navigator>
  );
};

export default MyAccountStackScreen;
