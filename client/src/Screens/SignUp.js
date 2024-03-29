import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import { Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
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
  flex: 1.2;
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

const ScrollEventWrap = styled.View`
  flex: 1;
`;

const ScrollView = styled.ScrollView`
  flex: 1;
`;

const BottomTitle = styled.Text`
  color: #3f3e3c;
  font-size: 16px;
  margin-top: 20px;
`;

const InputWrap = styled.View`
  flex-direction: row;
  margin-top: 12px;
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

const SignUp = ({ navigation }) => {
  const [data, setData] = React.useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    isAvailableEmail: false,
    isAvailableNickname: false,
    secureTextEntry: true,
    confirmSecureTextEntry: true,
    isLoading: false,
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

  const validEmailCheck = () => {
    setData({ ...data, isAvailableEmail: false });
    if (COMMON.isEmptyValue(data.email)) return false;

    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if (data.email.match(regExp) != null) availableEmailCheck();
    else
      setAlertData({
        ...alertData,
        show: true,
        message: '올바른 이메일 형식이 아닙니다.',
      });
  };

  const availableEmailCheck = () => {
    COMMON.axiosCall(
      'user/availableEmail',
      {
        email: data.email,
      },
      (object) => {
        if (COMMON.checkSuccess(object, alertData, setAlertData)) {
          setData({ ...data, isAvailableEmail: true });
        }
      },
    );
  };

  const availableNicknameCheck = () => {
    setData({ ...data, isAvailableNickname: false });

    if (data.nickname.length > 8) {
      setAlertData({
        ...alertData,
        show: true,
        message: '닉네임은 8자 밑으로 해주세요.',
      });
    }

    COMMON.axiosCall(
      'user/availableNickname',
      {
        nickname: data.nickname,
      },
      (object) => {
        if (COMMON.checkSuccess(object, alertData, setAlertData)) {
          setData({ ...data, isAvailableNickname: true });
        }
      },
    );
  };

  const setLoadingButton = (value) => {
    setData({
      ...data,
      isLoading: value,
    });
  };

  const signUp = () => {
    if (!data.isAvailableEmail) {
      setAlertData({
        ...alertData,
        show: true,
        message: '이메일을 확인해 주세요.',
      });
      return false;
    }

    if (!data.isAvailableNickname) {
      setAlertData({
        ...alertData,
        show: true,
        message: '닉네임을 확인해 주세요.',
      });
      return false;
    }

    if (data.password.length < 8) {
      setAlertData({
        ...alertData,
        show: true,
        message: '비밀번호는 8자리 이상으로 해주세요.',
      });
      return false;
    }

    if (data.password !== data.confirmPassword) {
      setAlertData({
        ...alertData,
        show: true,
        message: '비밀번호가 서로 일치하지 않습니다.',
      });
      return false;
    }

    setLoadingButton(true);

    COMMON.axiosCall(
      'user/register',
      {
        email: data.email,
        nickname: data.nickname,
        password: data.password,
      },
      (object) => {
        setLoadingButton(false);
        if (COMMON.checkSuccess(object, alertData, setAlertData)) {
          setAlertData({
            show: true,
            message: '회원가입을 축하드립니다!',
            onConfirmPressed: () => {
              navigation.navigate('SignIn');
            },
          });
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
          <TopTitle>회원가입</TopTitle>
        </TopView>
        <BottomView as={Animatable.View} animation="fadeInUpBig">
          <ScrollEventWrap onStartShouldSetResponder={() => true}>
            <ScrollView>
              <BottomTitle>이메일</BottomTitle>
              <InputWrap>
                <FontAwesomeIcon
                  name="user-o"
                  color="#05375a"
                  size={20}
                  style={{ marginRight: 2 }}
                />
                <Input
                  placeholder="당신의 소중한 이메일"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={(value) => handleInputChange(value, 'email')}
                  onBlur={validEmailCheck}
                />
                {data.isAvailableEmail ? (
                  <Animatable.View animation="bounceIn">
                    <FeatherIcon name="check-circle" color="green" size={20} />
                  </Animatable.View>
                ) : null}
              </InputWrap>

              <BottomTitle>닉네임</BottomTitle>
              <InputWrap>
                <FontistoIcon name="smiley" color="#05375a" size={18} />
                <Input
                  placeholder="당신만의 특별한 닉네임"
                  autoCapitalize="none"
                  onChangeText={(value) => handleInputChange(value, 'nickname')}
                  onBlur={availableNicknameCheck}
                />
                {data.isAvailableNickname ? (
                  <Animatable.View animation="bounceIn">
                    <FeatherIcon name="check-circle" color="green" size={20} />
                  </Animatable.View>
                ) : null}
              </InputWrap>

              <BottomTitle>비밀번호</BottomTitle>
              <InputWrap>
                <FontAwesomeIcon
                  name="lock"
                  color="#05375a"
                  size={22}
                  style={{ marginRight: 5 }}
                />
                <Input
                  placeholder="비밀번호는 8자 이상으로"
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

              <BottomTitle>비밀번호 확인</BottomTitle>
              <InputWrap>
                <FontAwesomeIcon
                  name="lock"
                  color="#05375a"
                  size={22}
                  style={{ marginRight: 5 }}
                />
                <Input
                  placeholder="중요한 건 한번 더 체크"
                  secureTextEntry={data.confirmSecureTextEntry ? true : false}
                  autoCapitalize="none"
                  onChangeText={(value) =>
                    handleInputChange(value, 'confirmPassword')
                  }
                  keyboardType="ascii-capable"
                />
                <InputSecureIcon
                  handleSecureTextEntryChange={() =>
                    handleSecureTextEntryChange('confirmSecureTextEntry')
                  }
                  isSecureTextEntry={data.confirmSecureTextEntry}
                />
              </InputWrap>

              <ButtonWrap>
                <Button
                  buttonStyle={{ backgroundColor: '#efc4cd' }}
                  title="회원가입"
                  raised={true}
                  onPress={signUp}
                  loading={data.isLoading}
                />
              </ButtonWrap>
              <ButtonWrap style={{ marginBottom: 5 }}>
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
            </ScrollView>
          </ScrollEventWrap>
        </BottomView>

        <Alert alertData={alertData} setAlertData={setAlertData} />
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;
