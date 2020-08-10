import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { RNS3 } from 'react-native-aws3';

import MainTabScreen from './MainTabScreen';
import EditDiarySimple from '../Screens/EditDiary-simple';
import ViewDiarySimple from '../Screens/ViewDiary-simple';
import Context from '../Redux/contexts/context';
import AWS_KEY from '../AWS_Key';
import Template from '../Screens/Template';
import COMMON from '../common';

const MainStack = createStackNavigator();

const MainStackScreen = ({ route, navigation }) => {
  const { getTheme, getDiary, setCommon } = useContext(Context);

  const awsConfig = {
    keyPrefix: 'images/',
    bucket: 'mind-observatory',
    region: 'ap-northeast-2',
    accessKey: AWS_KEY.accessKey,
    secretKey: AWS_KEY.secretKey,
    successActionStatus: 201,
  };

  const saveDiary = () => {
    const diaryData = getDiary();
    let url = '';

    if (COMMON.isEmptyValue(diaryData.title)) {
      alert('제목을 입력해 주세요.');
      return false;
    } else if (COMMON.isEmptyValue(diaryData.contents[0])) {
      alert('내용을 입력해 주세요.');
      return false;
    } else if (COMMON.isEmptyValue(diaryData.images[0].uri)) {
      alert('이미지를 선택해 주세요.');
      return false;
    }

    if (COMMON.isEmptyValue(diaryData.diaryId)) {
      url = 'diary/addDiary';
    } else {
      url = 'diary/editDiary';
    }

    RNS3.put(diaryData.images[0], awsConfig)
      .then((result) => {
        diaryData.images[0] = result.body.postResponse.location;
        COMMON.axiosCall(
          url,
          diaryData,
          (result) => {
            if (!result.data.success)
              alert('서버 문제로 저장에 실패하였습니다.');
            setCommon(true);
            navigation.navigate('Main');
          },
          (error) => {
            console.log(error);
          },
        );
      })
      .catch((error) => {
        alert(
          '이미지를 서버로 전송중 문제가 발생하였습니다. 관리자에게 문의해주세요.',
        );
      });
  };

  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Main"
        component={MainTabScreen}
        options={{
          title: getTheme().headerTitle,
          headerTitleAlign: 'center',
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
        name="ViewDiarySimple"
        component={ViewDiarySimple}
        options={{
          title: '기록 보관소',
          headerStyle: { backgroundColor: '#efc4cd' },
          headerTitleAlign: 'center',
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
              name="pencil-ruler"
              size={24}
              backgroundColor="#efc4cd"
              onPress={() => {
                const diary = route.state.routes[1].params.diary;
                navigation.navigate(
                  COMMON.getEditTemplateNameByNo(diary.templateType),
                  {
                    diary,
                  },
                );
              }}
            />
          ),
        }}
      />
      <MainStack.Screen
        name="Template"
        component={Template}
        options={{
          title: '일기 쓰기',
          headerStyle: { backgroundColor: '#efc4cd' },
          headerTitleAlign: 'center',
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
          headerTitleAlign: 'center',
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
              onPress={saveDiary}
            />
          ),
        }}
      />
    </MainStack.Navigator>
  );
};

export default MainStackScreen;
