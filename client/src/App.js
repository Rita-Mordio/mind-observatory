import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SplashScreen from 'react-native-splash-screen';

import RootStackScreen from "./Navigation/RootStackScreen";
import MainTabScreen from './Navigation/MainTabScreen';
import DrawerContentScreen from "./Navigation/DrawerContentScreen";

const Drawer = createDrawerNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      {/*<Drawer.Navigator drawerContent={(props) => <DrawerContentScreen {...props} />}>*/}
      {/*  <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />*/}
      {/*</Drawer.Navigator>*/}
      <RootStackScreen />
    </NavigationContainer>
  );
};

export default App;
