import {Keyboard, Platform, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import COMMON from '../common';

import InputSecureIcon from '../Components/InputSecureIcon';
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
  color: #2b2b2b;
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
  color: #2b2b2b;
  font-size: 18px;
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
  color: #2b2b2b;
`;

const ButtonWrap = styled.View`
  margin-top: 30px;
`;

//###################################
//###################################
//############ Component ############
//###################################
//###################################

const SignIn = ({navigation}) => {
  const [data, setData] = React.useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const [alertData, setAlertData] = React.useState({
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

  const handleSecureTextEntryChange = (entryName) => {
    setData({
      ...data,
      [entryName]: !data[entryName],
    });
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@userToken', value)
    } catch (e) {
      setAlertData({
        ...alertData,
        show: true,
        message: '로그인 토큰 저장중 에러가 발생했습니다.'
      })
    }
  }

  const login = () => {
    if (COMMON.isEmptyValue(data.email) || COMMON.isEmptyValue(data.password)) {
      setAlertData({
        ...alertData,
        show: true,
        message: '이메일 또는 비밀번호를 입력해주세요.',
      });
      return false;
    }

    COMMON.axiosCall(
      'user/signIn',
      {
        email: data.email,
        password: data.password,
      },
      (object) => {
        if(COMMON.checkSuccess(object, alertData, setAlertData)){
          storeData(object.data.token)
        }
      },
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <TopView>
          <TopTitle>로그인</TopTitle>
        </TopView>
        <BottomView as={Animatable.View} animation="fadeInUpBig">
          <BottomTitle>이메일</BottomTitle>
          <InputWrap>
            <FontAwesomeIcon name="user-o" color="#05375a" size={20} />
            <Input
              placeholder="당신의 소중한 이메일"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(value) => handleInputChange(value, 'email')}
            />
          </InputWrap>

          <BottomTitle>비밀번호</BottomTitle>
          <InputWrap>
            <FontAwesomeIcon name="lock" color="#05375a" size={20} />
            <Input
              placeholder="당신의 비밀스런 비밀번호"
              secureTextEntry={data.secureTextEntry ? true : false}
              autoCapitalize="none"
              onChangeText={(value) => handleInputChange(value, 'password')}
            />
            <InputSecureIcon
              handleSecureTextEntryChange={() =>
                handleSecureTextEntryChange('secureTextEntry')
              }
              isSecureTextEntry={data.secureTextEntry}
            />
          </InputWrap>

          <ButtonWrap>
            <Button
              buttonStyle={{backgroundColor: '#efc4cd'}}
              title="로그인"
              raised={true}
              onPress={login}
            />
          </ButtonWrap>
          <ButtonWrap>
            <Button
              buttonStyle={{borderColor: '#efc4cd'}}
              titleStyle={{color: '#efc4cd'}}
              type="outline"
              title="회원가입"
              raised={true}
              onPress={() => {
                navigation.navigate('SignUp');
              }}
            />
          </ButtonWrap>
        </BottomView>

        <Alert alertData={alertData} setAlertData={setAlertData} />
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;
