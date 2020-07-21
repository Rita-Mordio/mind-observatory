import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen'

import HomeStackScreen from "./Navigation/HomeStackScreen";
import ObservatoryStackScreen from "./Navigation/ObservatoryStackScreen";

const Drawer = createDrawerNavigator();

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeStackScreen} />
        <Drawer.Screen name="Observatory" component={ObservatoryStackScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center"
  },
  text: {
    fontFamily: 'Nanum Pen'
  },
  text2: {
    fontFamily: 'NotoSerifKR-Regular'
  }
});

export default App;
