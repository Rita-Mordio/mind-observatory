import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';

import WeatherView from './WeatherView';

const { width } = Dimensions.get('screen');

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
`;

const Image = styled.Image`
  width: 100%;
  height: ${Math.round(width * 0.3)}px;
`;

const BottomView = styled.View`
  width: 100%;
  padding: 25px 15px;
`;

const ViewWrapper = styled.View`
  flex-direction: row;
  align-items: center;
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

const Contents = styled.Text`
  color: #3f3e3c;
  margin-top: 20px;
`;

//###################################
//###################################
//############ Component ############
//###################################
//###################################

const ImageTypeDiary = ({ diary }) => {
  return (
    <Container>
      <Image source={{ uri: diary.images[0] }} />
      <BottomView>
        <ViewWrapper>
          <CreatedTime>
            {moment(diary.createdAt).format('YYYY년 MM월 DD일')}
          </CreatedTime>
          <WeatherView value={diary.weather} />
        </ViewWrapper>
        <Title>{diary.title}</Title>
        <Contents ellipsizeMode="tail" numberOfLines={3}>
          {diary.contents[0]}
        </Contents>
      </BottomView>
    </Container>
  );
};

export default ImageTypeDiary;
