import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import WeatherIcon from './WeatherIcon';

const Container = styled.View`
  width: ${Math.floor(100 / 6)}%;
  align-items: center;
  border-color: #efefef;
  border-top-width: ${props => props.index >= 6 ? '0px' : '1px' };
  border-bottom-width: 1px;
  padding: 15px 0px;
`;

const Text = styled.Text`
  color: #3f3e3c;
  font-size: 12.5px;
  margin-top: 5px;
`;

const ReportDayItem = ({ index, weather, date }) => {
  return (
    <Container index={index} >
      <WeatherIcon value={weather} id={Math.random()} />
      <Text>{moment(date).format('D')}일</Text>
    </Container>
  );
};

export default ReportDayItem;
