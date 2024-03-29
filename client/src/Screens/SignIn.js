import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Button, CheckBox } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import COMMON from '../common';
import Context from '../Redux/contexts/context';

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

const CheckBoxWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
  margin-bottom: 20px;
`;

const FindPassword = styled.Text`
  font-size: 14.7px;
  margin-top: 2px;
`;

const InputWrap = styled.View`
  flex-direction: row;
  margin-top: 17px;
  margin-bottom: ${() => {
    if (Platform.OS === 'ios') return `20px`;
    else return `0px`;
  }};
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

const SignIn = ({ navigation }) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    secureTextEntry: true,
    isAutoSignIn: false,
    isValidUser: true,
    isValidPassword: true,
    isLoading: false,
  });

  const [alertData, setAlertData] = useState({
    show: false,
    message: '',
    onConfirmPressed: null,
  });

  const { signIn } = useContext(Context);

  useEffect(() => {
    COMMON.getStoreData(
      '@isAutoSignIn',
      (value) => {
        if (value !== null) {
          if (value === 'true')
            setData({
              ...data,
              isAutoSignIn: true,
            });
        }
      },
      () => {
        setAlertData({
          ...alertData,
          show: true,
          message: '자동 로그인 데이터를 가져오는중 문제가 발생하였습니다.',
        });
      },
    );
  }, []);

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

  const storeData = (key, value) => {
    COMMON.setStoreData(key, value, () => {
      setAlertData({
        ...alertData,
        show: true,
        message: '데이터 저장중 에러가 발생했습니다.',
      });
    });
  };

  const setAutoSignIn = () => {
    storeData('@isAutoSignIn', !data.isAutoSignIn);
    setData({
      ...data,
      isAutoSignIn: !data.isAutoSignIn,
    });
  };

  const setLoadingButton = (value) => {
    setData({
      ...data,
      isLoading: value,
    });
  };

  const login = () => {
    if (COMMON.isEmptyValue(data.email) || COMMON.isEmptyValue(data.password)) {
      setAlertData({
        ...alertData,
        show: true,
        message: '이메일 또는 비밀번호를 입력해주세요.',
      });
      return false;
    }

    setLoadingButton(true);

    COMMON.axiosCall(
      'user/signIn',
      {
        email: data.email,
        password: data.password,
      },
      (object) => {
        setLoadingButton(false);
        if (COMMON.checkSuccess(object, alertData, setAlertData)) {
          storeData('@userToken', object.data.token);
          storeData('@userNickname', object.data.nickname);
          storeData('@userProfileImage', object.data.profileImage);
          signIn(object.data.token);
        }
      },
      (error) => {
        setLoadingButton(false);
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
            <FontAwesomeIcon name="lock" color="#05375a" size={22} />
            <Input
              placeholder="당신의 비밀스런 비밀번호"
              secureTextEntry={data.secureTextEntry ? true : false}
              autoCapitalize="none"
              onChangeText={(value) => handleInputChange(value, 'password')}
              keyboardType="ascii-capable"
            />
            <InputSecureIcon
              handleSecureTextEntryChange={() =>
                handleSecureTextEntryChange('secureTextEntry')
              }
              isSecureTextEntry={data.secureTextEntry}
            />
          </InputWrap>

          <CheckBoxWrap>
            <CheckBox
              title="자동 로그인"
              checked={data.isAutoSignIn}
              checkedColor="#f5889f"
              containerStyle={{
                backgroundColor: '#ffffff',
                borderWidth: 0,
                padding: 0,
                margin: 0,
                marginLeft: 0,
              }}
              textStyle={{ fontSize: 14 }}
              onPress={setAutoSignIn}
            />
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('FindPassword');
              }}
            >
              <FindPassword>비밀번호 찾기</FindPassword>
            </TouchableWithoutFeedback>
          </CheckBoxWrap>

          <ButtonWrap>
            <Button
              buttonStyle={{ backgroundColor: '#efc4cd' }}
              title="로그인"
              raised={true}
              onPress={login}
              loading={data.isLoading}
            />
          </ButtonWrap>
          <ButtonWrap>
            <Button
              buttonStyle={{ borderColor: '#efc4cd' }}
              titleStyle={{ color: '#efc4cd' }}
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
