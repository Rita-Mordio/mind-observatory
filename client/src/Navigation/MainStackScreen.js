import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

import { RNS3 } from 'react-native-aws3';

import MainTabScreen from './MainTabScreen';
import MyAccount from '../Screens/MyAccount';
import Support from '../Screens/Support';
import AppInfo from '../Screens/AppInfo';
import EditDiarySimple from '../Screens/EditDiary-simple';
import EditDiaryDetail from '../Screens/EditDiary-detail';
import ViewDiarySimple from '../Screens/ViewDiary-simple';
import ViewDiaryDetail from '../Screens/ViewDiary-detail';
import Context from '../Redux/contexts/context';
import COMMON from '../common';
import AWS_KEY from '../AWS_Key';
import Template from '../Screens/Template';

const MainStack = createStackNavigator();

const MainStackScreen = ({ route, navigation }) => {
  const {
    getTheme,
    initDiary,
    getDiary,
    setRefreshObservatory,
    setRefreshReport,
    setHistoryCount,
  } = useContext(Context);

  const awsConfig = {
    keyPrefix: 'images/',
    bucket: 'mind-observatory',
    region: 'ap-northeast-2',
    accessKey: AWS_KEY.accessKey,
    secretKey: AWS_KEY.secretKey,
    successActionStatus: 201,
  };

  //일기 저장
  const saveDiary = (url, diaryData) => {
    COMMON.axiosCall(
      url,
      diaryData,
      (result) => {
        if (!result.data.success) alert(result.data.message);
        setRefreshObservatory(true); //홈 화면 데이터 새로 불러오도록 변경
        setRefreshReport(true); //리포트 화면 데이터 새로 불러오도록 변경
        if (COMMON.isEmptyValue(diaryData._id)) {
          setHistoryCount(result.data.count); // 전체 기록 일수 변경
          COMMON.setStoreData('@historyCount', result.data.count, () => {
            alert('기록 전체 개수를 저장하는데 문제가 발생했습니다.');
          });
        }
        initDiary(); //저장하기위해 담아뒀던 일기 객체 초기화
        navigation.navigate('Main');
      },
      (error) => {
        console.log(error);
      },
    );
  };

  //일기 저장을 위한 준비
  const processDiary = () => {
    const diaryData = getDiary();
    let url = '';

    if (COMMON.isEmptyValue(diaryData.title)) {
      alert('제목을 입력해 주세요.');
      return false;
    } else if (COMMON.isEmptyValue(diaryData.contents[0])) {
      alert('내용을 입력해 주세요.');
      return false;
    } else if (COMMON.isEmptyValue(diaryData.images.length === 0)) {
      alert('이미지를 선택해 주세요.');
      return false;
    }

    //저장 할지 수정 할지 분기처리
    if (COMMON.isEmptyValue(diaryData._id)) url = 'diary/addDiary';
    else url = 'diary/editDiary';

    if (typeof diaryData.images[0] === 'string') {
      saveDiary(url, diaryData);
    } else {
      //S3에 이미지 업로드
      RNS3.put(diaryData.images[0], awsConfig)
        .then((result) => {
          diaryData.images[0] = result.body.postResponse.location;
          saveDiary(url, diaryData);
        })
        .catch((error) => {
          alert(
            '이미지를 서버로 전송중 문제가 발생하였습니다. 관리자에게 문의해주세요.',
          );
        });
    }
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
            fontWeight: 'bold',
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
            fontWeight: 'bold',
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
        name="ViewDiaryDetail"
        component={ViewDiaryDetail}
        options={{
          title: '기록 보관소',
          headerStyle: { backgroundColor: '#efc4cd' },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#ffffff',
            fontWeight: 'bold',
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
            fontWeight: 'bold',
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
            fontWeight: 'bold',
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
            <Feather.Button
              name="check-square"
              size={26}
              backgroundColor="#efc4cd"
              onPress={processDiary}
            />
          ),
        }}
      />

      <MainStack.Screen
        name="EditDiaryDetail"
        component={EditDiaryDetail}
        options={{
          title: '일기 쓰기',
          headerStyle: { backgroundColor: '#efc4cd' },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#ffffff',
            fontWeight: 'bold',
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
            <Feather.Button
              name="check-square"
              size={26}
              backgroundColor="#efc4cd"
              onPress={processDiary}
            />
          ),
        }}
      />

      <MainStack.Screen
        name="MyAccount"
        component={MyAccount}
        options={{
          title: '내 정보 변경',
          headerStyle: { backgroundColor: '#BCC74F' },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#ffffff',
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <Ionicons.Button
              name="arrow-back-outline"
              size={30}
              backgroundColor="#BCC74F"
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        }}
      />

      <MainStack.Screen
        name="Support"
        component={Support}
        options={{
          title: '문의하기',
          headerStyle: { backgroundColor: '#BCC74F' },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#ffffff',
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <Ionicons.Button
              name="arrow-back-outline"
              size={30}
              backgroundColor="#BCC74F"
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        }}
      />

      <MainStack.Screen
        name="AppInfo"
        component={AppInfo}
        options={{
          title: '앱 정보',
          headerStyle: { backgroundColor: '#BCC74F' },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#ffffff',
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <Ionicons.Button
              name="arrow-back-outline"
              size={30}
              backgroundColor="#BCC74F"
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        }}
      />
    </MainStack.Navigator>
  );
};

export default MainStackScreen;
