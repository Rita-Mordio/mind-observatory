import React, { useContext, useEffect } from 'react';
import styled from 'styled-components/native';
import Context from '../Redux/contexts/context';
import _ from 'lodash'
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

  useEffect(() => {
    setHeader({ headerColor: '#AAD4EC', headerTitle: '관측 보고서' });

    const unsubscribe = navigation.addListener('tabPress', (e) => {
      setHeader({ headerColor: '#AAD4EC', headerTitle: '관측 보고서' });
    });

    return unsubscribe;
  }, [navigation]);

  const renderWeather = (value) => {
    const dummy = [
        { weather: 'sun', date: '09 / 26' },
        { weather: 'rain', date: '09 / 26' },
        { weather: 'sun', date: '09 / 26' },
        { weather: 'sun', date: '09 / 26' },
        { weather: 'cloud', date: '09 / 26' },
        { weather: 'sun', date: '09 / 26' },
        { weather: 'cloud', date: '09 / 26' },
        { weather: 'thunder', date: '09 / 26' },
        { weather: 'sun', date: '09 / 26' },
        { weather: 'rain', date: '09 / 26' }
        ];

    const dummy2 = _.chunk(dummy, 5)

    return dummy2[value].map((item, index) => {
      return <ReportDayItem weather={item.weather} date={item.date} key={Math.random()} />;
    });
  };

  return (
    <Container>
      <ReportWeekItem style={{ borderColor: '#dddddd', borderTopWidth: 1 }}>
          {renderWeather(0)}
      </ReportWeekItem>
      <ReportWeekItem>
          {renderWeather(1)}
      </ReportWeekItem>
    </Container>
  );
};

export default Report;
