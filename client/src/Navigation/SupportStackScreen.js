import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';

import Support from "../Screens/Support";

const SupportStack = createStackNavigator();

const SupportStackScreen = ({ navigation }) => {
  return (
    <SupportStack.Navigator
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
      <SupportStack.Screen
        name="Support"
        component={Support}
        options={{
          title: '문의하기',
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
    </SupportStack.Navigator>
  );
};

export default SupportStackScreen;
