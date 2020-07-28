import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

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
  justify-content: space-between;
`;

const CreatedTime = styled.Text`
  color: #9d9d9d;
`;

const Title = styled.Text`
  color: #2b2b2b;
  font-size: 18px;
  font-weight: bold;
  margin-top: 7px;
`;

const Weather = styled.Image`
  width: 30px;
  height: 30px;
`;

const Contents = styled.Text`
  color: #2b2b2b;
  margin-top: 20px;
`;

//###################################
//###################################
//############ Component ############
//###################################
//###################################

const DiaryImage = () => {
  return (
    <Container>
      <Image
        source={{
          uri:
            'https://lh3.googleusercontent.com/proxy/mOXA5mmFqtk3uHHBQZFBFqugfCWkoeVbsYW1oYTxXNF2IPUPEFRTakCrE5aYz4CfGQJjfxaOqzIkawhK5QbpAcAekC3ylVnK5BFe1b3OyDEn9dUrzByPBPIzhBfiNtupoP6i',
        }}
      />
      <BottomView>
        <ViewWrapper>
          <CreatedTime>2020년 06월 21일</CreatedTime>
          <Weather
            source={{
              uri:
                'https://png.pngitem.com/pimgs/s/178-1780522_png-file-rainy-weather-icon-png-white-weather.png',
            }}
          />
        </ViewWrapper>
        <Title>햇빛이 햇빛이 햇빛</Title>
        <Contents ellipsizeMode='tail' numberOfLines={3}>
          오랜만의 공원. 날이 더 더워지기 전에 가길 잘한 것 같다. 언제 이렇게
          더워졌는지 신기할 따름이다. 돌아오는 길에 아이스크림 하나를 샀다. 내가
          제일...
        </Contents>
      </BottomView>
    </Container>
  );
};

export default DiaryImage;
