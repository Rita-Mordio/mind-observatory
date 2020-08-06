import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import moment from 'moment';

//##################################
//##################################
//############# Styled #############
//##################################
//##################################

const TopWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const Date = styled.Text`
  color: #3f3e3c;
  font-size: 18px;
  align-self: center;
  margin-left: 32px;
`;

const Weather = styled.Image`
  width: 32px;
  height: 32px;
`;

//###################################
//###################################
//############ Component ############
//###################################
//###################################

const ViewDiaryTop = ({ createdAt, weather }) => {
  const renderWeather = () => {
    switch (weather) {
      case 'sun':
        return require('../../assets/images/weather-sun.png');
      case 'rain':
        return require('../../assets/images/weather-rain.png');
      case 'cloud':
        return require('../../assets/images/weather-cloud.png');
      case 'thunder':
        return require('../../assets/images/weather-thunder.png');
    }
  };

  return (
    <TopWrap>
      <View />
      <Date>{moment(createdAt).format('YYYY년 MM월 DD일')}</Date>
      <Weather source={renderWeather()}></Weather>
    </TopWrap>
  );
};

export default ViewDiaryTop;
