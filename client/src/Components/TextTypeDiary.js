import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';

import WeatherView from './WeatherView';

//##################################
//##################################
//############# Styled #############
//##################################
//##################################

const Container = styled.View`
  width: 100%;
  margin-bottom: 30px;
  border-width: 1px;
  border-color: #d9d9d9;
  padding: 10px 10px 20px 10px;
`;

const ViewWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CreatedTime = styled.Text`
  color: #9d9d9d;
`;

const Title = styled.Text`
  color: #3f3e3c;
  font-size: 18px;
  font-weight: bold;
  margin-top: 7px;
`;

//###################################
//###################################
//############ Component ############
//###################################
//###################################

const TextTypeDiary = ({ diary }) => {
  return (
    <Container>
      <ViewWrapper>
        <CreatedTime>
          {moment(diary.registerDate).format('YYYY년 MM월 DD일')}
        </CreatedTime>
        <WeatherView value={diary.weather} />
      </ViewWrapper>
      <Title>{diary.title}</Title>
    </Container>
  );
};

export default TextTypeDiary;
