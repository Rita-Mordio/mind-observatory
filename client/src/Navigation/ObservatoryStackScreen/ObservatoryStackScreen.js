import React from 'react';
import Observatory from '../../Screens/Observatory';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';

Icon.loadFont();

const ObservatoryStack = createStackNavigator();

const ObservatoryStackScreen = ({ navigation }) => {
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
      }}
    >
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
          // headerRight: () => (
          //   <Icon.Button
          //     name="ios-create"
          //     size={25}
          //     backgroundColor="#AAD4EC"
          //     onPress={() => {
          //       navigation.navigate('Template');
          //     }}
          //   />
          // ),
        }}
      />
    </ObservatoryStack.Navigator>
  );
};

export default ObservatoryStackScreen;
