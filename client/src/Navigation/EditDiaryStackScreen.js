import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RNS3 } from 'react-native-aws3';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

import EditDiary from '../Screens/EditDiary';

import FileContext from '../Redux/contexts/fileContext';
import AWS_KEY from '../AWS_Key';

const EditDiaryStack = createStackNavigator();

const EditDiaryStackScreen = ({ navigation }) => {
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
    <EditDiaryStack.Navigator
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
      <EditDiaryStack.Screen
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
    </EditDiaryStack.Navigator>
  );
};

export default EditDiaryStackScreen;
