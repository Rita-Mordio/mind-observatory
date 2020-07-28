import React from 'react';
import styled from 'styled-components/native';

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
  padding: 10px;
`;

const ViewWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CreatedTime = styled.Text`
  color: #9d9d9d;
`;

const Weather = styled.Image`
  width: 24px;
  height: 24px;
  margin-left: 10px;
`;

const Title = styled.Text`
  color: #2b2b2b;
  font-size: 18px;
  font-weight: bold;
  margin-top: 7px;
`;

//###################################
//###################################
//############ Component ############
//###################################
//###################################

const TextTypeDiary = () => {
  return (
    <Container>
      <ViewWrapper>
        <CreatedTime>2020년 06월 21일</CreatedTime>
        <Weather
          source={{
            uri:
              'https://png.pngitem.com/pimgs/s/178-1780522_png-file-rainy-weather-icon-png-white-weather.png',
          }}
        />
      </ViewWrapper>
      <Title>햇빛이 쨍쨍</Title>
    </Container>
  );
};

export default TextTypeDiary;
