import React, { useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import Context from '../Redux/contexts/context';
import moment from 'moment';
import RNPickerSelect from 'react-native-picker-select';

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
  height: 50px;
`;

const PickerIcon = styled.View`
  position: absolute;
  background-color: transparent;
  border-top-width: 7px;
  border-top-color: gray;
  border-right-width: 7px;
  border-right-color: transparent;
  border-left-width: 7px;
  border-left-color: transparent;
  width: 0px;
  height: 0px;
  top: ${Platform.OS === 'ios' ? 19 : 21}px;
  right: 15px;
`;

const pickerStyle = {
  inputIOS: {
    color: '#3f3e3c',
    paddingTop: 14,
    paddingHorizontal: 15,
    paddingBottom: 12,
  },
  inputAndroid: {
    color: '#3f3e3c',
  },
  underline: { borderTopWidth: 0 },
};

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
              setWeather(object.data.report.weather);
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
            <RNPickerSelect
              value={selectDate.year}
              placeholder={{}}
              style={pickerStyle}
              Icon={() => {
                return <PickerIcon />;
              }}
              onValueChange={(value) => {
                handlePickerChange('year', value);
              }}
              items={[
                { label: '2020년', value: '2020' },
                { label: '2021년', value: '2021' },
                { label: '2022년', value: '2022' },
              ]}
            />
          </Border>
          <Border>
            <RNPickerSelect
              value={selectDate.month}
              placeholder={{}}
              style={pickerStyle}
              Icon={() => {
                return <PickerIcon />;
              }}
              onValueChange={(value) => {
                handlePickerChange('month', value);
              }}
              items={[
                { label: '1월', value: '01' },
                { label: '2월', value: '02' },
                { label: '3월', value: '03' },
                { label: '4월', value: '04' },
                { label: '5월', value: '05' },
                { label: '6월', value: '06' },
                { label: '7월', value: '07' },
                { label: '8월', value: '08' },
                { label: '9월', value: '09' },
                { label: '10월', value: '10' },
                { label: '11월', value: '11' },
                { label: '12월', value: '12' },
              ]}
            />
          </Border>
        </DatePickerWrap>
        <ReportWeekItem>{renderWeather()}</ReportWeekItem>
        <Alert alertData={alertData} setAlertData={setAlertData} />
      </Container>
    );
  }
};

export default Report;
