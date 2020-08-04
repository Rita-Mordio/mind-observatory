import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/native';

import TodayStatus from '../Components/TodayStatus';
import DiaryViewType from '../Components/DiaryViewType';
import ImageTypeDiary from '../Components/ImageTypeDiary';
import TextTypeDiary from '../Components/TextTypeDiary';
import Context from '../Redux/contexts/context';
import COMMON from '../common';

import Alert from '../Components/Alert';

//##################################
//##################################
//############# Styled #############
//##################################
//##################################

const Container = styled.ScrollView`
  flex: 1;
`;

const DiaryScroll = styled.View`
  flex: 1;
  padding: 30px 20px;
  background-color: white;
  align-items: center;
`;

//###################################
//###################################
//############ Component ############
//###################################
//###################################

const Home = ({ navigation }) => {
  const { setHeader } = useContext(Context);

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      getDiaries();
    });

    return focusListener;
  });

  useEffect(() => {
    const tabPressListener = navigation.addListener('tabPress', (e) => {
      setHeader({ headerColor: '#efc4cd', headerTitle: '홈' });
    });

    return tabPressListener;
  }, [navigation]);

  const [diaryViewType, setDiaryViewType] = useState('image');
  const [diariesData, setDiariesData] = useState([]);

  const [alertData, setAlertData] = useState({
    show: false,
    message: '',
    onConfirmPressed: null,
  });

  const handleVieTypeToggle = (nextType) => {
    if (nextType !== diaryViewType)
      setDiaryViewType(diaryViewType === 'image' ? 'text' : 'image');
  };

  const getDiaries = () => {
    COMMON.getStoreData(
      '@userToken',
      (value) => {
        COMMON.axiosCall(
          'diary/getMyDiaries',
          { token: value },
          (object) => {
            if (COMMON.checkSuccess(object, alertData, setAlertData)) {
              setDiariesData(object.data.diaries);
            }
          },
          () => {
            setAlertData({
              ...alertData,
              show: true,
              message: '일기 리스트를 가져오는데 실패하였습니다.',
            });
          },
        );
      },
      () => {
        setAlertData({
          ...alertData,
          show: true,
          message: '사용자 토큰정보를 가져오는데 실패하였습니다.',
        });
      },
    );
  };

  const renderDiaries = () => {
    if (diaryViewType === 'image') {
      return diariesData.map((diary, index) => {
        return <ImageTypeDiary key={diary._id} diary={diary} />;
      });
    } else if (diaryViewType === 'text') {
      return diariesData.map((diary, index) => {
        return <TextTypeDiary key={diary._id} diary={diary} />;
      });
    }
  };

  return (
    <Container>
      <TodayStatus navigation={navigation} />
      <DiaryViewType
        diaryViewType={diaryViewType}
        handleVieTypeToggle={handleVieTypeToggle}
      />
      <DiaryScroll>
        {renderDiaries()}

        {/*<TextTypeDiary />*/}
        {/*<TextTypeDiary />*/}
        {/*<TextTypeDiary />*/}

        {/*<ImageTypeDiary />*/}
        {/*<ImageTypeDiary />*/}
        {/*<ImageTypeDiary />*/}
      </DiaryScroll>

      <Alert alertData={alertData} setAlertData={setAlertData} />
    </Container>
  );
};

export default Home;
