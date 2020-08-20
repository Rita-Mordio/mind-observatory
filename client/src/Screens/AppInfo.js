import React from 'react';
import styled from 'styled-components/native';

//##################################
//##################################
//############# Styled #############
//##################################
//##################################

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
`;

const Text = styled.Text``;

//###################################
//###################################
//############ Component ############
//###################################
//###################################

const AppInfo = () => {
  return (
    <Container>
      <Text>앱 정보</Text>
    </Container>
  );
};

export default AppInfo;
