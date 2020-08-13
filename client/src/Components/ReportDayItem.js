import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import WeatherIcon from './WeatherIcon';

const Container = styled.View`
  width: ${100 / 5}%;
  align-items: center;
  border-color: #dddddd;
  border-right-width: 1px;
  border-top-width: ${props => props.index >= 5 ? '0px' : '1px' };
  border-bottom-width: 1px;
  padding: 10px;
`;

const Text = styled.Text`
  color: #3f3e3c;
  font-size: 12.5px;
  margin-top: 4px;
`;

const ReportDayItem = ({ index, weather, date }) => {
  return (
    <Container index={index} >
      <WeatherIcon value={weather} id={Math.random()} />
      <Text>{moment(date).format('MM / DD')}</Text>
    </Container>
  );
};

export default ReportDayItem;
