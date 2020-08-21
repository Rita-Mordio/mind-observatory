import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import COMMON from '../common';

import Alert from '../Components/Alert';

//##################################
//##################################
//############# Styled #############
//##################################
//##################################

const Container = styled.View`
  flex: 1;
  background-color: #efc4cd;
`;

const TopView = styled.View`
  flex: 2;
  justify-content: center;
  padding-left: 20px;
`;

const TopTitle = styled.Text`
  color: #3f3e3c;
  font-family: Nanum Pen;
  font-size: 50px;
`;

const BottomView = styled.View`
  flex: ${() => {
    if (Platform.OS === 'ios') return 3;
    else return 5;
  }};
  background-color: #ffffff;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding: 20px;
`;

const BottomTitle = styled.Text`
  color: #3f3e3c;
  font-size: 16px;
  margin-top: 20px;
`;

const InputWrap = styled.View`
  flex-direction: row;
  margin-top: 15px;
  margin-bottom: ${() => {
    if (Platform.OS === 'ios') return `20px`;
    else return `0px`;
  }};
  padding-bottom: 5px;
  border-bottom-width: 1px;
  border-color: #f2f2f2;
`;

const Input = styled.TextInput`
  flex: 1;
  margin-top: ${() => {
    if (Platform.OS === 'ios') return `0`;
    else return `-12px`;
  }};
  padding-left: 10px;
  color: #3f3e3c;
`;

const ButtonWrap = styled.View`
  margin-top: 30px;
`;

//###################################
//###################################
//############ Component ############
//###################################
//###################################

const FindPassword = ({ navigation }) => {
  const [data, setData] = useState({
    email: '',
  });

  const [alertData, setAlertData] = useState({
    show: false,
    message: '',
    onConfirmPressed: null,
  });

  const handleInputChange = (value, inputName) => {
    setData({
      ...data,
      [inputName]: value,
    });
  };

  const findPassword = () => {
    if (COMMON.isEmptyValue(data.email)) {
      setAlertData({
        ...data,
        show: true,
        message: '이메일을 입력해 주세요.',
      });

      return false;
    }

    COMMON.axiosCall(
      'user/changeRandomPassword',
      {
        email: data.email,
      },
      (object) => {
        if (COMMON.checkSuccess(object, alertData, setAlertData)) {
          setAlertData({
            ...alertData,
            show: true,
            message: '비밀번호를 초기화하여 해당 메일로 보내드렸습니다.',
          });

          COMMON.removeStoreData('@userToken', () => {
            setAlertData({
              ...alertData,
              show: true,
              message: '토큰 삭제중 에러가 발생했습니다.',
            });
          });
        }
      },
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <TopView>
          <TopTitle>비밀번호 찾기</TopTitle>
        </TopView>
        <BottomView as={Animatable.View} animation="fadeInUpBig">
          <BottomTitle>이메일</BottomTitle>
          <InputWrap>
            <FontAwesomeIcon name="user-o" color="#05375a" size={20} />
            <Input
              placeholder="회원가입시 사용한 이메일"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(value) => handleInputChange(value, 'email')}
            />
          </InputWrap>

          <ButtonWrap>
            <Button
              buttonStyle={{ backgroundColor: '#efc4cd' }}
              title="비밀번호 찾기"
              raised={true}
              onPress={findPassword}
            />
          </ButtonWrap>
          <ButtonWrap>
            <Button
              buttonStyle={{ borderColor: '#efc4cd' }}
              titleStyle={{ color: '#efc4cd' }}
              type="outline"
              title="로그인 화면으로"
              raised={true}
              onPress={() => {
                navigation.navigate('SignIn');
              }}
            />
          </ButtonWrap>
        </BottomView>

        <Alert alertData={alertData} setAlertData={setAlertData} />
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default FindPassword;
