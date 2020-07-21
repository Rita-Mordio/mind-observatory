import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Observatory from '../Screens/Observatory';
import Icon from 'react-native-vector-icons/Ionicons';

const ObservatoryStack = createStackNavigator();

const ObservatoryStackScreen = ({navigation}) => {
  return (
    <ObservatoryStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#AAD4EC',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <ObservatoryStack.Screen
        name="Observatory"
        component={Observatory}
        options={{
          title: '내 마음 관측소',
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#AAD4EC"
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}
      />
    </ObservatoryStack.Navigator>
  );
};

export default ObservatoryStackScreen;
