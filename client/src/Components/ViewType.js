import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
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
  const [viewType, setViewType] = useState('image');

  const handleVieTypeToggle = (nextType) => {
    if (nextType !== viewType)
      setViewType(viewType === 'image' ? 'text' : 'image');
  };

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
              color: viewType === 'image' ? '#2b2b2b' : '#d9d9d9',
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
            style={{ color: viewType === 'text' ? '#2b2b2b' : '#d9d9d9' }}
          />
        </TouchableWithoutFeedback>
      </ButtonWrap>
    </Container>
  );
};

export default ViewType;
