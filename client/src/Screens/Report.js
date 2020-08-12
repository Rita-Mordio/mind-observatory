import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Context from '../Redux/contexts/context';
import _ from 'lodash';

import COMMON from '../common';
import Alert from '../Components/Alert';
import ReportDayItem from '../Components/ReportDayItem';

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
  border-color: #dddddd;
  border-left-width: 1px;
`;

//###################################
//###################################
//############ Component ############
//###################################
//###################################

const Report = ({ navigation }) => {
  const { setHeader } = useContext(Context);

  const [weather, setWeather] = useState([]);
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
            }
          },
          () => {
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

    // COMMON.axiosCall('diary/getReportWeather', {})
  };

  const renderWeather = (value) => {
    const weatherData = _.chunk(weather, 5);

    if (weatherData.length !== 0) {
      return weatherData[value].map((item, index) => {
        return (
          <ReportDayItem
            weather={item.weather}
            date={item.createdAt}
            key={item._id}
          />
        );
      });
    }
  };

  return (
    <Container>
      <ReportWeekItem style={{ borderColor: '#dddddd', borderTopWidth: 1 }}>
        {renderWeather(0)}
      </ReportWeekItem>
      <ReportWeekItem>{renderWeather(1)}</ReportWeekItem>

      <Alert alertData={alertData} setAlertData={setAlertData} />
    </Container>
  );
};

export default Report;
