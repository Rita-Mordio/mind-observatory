import React from 'react';
import styled from 'styled-components/native';
import {Dimensions, ScrollView} from 'react-native';

import DiaryTopInfo from "../Components/DiaryTopInfo";

const { width } = Dimensions.get('screen');

//##################################
//##################################
//############# Styled #############
//##################################
//##################################

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const Container = styled.ScrollView`
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
`;

const ImageWrap = styled.View`
  width: 100%;
  height: ${width - 80}px;
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
  padding-bottom: 30px;
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
  padding-bottom: 30px;
`

//###################################
//###################################
//############ Component ############
//###################################
//###################################

const ViewDiaryDetail = ({ route }) => {
  const diary = route.params.diary;

  return (
    <SafeAreaView>
      <Container>
        <DiaryTopInfo createdAt={diary.createdAt} weather={diary.weather} />
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

export default ViewDiaryDetail;
