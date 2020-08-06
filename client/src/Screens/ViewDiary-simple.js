import React from 'react';
import styled from 'styled-components/native';
import {Dimensions, View} from 'react-native';
import moment from 'moment';

const { width } = Dimensions.get('screen');

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
`;

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

const ImageWrap = styled.View`
  width: 100%;
  height: ${width}px;
  border-width: 1px;
  border-color: #a9a9a9;
  border-radius: 20px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;

const BottomWrap = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  color: #3f3e3c;
  margin-top: 30px;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
`;

const Contents = styled.Text`
  color: #3f3e3c;
  font-size: 17px;
`

const ViewDiarySimple = ({ route }) => {
  const diary = route.params.diary;

  const renderWeather= () => {
    switch (diary.weather) {
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
    <SafeAreaView>
      <Container>
        <TopWrap>
          <View />
          <Date>{moment(diary.createdAt).format('YYYY년 MM월 DD일')}</Date>
          <Weather source={renderWeather()}></Weather>
        </TopWrap>
        <ImageWrap>
          <Image source={{ uri: diary.images[0] }} resizeMode="cover" />
        </ImageWrap>
        <BottomWrap>
          <Title>{diary.title}</Title>
          <Contents>{diary.contents[0]}</Contents>
        </BottomWrap>
      </Container>
    </SafeAreaView>
  );
};

export default ViewDiarySimple;
