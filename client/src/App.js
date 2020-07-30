import React, { useEffect, useMemo, useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SplashScreen from 'react-native-splash-screen';

import Context from './Redux/contexts/context';
import {
  SIGN_IN,
  SIGN_OUT,
  SET_FILE,
  SET_HEADER,
} from './Redux/constants/actionTypes';
import { authReducer, initialAuthState } from './Redux/reducers/authReducer';
import { fileReducer, initialFileState } from './Redux/reducers/fileReducer';

import RootStackScreen from './Navigation/RootStackScreen';
import DrawerContentScreen from './Navigation/DrawerContentScreen';
import MainStackScreen from './Navigation/MainStackScreen';
import { initialThemeState, themeReducer } from './Redux/reducers/themeReducer';

const Drawer = createDrawerNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);
  const [fileState, fileDispatch] = useReducer(fileReducer, initialFileState);
  const [themeState, themeDispatch] = useReducer(
    themeReducer,
    initialThemeState,
  );

  const context = useMemo(
    () => ({
      signIn: (userToken) => {
        authDispatch({ type: SIGN_IN, userToken: userToken });
      },
      signOut: () => {
        authDispatch({ type: SIGN_OUT });
      },
      setFile: (file) => {
        fileDispatch({ type: SET_FILE, file: file });
      },
      getFile: () => {
        return fileState;
      },
      setHeader: (theme) => {
        themeDispatch({ type: SET_HEADER, theme: theme });
      },
      getTheme: () => {
        return themeState;
      },
    }),
    [fileState, themeState],
  );

  return (
    <Context.Provider value={context}>
      <NavigationContainer>
        {authState.userToken !== null ? (
          <Drawer.Navigator
            drawerContent={(props) => <DrawerContentScreen {...props} />}
          >
            <Drawer.Screen name="HomeDrawer" component={MainStackScreen} />
          </Drawer.Navigator>
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
    </Context.Provider>
  );
};

export default App;
