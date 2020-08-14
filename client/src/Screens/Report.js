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

//###################################
//###################################
//############ Component ############
//###################################
//###################################

const Report = ({ navigation }) => {
  const { setHeader } = useContext(Context);

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
    setHeader({ headerColor: '#AAD4EC', headerTitle: '관측 보고서' });
    getReportWeather();

    const unsubscribe = navigation.addListener('tabPress', (e) => {
      setHeader({ headerColor: '#AAD4EC', headerTitle: '관측 보고서' });
      getReportWeather();
    });

    return unsubscribe;
  }, [navigation]);

  const getReportWeather = () => {
    COMMON.getStoreData(
      '@userToken',
      (value) => {
        COMMON.axiosCall(
          'diary/getReportWeather',
          {
            token: value,
          },
          (object) => {
            if (COMMON.checkSuccess(object, alertData, setAlertData)) {
              setWeather(object.data.weather);
              setShowLoader(false);
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
      [name] : value
    })
  };

  if (showLoader) {
    return <Loader />;
  } else {
    return (
      <Container>
        <Picker
          selectedValue={selectDate.year}
          onValueChange={(itemValue) => {
            handlePickerChange('year', itemValue);
          }}
        >
          <Picker.Item label="2020" value="2020" />
          <Picker.Item label="2021" value="2021" />
          <Picker.Item label="2022" value="2022" />
        </Picker>
        <Picker
          selectedValue={selectDate.month}
          onValueChange={(itemValue) => {
            handlePickerChange('month', itemValue);
          }}
        >
          <Picker.Item label="1" value="01" />
          <Picker.Item label="2" value="02" />
          <Picker.Item label="3" value="03" />
          <Picker.Item label="4" value="04" />
          <Picker.Item label="5" value="05" />
          <Picker.Item label="6" value="06" />
          <Picker.Item label="7" value="07" />
          <Picker.Item label="8" value="08" />
          <Picker.Item label="9" value="09" />
          <Picker.Item label="10" value="10" />
          <Picker.Item label="11" value="11" />
          <Picker.Item label="12" value="12" />
        </Picker>
        <ReportWeekItem>{renderWeather()}</ReportWeekItem>
        <Alert alertData={alertData} setAlertData={setAlertData} />
      </Container>
    );
  }
};

export default Report;
