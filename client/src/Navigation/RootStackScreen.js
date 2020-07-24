import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Intro from '../Screens/Intro';
import SignIn from '../Screens/SignIn';
import SignUp from '../Screens/SignUp';
import FindPassword from '../Screens/FindPassword';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name="Intro" component={Intro} />
      <RootStack.Screen name="SignUp" component={SignUp} />
      <RootStack.Screen name="SignIn" component={SignIn} />
      <RootStack.Screen name="FindPassword" component={FindPassword} />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
