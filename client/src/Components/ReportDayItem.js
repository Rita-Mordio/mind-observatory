import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import WeatherIcon from './WeatherIcon';

const Container = styled.View`
  width: ${Math.floor(100 / 7)}%;
  align-items: center;
  padding: 10px 0px;
  border-color: #dddddd;
  border-top-width: ${(props) => (props.index >= 7 ? '0px' : '1px')};
  border-bottom-width: 1px;
`;

const Text = styled.Text`
  color: #3f3e3c;
  font-size: 12.5px;
  margin-top: 4px;
`;

const ReportDayItem = ({ index, weather, date }) => {
  return (
    <Container index={index}>
      <WeatherIcon value={weather} id={Math.random()} size={24} />
      <Text>{moment(date).format('D')}일</Text>
    </Container>
  );
};

export default ReportDayItem;
