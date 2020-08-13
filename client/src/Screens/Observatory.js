import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import _ from 'lodash';

import TodayStatus from '../Components/TodayStatus';
import SelectDiaryViewType from '../Components/SelectDiaryViewType';
import ImageTypeDiaryItem from '../Components/ImageTypeDiaryItem';
import TextTypeDiaryItem from '../Components/TextTypeDiaryItem';
import Context from '../Redux/contexts/context';
import COMMON from '../common';

import Alert from '../Components/Alert';
import Loader from '../Components/Loader';
import * as Animatable from 'react-native-animatable';

//##################################
//##################################
//############# Styled #############
//##################################
//##################################

const Container = styled.View`
  flex: 1;
`;

const ScrollView = styled.ScrollView`
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

const Observatory = ({ navigation }) => {
  const { setHeader, setCommon, getCommon } = useContext(Context);

  const [page, setPage] = useState(1);
  const [showLoader, setShowLoader] = useState(true); //메인 로더 여부
  const [showBottomSpinner, setShowBottomSpinner] = useState(false); //하단 스피너 여부
  const [isLastPage, setIsLastPage] = useState(false); //마지막 페이지인지 확인용, 마지막 페이지 일때는 하단 스크롤을 해도 더이상 Axios 호출을 안함
  const [diaryViewType, setDiaryViewType] = useState('image'); //일기 모양을 이미지형 or 글자형 보여질 형태 선택
  const [diariesData, setDiariesData] = useState([]); //가져온 다이어리 데이터들

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      if (getCommon().isChangeDiaryData) {
        setPage(1);
        setShowBottomSpinner(true);
        getDiaries();
      }
    });

    return focusListener;
  });

  useEffect(() => {
    const tabPressListener = navigation.addListener('tabPress', (e) => {
      setHeader({ headerColor: '#efc4cd', headerTitle: '내 마음 관측소' });
    });

    return tabPressListener;
  }, [navigation]);

  useEffect(() => {
    if (page !== 1) {
      setShowBottomSpinner(true);
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
            setShowLoader(false);
            setShowBottomSpinner(false);
            if (COMMON.checkSuccess(object, alertData, setAlertData)) {
              if (getCommon().isChangeDiaryData) {
                setDiariesData(object.data.diaries);
                setCommon(false);
                setIsLastPage(false);
              } else {
                setDiariesData(diariesData.concat(object.data.diaries));
                setIsLastPage(object.data.diaries.length < 10);
              }
            }
          },
          (error) => {
            setShowBottomSpinner(false);
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
        setShowBottomSpinner(false);
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
        return (
          <ImageTypeDiaryItem
            key={diary._id}
            diary={diary}
            navigation={navigation}
          />
        );
      });
    } else if (diaryViewType === 'text') {
      return diariesData.map((diary, index) => {
        return (
          <TextTypeDiaryItem
            key={diary._id}
            diary={diary}
            navigation={navigation}
          />
        );
      });
    }
  };

  const isCloseToBottom = ({
    // 스크롤이 맨 밑으로 내려갔는지 확인
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

  if (showLoader) {
    return <Loader />;
  } else {
    return (
      <Container as={Animatable.View} animation="fadeIn" duration={1500}>
        <ScrollView
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              setPageThrottle();
            }
          }}
        >
          <TodayStatus navigation={navigation} recentDiary={diariesData[0]} />
          <SelectDiaryViewType
            diaryViewType={diaryViewType}
            handleVieTypeToggle={handleVieTypeToggle}
          />
          <DiariesView>{renderDiaries()}</DiariesView>
          {showBottomSpinner && (
            <ActivityIndicator size="large" color="#efc4cd" />
          )}

          <Alert alertData={alertData} setAlertData={setAlertData} />
        </ScrollView>
      </Container>
    );
  }
};

export default Observatory;
