import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { RNS3 } from 'react-native-aws3';

import MainTabScreen from './MainTabScreen';
import EditDiarySimple from '../Screens/EditDiary-simple';
import Context from '../Redux/contexts/context';
import AWS_KEY from '../AWS_Key';
import Template from '../Screens/Template';

const MainStack = createStackNavigator();

const MainStackScreen = ({ navigation }) => {
  const { getFile, getTheme } = useContext(Context);

  const awsConfig = {
    keyPrefix: 'images/',
    bucket: 'mind-observatory',
    region: 'ap-northeast-2',
    accessKey: AWS_KEY.accessKey,
    secretKey: AWS_KEY.secretKey,
    successActionStatus: 201,
  };

  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Main"
        component={MainTabScreen}
        options={{
          title: getTheme().headerTitle,
          headerStyle: { backgroundColor: getTheme().headerColor },
          headerTitleStyle: {
            color: '#ffffff',
          },
          headerLeft: () => (
            <Ionicons.Button
              name="ios-menu"
              size={25}
              backgroundColor={getTheme().headerColor}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}
      />
      <MainStack.Screen
        name="Template"
        component={Template}
        options={{
          title: '템플릿 선택',
          headerStyle: { backgroundColor: '#efc4cd' },
          headerTitleStyle: {
            color: '#ffffff',
          },
          headerLeft: () => (
            <Ionicons.Button
              name="arrow-back-outline"
              size={30}
              backgroundColor="#efc4cd"
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        }}
      />
      <MainStack.Screen
        name="EditDiarySimple"
        component={EditDiarySimple}
        options={{
          title: '일기 쓰기',
          headerStyle: { backgroundColor: '#efc4cd' },
          headerTitleStyle: {
            color: '#ffffff',
          },
          headerLeft: () => (
            <Ionicons.Button
              name="arrow-back-outline"
              size={30}
              backgroundColor="#efc4cd"
              onPress={() => {
                navigation.goBack();
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
    </MainStack.Navigator>
  );
};

export default MainStackScreen;
