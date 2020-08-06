import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import _ from 'lodash';

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
  background-color: #ffffff;
`;

const DiariesView = styled.View`
  flex: 1;
  padding: 30px 20px;
  background-color: white;
  align-items: center;
`;

const ActivityIndicator = styled.ActivityIndicator`
  margin-bottom: 50px;
`;

//###################################
//###################################
//############ Component ############
//###################################
//###################################

const Home = ({ navigation }) => {
  const { setHeader, setCommon, getCommon } = useContext(Context);

  const [page, setPage] = useState(1);
  const [showSpinner, setShowSpinner] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [diaryViewType, setDiaryViewType] = useState('image');
  const [diariesData, setDiariesData] = useState([]);

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      if (getCommon().isChangeDiaryData) {
        setPage(1);
        setShowSpinner(true);
        getDiaries();
      }
    });

    return focusListener;
  });

  useEffect(() => {
    const tabPressListener = navigation.addListener('tabPress', (e) => {
      setHeader({ headerColor: '#efc4cd', headerTitle: '홈' });
    });

    return tabPressListener;
  }, [navigation]);

  useEffect(() => {
    if (page !== 1) {
      setShowSpinner(true);
      getDiaries();
    }
  }, [page]);

  useEffect(() => {
    getDiaries();
  }, []);

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
          {
            token: value,
            page: getCommon().isChangeDiaryData ? 1 : page,
          },
          (object) => {
            setShowSpinner(false);
            if (COMMON.checkSuccess(object, alertData, setAlertData)) {
              if (getCommon().isChangeDiaryData) {
                setDiariesData(object.data.diaries);
                setCommon(false);
                setIsLastPage(false);
              } else {
                setDiariesData(diariesData.concat(object.data.diaries));
                setIsLastPage(object.data.diaries.length === 0);
              }
            }
          },
          (error) => {
            setShowSpinner(false);
            setAlertData({
              ...alertData,
              show: true,
              message:
                '서버 응답 지연으로, 일기목록을 가져오지 못했습니다. 관리자에게 문의해주세요.',
            });
          },
        );
      },
      () => {
        setShowSpinner(false);
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
        return <ImageTypeDiary key={diary._id} diary={diary} navigation={navigation} />;
      });
    } else if (diaryViewType === 'text') {
      return diariesData.map((diary, index) => {
        return <TextTypeDiary key={diary._id} diary={diary} navigation={navigation} />;
      });
    }
  };

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 1;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const setPageThrottle = _.throttle(() => {
    if (!isLastPage) setPage(page + 1);
  }, 500);

  return (
    <Container
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          setPageThrottle();
        }
      }}
    >
      <TodayStatus navigation={navigation} recentDiary={diariesData[0]} />
      <DiaryViewType
        diaryViewType={diaryViewType}
        handleVieTypeToggle={handleVieTypeToggle}
      />
      <DiariesView>{renderDiaries()}</DiariesView>
      {showSpinner && <ActivityIndicator size="large" color="#efc4cd" />}

      <Alert alertData={alertData} setAlertData={setAlertData} />
    </Container>
  );
};

export default Home;
