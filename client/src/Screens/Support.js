import React from 'react';
import styled from 'styled-components/native';
import Clipboard from '@react-native-community/clipboard';
import { Button } from 'react-native-elements';

//##################################
//##################################
//############# Styled #############
//##################################
//##################################

const Container = styled.View`
  flex: 1;
  padding: 30px;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 16px;
  color: #3f3e3c;
  margin-bottom: 10px;
`;

const Email = styled.Text`
  font-size: 20px;
  color: #3f3e3c;
  margin-top: 30px;
`;

const ButtonWrap = styled.View`
  width: 100%;
  justify-content: center;
  margin-top: 40px;
`;

//###################################
//###################################
//############ Component ############
//###################################
//###################################

const Support = () => {
  return (
    <Container>
      <Text>사용 시 불편한 점이나, 문의사항은</Text>
      <Text>아래 메일 주소로 보내주시면</Text>
      <Text>정성스레 답변해드리도록 하겠습니다.</Text>
      <Email>mind-observatory@naver.com</Email>
      <ButtonWrap>
        <Button
          buttonStyle={{ backgroundColor: '#BCC74F' }}
          title="이메일 복사하기"
          raised={true}
          onPress={() => {
            Clipboard.setString('mind-observatory@naver.com');
          }}
        />
      </ButtonWrap>
    </Container>
  );
};

export default Support;
