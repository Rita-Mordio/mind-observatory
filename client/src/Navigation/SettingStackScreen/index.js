import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import Setting from '../../Screens/Setting';

Icon.loadFont();

const SettingStack = createStackNavigator();

const SettingStackScreen = ({ navigation }) => {
  return (
    <SettingStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#e7dfd1',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <SettingStack.Screen
        name="Setting"
        component={Setting}
        options={{
          title: '설정',
          headerLeft: () => (
            <Icon.Button
              name="ios-arrow-round-back"
              size={30}
              backgroundColor="#e7dfd1"
              color="#000"
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        }}
      />
    </SettingStack.Navigator>
  );
};

export default SettingStackScreen;
