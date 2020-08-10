import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';

import COMMON from '../common';

import WeatherIcon from './WeatherIcon';

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
  padding: 10px 15px 20px 15px;
  border-radius: 10px;
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

const TextTypeDiaryItem = ({ diary, navigation }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate(COMMON.getTemplateNameByNo(diary.templateType), {
          diary,
        });
      }}
    >
      <Container>
        <ViewWrapper>
          <CreatedTime>
            {moment(diary.createdAt).format('YYYY년 MM월 DD일')}
          </CreatedTime>
          <WeatherIcon value={diary.weather} />
        </ViewWrapper>
        <Title>{diary.title}</Title>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default TextTypeDiaryItem;
