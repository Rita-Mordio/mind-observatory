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
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 16px;
  color: #3f3e3c;
`;

//###################################
//###################################
//############ Component ############
//###################################
//###################################

const AppInfo = () => {
  return (
    <Container>
      <Text>버전 : 0.0.1</Text>
    </Container>
  );
};

export default AppInfo;
