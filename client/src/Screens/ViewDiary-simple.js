import React from 'react';
import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

import ViewDiaryTop from "../Components/ViewDiaryTop";

const { width } = Dimensions.get('screen');

//##################################
//##################################
//############# Styled #############
//##################################
//##################################

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
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

//###################################
//###################################
//############ Component ############
//###################################
//###################################

const ViewDiarySimple = ({ route }) => {
  const diary = route.params.diary;

  return (
    <SafeAreaView>
      <Container>
        <ViewDiaryTop createdAt={diary.createdAt} weather={diary.weather} />
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
