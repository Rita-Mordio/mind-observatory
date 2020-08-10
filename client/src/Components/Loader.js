import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';

const { height } = Dimensions.get('screen');
const height_logo = height * 0.17;

//##################################
//##################################
//############# Styled #############
//##################################
//##################################

const LoadingContainer = styled.View`
  flex: 1;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
`;

const LoadingImage = styled.Image`
  width: ${height_logo};
  height: ${height_logo};
`;

const LoadingText = styled.Text`
  font-size: 17px;
  color: #3f3e3c;
`;

//###################################
//###################################
//############ Component ############
//###################################
//###################################

const Loader = () => {
  return (
    <LoadingContainer>
      <LoadingImage
        as={Animatable.Image}
        animation="pulse"
        duration={1000}
        source={require('../../assets/images/logo-background-void.png')}
        resizeMode="stretch"
        iterationCount="infinite"
      />
      <LoadingText
        as={Animatable.Text}
        animation="flash"
        duration={3000}
        iterationCount="infinite"
      >
        기록보관소 검색중...
      </LoadingText>
    </LoadingContainer>
  );
};

export default Loader;
