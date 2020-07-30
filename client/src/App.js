import React, { useEffect, useMemo, useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SplashScreen from 'react-native-splash-screen';

import AuthContext from './Redux/contexts/authContext';
import FileContext from './Redux/contexts/fileContext';
import { SIGN_IN, SIGN_OUT, SET_FILE } from './Redux/constants/actionTypes';
import { authReducer, initialAuthState } from './Redux/reducers/authReducer';
import { fileReducer, initialFileState } from './Redux/reducers/fileReducer';

import RootStackScreen from './Navigation/RootStackScreen';
import MainTabScreen from './Navigation/MainTabScreen';
import EditDiaryStackScreen from './Navigation/EditDiaryStackScreen';
import DrawerContentScreen from './Navigation/DrawerContentScreen';

const Drawer = createDrawerNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);
  const [fileState, fileDispatch] = useReducer(fileReducer, initialFileState);

  const authContext = useMemo(
    () => ({
      signIn: (userToken) => {
        authDispatch({ type: SIGN_IN, userToken: userToken });
      },
      signOut: () => {
        authDispatch({ type: SIGN_OUT });
      },
    }),
    [],
  );

  const fileContext = useMemo(
    () => ({
      setFile: (file) => {
        fileDispatch({ type: SET_FILE, file: file });
      },
      getFile: () => {
        return fileState;
      },
    }),
    [fileState],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {authState.userToken !== null ? (
          <FileContext.Provider value={fileContext}>
            <Drawer.Navigator
              drawerContent={(props) => <DrawerContentScreen {...props} />}
            >
              <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
              {/*<Drawer.Screen*/}
              {/*  name="EditDiary"*/}
              {/*  component={EditDiaryStackScreen}*/}
              {/*/>*/}
            </Drawer.Navigator>
          </FileContext.Provider>
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
