import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//##################################
//##################################
//############# Styled #############
//##################################
//##################################

const Container = styled.View`
  height: 70px;
  background-color: #ffffff;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: #d9d9d9;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
`;

const Text = styled.Text`
  font-size: 24px;
  color: #3f3e3c;
`;

const ButtonWrap = styled.View`
  flex-direction: row;
`;

//###################################
//###################################
//############ Component ############
//###################################
//###################################

const SelectDiaryViewType = ({ diaryViewType, handleVieTypeToggle }) => {
  return (
    <Container>
      <Text>나의 기록</Text>
      <ButtonWrap>
        <TouchableWithoutFeedback
          onPress={() => {
            handleVieTypeToggle('image');
          }}
        >
          <Icon
            name="newspaper-variant-outline"
            size={30}
            style={{
              marginRight: 15,
              color: diaryViewType === 'image' ? '#3f3e3c' : '#d9d9d9',
            }}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            handleVieTypeToggle('text');
          }}
        >
          <Icon
            name="text-box-outline"
            size={30}
            style={{ color: diaryViewType === 'text' ? '#3f3e3c' : '#d9d9d9' }}
          />
        </TouchableWithoutFeedback>
      </ButtonWrap>
    </Container>
  );
};

export default SelectDiaryViewType;
