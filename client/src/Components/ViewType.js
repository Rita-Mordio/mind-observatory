import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Container = styled.View`
  height: 70px;
  background-color: #ffffff;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: #d9d9d9;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Text = styled.Text`
  font-family: NotoSerifKR-Regular;
  font-size: 24px;
`;

const ButtonWrap = styled.View`
  flex-direction: row;
`;

const ViewType = () => {
  return (
    <Container>
      <Text>나의 기록</Text>
      <ButtonWrap>
        <Icon
          name="newspaper-variant-outline"
          size={30}
          style={{ marginRight: 15, color: '#2b2b2b' }}
        ></Icon>
        <Icon
          name="text-box-outline"
          size={30}
          style={{ color: '#d9d9d9' }}
        ></Icon>
      </ButtonWrap>
    </Container>
  );
};

export default ViewType;
