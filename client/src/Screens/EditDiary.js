import React from 'react';
import styled from 'styled-components/native';

//##################################
//##################################
//############# Styled #############
//##################################
//##################################

const Container = styled.ScrollView`
  flex: 1;
`;

const TestView = styled.View`
  width: 100px;
  height: 10px;
  background-color: darkred;
`;

//###################################
//###################################
//############ Component ############
//###################################
//###################################

const EditDiary = () => {
  return (
    <Container>
      <TestView />
    </Container>
  );
};

export default EditDiary;
