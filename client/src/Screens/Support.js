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

const Support = () => {
  return (
    <Container>
      <Text>고객지원</Text>
    </Container>
  );
};

export default Support;
