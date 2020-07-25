import React, {useEffect, useMemo, useReducer, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SplashScreen from 'react-native-splash-screen';

import COMMON from './common';
import { AuthContext } from './context';
import RootStackScreen from './Navigation/RootStackScreen';
import MainTabScreen from './Navigation/MainTabScreen';
import DrawerContentScreen from './Navigation/DrawerContentScreen';

const Drawer = createDrawerNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();

    // COMMON.getStoreData(
    //   '@isAutoSignUp',
    //   (value) => {
    //     if (value === 'true') {
    //       COMMON.getStoreData(
    //         '@userToken',
    //         (value) => {
    //           if (value !== null) {
    //             // alert('자동 로그인 성공');
    //           }
    //         },
    //         () => {
    //           alert('사용자 토큰 가져오기 실패');
    //         },
    //       );
    //     }
    //   },
    //   () => {
    //     alert('자동 로그인 정보 가져오기 실패');
    //   },
    // );
  }, []);

  // const [userToken, setUserToken] = useState(null);

  const initialAuthState = {
    userToken: null,
  };

  const authReducer = (prevState, action) => {
    switch (action.type) {
      case 'SIGN_IN':
        return {
          ...prevState,
          userToken: action.userToken,
        };
      case 'SIGN_OUT':
        return {
          ...prevState,
          userToken: null,
        };
    }
  };

  const [loginState, dispatch] = useReducer(authReducer, initialAuthState)

  const authContext = useMemo(
    () => ({
      signIn: (userToken) => {
        dispatch({ type: 'SIGN_IN', userToken: userToken})
      },
      signOut: () => {
        dispatch({ type: 'SIGN_OUT' })
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
