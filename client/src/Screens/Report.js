import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import styled from 'styled-components/native';
import Context from '../Redux/contexts/context';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';

import COMMON from '../common';
import SelectDate from '../Components/SelectDate';
import ReportContents from '../Components/ReportContents';
import ReportDayItem from '../Components/ReportDayItem';
import Alert from '../Components/Alert';
import Loader from '../Components/Loader';

const { width } = Dimensions.get('screen');

//##################################
//##################################
//############# Styled #############
//##################################
//##################################

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
`;

const ScrollView = styled.ScrollView`
  flex: 1;
`;

const CalendarItem = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const DatePickerWrap = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 30px;
`;

const DefaultView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;
`;

const DefaultImage = styled.Image`
  width: ${Math.round(width * 0.35)}px;
  height: ${Math.round(width * 0.35)}px;
`;

const DefaultText = styled.Text`
  font-size: 17px;
  margin-top: 20px;
  color: #3f3e3c;
`;

//###################################
//###################################
//############ Component ############
//###################################
//###################################

const Report = ({ navigation }) => {
  const { setHeader, setRefreshReport, getCommon } = useContext(Context);

  const [reportData, setReportData] = useState([]); //서버에서 가져온 Report 데이터
  const [showLoader, setShowLoader] = useState(true); //메인 로더 여부
  const [selectDate, setSelectDate] = useState({
    year: moment().format('YYYY'),
    month: moment().format('MM'),
  }); //선택된 날짜
  const [alertData, setAlertData] = useState({
    show: false,
    message: '',
    onConfirmPressed: null,
    confirmButtonColor: '#AAD4EC',
  });

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      if (getCommon().refreshReport) {
        setShowLoader(true);
        getReportWeather();
      }
    });

    return focusListener;
  });

  useEffect(() => {
    setHeader({ headerColor: '#AAD4EC', headerTitle: '관측 보고서' });
    getReportWeather();

    const unsubscribe = navigation.addListener('tabPress', (e) => {
      setHeader({ headerColor: '#AAD4EC', headerTitle: '관측 보고서' });
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getReportWeather();
  }, [selectDate]);

  const getReportWeather = () => {
    COMMON.getStoreData(
      '@userToken',
      (value) => {
        COMMON.axiosCall(
          'diary/getReport',
          {
            token: value,
            selectDate,
          },
          (object) => {
            if (COMMON.checkSuccess(object, alertData, setAlertData)) {
              setReportData(object.data.report);
              setShowLoader(false);
              setRefreshReport(false);
            }
          },
          () => {
            setShowLoader(false);
            setAlertData({
              ...alertData,
              show: true,
              message:
                '서버 응답 지연으로, 날씨정보를 가져오지 못했습니다. 관리자에게 문의해주세요.',
            });
          },
        );
      },
      () => {
        setShowLoader(false);
        setAlertData({
          ...alertData,
          show: true,
          message: '사용자 토큰정보를 가져오는데 실패하였습니다.',
        });
      },
    );
  };

  const renderDayItem = () => {
    if (reportData.weather.length !== 0) {
      return reportData.weather.map((item, index) => {
        return (
          <ReportDayItem
            index={index}
            weather={item.weather}
            date={item.createdAt}
            key={item._id}
          />
        );
      });
    }
  };

  const handlePickerChange = (name, value) => {
    setShowLoader(true);
    setSelectDate({
      ...selectDate,
      [name]: value,
    });
  };

  return (
    <Container>
      <DatePickerWrap>
        <SelectDate
          type={'year'}
          value={selectDate}
          handlePickerChange={handlePickerChange}
        />
        <SelectDate
          type={'month'}
          value={selectDate}
          handlePickerChange={handlePickerChange}
        />
      </DatePickerWrap>
      {showLoader === true && <Loader />}
      {showLoader === false && (
        <Animatable.View style={{ flex: 1 }} animation="fadeIn" duration={1500}>
          {reportData.weather.length === 0 && (
            <DefaultView>
              <DefaultImage source={require(`../../assets/images/empty.png`)} />
              <DefaultText>관측된 일기 정보가 없어요.</DefaultText>
            </DefaultView>
          )}

          {reportData.weather.length !== 0 && (
            <ScrollView>
              <ReportContents data={reportData} />
              <CalendarItem>{renderDayItem()}</CalendarItem>
            </ScrollView>
          )}
        </Animatable.View>
      )}
      <Alert alertData={alertData} setAlertData={setAlertData} />
    </Container>
  );
};

export default Report;
