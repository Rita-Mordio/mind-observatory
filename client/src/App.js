import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SplashScreen from 'react-native-splash-screen';

import AuthContext from './Redux/contexts/authContext';
import { SIGN_IN, SIGN_OUT } from './Redux/constants/actionTypes';
import { authReducer, initialAuthState } from './Redux/reducers/authReducer';
import RootStackScreen from './Navigation/RootStackScreen';
import MainTabScreen from './Navigation/MainTabScreen';
import DrawerContentScreen from './Navigation/DrawerContentScreen';

const Drawer = createDrawerNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const [loginState, dispatch] = useReducer(authReducer, initialAuthState);

  const authContext = useMemo(
    () => ({
      signIn: (userToken) => {
        dispatch({ type: SIGN_IN, userToken: userToken });
      },
      signOut: () => {
        dispatch({ type: SIGN_OUT });
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <Drawer.Navigator
            drawerContent={(props) => <DrawerContentScreen {...props} />}
          >
            <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
          </Drawer.Navigator>
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
