import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RNS3 } from 'react-native-aws3';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

import Home from '../Screens/Home';
import EditDiary from '../Screens/EditDiary';

import FileContext from '../Redux/contexts/fileContext';
import AWS_KEY from '../AWS_Key';

const HomeStack = createStackNavigator();

const HomeStackScreen = ({ navigation }) => {
  const { getFile } = useContext(FileContext);

  const awsConfig = {
    keyPrefix: 'images/',
    bucket: 'mind-observatory',
    region: 'ap-northeast-2',
    accessKey: AWS_KEY.accessKey,
    secretKey: AWS_KEY.secretKey,
    successActionStatus: 201,
  };

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#efc4cd',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          title: '홈',
          headerLeft: () => (
            <Ionicons.Button
              name="ios-menu"
              size={25}
              backgroundColor="#efc4cd"
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="EditDiary"
        component={EditDiary}
        options={{
          title: '일기 쓰기',
          headerLeft: () => (
            <Ionicons.Button
              name="arrow-back-outline"
              size={30}
              backgroundColor="#efc4cd"
              onPress={() => {
                navigation.navigate('Home');
              }}
            />
          ),
          headerRight: () => (
            <FontAwesome.Button
              name="edit"
              size={24}
              backgroundColor="#efc4cd"
              onPress={() => {
                RNS3.put(getFile(), awsConfig)
                  .then((result) => {
                    console.log(result);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            />
          ),
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
