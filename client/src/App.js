import React, { useEffect, useMemo, useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SplashScreen from 'react-native-splash-screen';

import Context from './Redux/contexts/context';
import {
  SIGN_IN,
  SIGN_OUT,
  SET_DIARY,
  INIT_DIARY,
  SET_HEADER,
  SET_REFRESH_OBSERVATORY,
  SET_REFRESH_REPORT,
  SET_HISTORY_COUNT,
  SET_ACCOUNT,
} from './Redux/constants/actionTypes';
import { authReducer, initialAuthState } from './Redux/reducers/authReducer';
import { diaryReducer, initialDiaryState } from './Redux/reducers/diaryReducer';
import { themeReducer, initialThemeState } from './Redux/reducers/themeReducer';
import { userReducer, initialUserState } from './Redux/reducers/userReducer';
import {
  commonReducer,
  initialCommonState,
} from './Redux/reducers/commonReducer';

import RootStackScreen from './Navigation/RootStackScreen';
import DrawerContentScreen from './Navigation/DrawerContentScreen';
import MainStackScreen from './Navigation/MainStackScreen';

const Drawer = createDrawerNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const [diaryState, diaryDispatch] = useReducer(
    diaryReducer,
    initialDiaryState,
  );
  const [themeState, themeDispatch] = useReducer(
    themeReducer,
    initialThemeState,
  );
  const [commonState, commonDispatch] = useReducer(
    commonReducer,
    initialCommonState,
  );

  const context = useMemo(
    () => ({
      signIn: (userToken) => {
        authDispatch({ type: SIGN_IN, payload: userToken });
      },
      signOut: () => {
        authDispatch({ type: SIGN_OUT });
      },
      setDiary: (diary) => {
        diaryDispatch({ type: SET_DIARY, payload: diary });
      },
      getDiary: () => {
        return diaryState;
      },
      initDiary: () => {
        diaryDispatch({ type: INIT_DIARY });
      },
      setHeader: (theme) => {
        themeDispatch({ type: SET_HEADER, payload: theme });
      },
      getTheme: () => {
        return themeState;
      },
      setHistoryCount: (value) => {
        userDispatch({ type: SET_HISTORY_COUNT, payload: value });
      },
      setAccount: (account) => {
        userDispatch({ type: SET_ACCOUNT, payload: account });
      },
      getUser: () => {
        return userState;
      },
      setRefreshObservatory: (value) => {
        commonDispatch({ type: SET_REFRESH_OBSERVATORY, payload: value });
      },
      setRefreshReport: (value) => {
        commonDispatch({ type: SET_REFRESH_REPORT, payload: value });
      },
      getCommon: () => {
        return commonState;
      },
    }),
    [commonState, diaryState, themeState, userState],
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
