import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Context from '../Redux/contexts/context';
import moment from 'moment';
import { Picker } from '@react-native-community/picker';

import COMMON from '../common';
import Alert from '../Components/Alert';
import ReportDayItem from '../Components/ReportDayItem';
import Loader from '../Components/Loader';

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

const ReportWeekItem = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const DatePickerWrap = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 30px;
`;

const Border = styled.View`
  margin: 0px 5px;
  border-width: 1px;
  border-color: #dddddd;
  border-radius: 10px;
  width: 40%;
`;

const DatePicker = styled.View``;

//###################################
//###################################
//############ Component ############
//###################################
//###################################

const Report = ({ navigation }) => {
  const { setHeader, setRefreshReport, getCommon } = useContext(Context);

  const [weather, setWeather] = useState([]); //서버에서 가져온 날씨들
  const [showLoader, setShowLoader] = useState(true); //메인 로더 여부
  const [selectDate, setSelectDate] = useState({
    year: moment().format('YYYY'),
    month: moment().format('MM'),
  }); //선택된 날짜
  const [alertData, setAlertData] = useState({
    show: false,
    message: '',
    onConfirmPressed: null,
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
              setWeather(object.data.weather);
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
        setAlertData({
          ...alertData,
          show: true,
          message: '사용자 토큰정보를 가져오는데 실패하였습니다.',
        });
      },
    );
  };

  const renderWeather = () => {
    if (weather.length !== 0) {
      return weather.map((item, index) => {
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
    setSelectDate({
      ...selectDate,
      [name]: value,
    });
  };

  if (showLoader) {
    return <Loader />;
  } else {
    return (
      <Container>
        <DatePickerWrap>
          <Border>
            <DatePicker
              as={Picker}
              selectedValue={selectDate.year}
              onValueChange={(itemValue) => {
                handlePickerChange('year', itemValue);
              }}
            >
              <Picker.Item color="#3f3e3c" label="2020년" value="2020" />
              <Picker.Item color="#3f3e3c" label="2021년" value="2021" />
              <Picker.Item color="#3f3e3c" label="2022년" value="2022" />
            </DatePicker>
          </Border>
          <Border>
            <DatePicker
              as={Picker}
              selectedValue={selectDate.month}
              onValueChange={(itemValue) => {
                handlePickerChange('month', itemValue);
              }}
            >
              <Picker.Item color="#3f3e3c" label="1월" value="01" />
              <Picker.Item color="#3f3e3c" label="2월" value="02" />
              <Picker.Item color="#3f3e3c" label="3월" value="03" />
              <Picker.Item color="#3f3e3c" label="4월" value="04" />
              <Picker.Item color="#3f3e3c" label="5월" value="05" />
              <Picker.Item color="#3f3e3c" label="6월" value="06" />
              <Picker.Item color="#3f3e3c" label="7월" value="07" />
              <Picker.Item color="#3f3e3c" label="8월" value="08" />
              <Picker.Item color="#3f3e3c" label="9월" value="09" />
              <Picker.Item color="#3f3e3c" label="10월" value="10" />
              <Picker.Item color="#3f3e3c" label="11월" value="11" />
              <Picker.Item color="#3f3e3c" label="12월" value="12" />
            </DatePicker>
          </Border>
        </DatePickerWrap>
        <ReportWeekItem>{renderWeather()}</ReportWeekItem>
        <Alert alertData={alertData} setAlertData={setAlertData} />
      </Container>
    );
  }
};

export default Report;
