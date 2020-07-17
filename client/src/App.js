import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, ActivityIndicator, StatusBar } from 'react-native';

import { AuthContext } from './Components/context';
import RootStackScreen from './Navigation/RootStackScreen';
import MainTab from './Navigation/MainTab';
import TemplateStackScreen from './Navigation/TemplateStackScreen';
import SettingStackScreen from './Navigation/SettingStackScreen';
import DrawerContent from './Navigation/DrawerContent';
import SearchStackScreen from './Navigation/SearchStackScreen/SearchStackScreen';

const Drawer = createDrawerNavigator();

const App = () => {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(
    () => ({
      signIn: (userName, password) => {
        let userToken;
        userToken = null;
        if (userName == '' && password == '') {
          userToken = 'wefsdf';
        }
        dispatch({ type: 'LOGIN', id: userName, token: userToken });
      },
      signOut: () => {
        dispatch({ type: 'LOGOUT' });
      },
      signUp: () => {
        setUserToken('sdfswef');
        setIsLoading(false);
      },
    }),
    [],
  );

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     dispatch({ type: 'REGISTER', token: 'esfdf' });
  //   }, 1000);
  // }, []);
  //
  // if (loginState.isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <StatusBar backgroundColor="#fff" barStyle="dark-content" />
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen name="HomeDrawer" component={MainTab} />
            <Drawer.Screen name="Template" component={TemplateStackScreen} />
            <Drawer.Screen name="Search" component={SearchStackScreen} />
            <Drawer.Screen name="Setting" component={SettingStackScreen} />
          </Drawer.Navigator>
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;

// const signIn = () => {
//   Axios.post('http://localhost:5000/user/register', {
//     nickname: 'kera',
//     email: 'kera@naver.com',
//     password: '12345678',
//   })
//       .then((response) => {
//         //TODO response로 받은 값에서 토큰을 기기안에 넣어줘야함
//         console.log('response : ', response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
// };
