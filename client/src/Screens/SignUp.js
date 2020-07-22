import {
  Keyboard,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Button} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import Axios from "axios";

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
  color: #2b2b2b;
  font-family: Nanum Pen;
  font-size: 50px;
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

const SignUp = ({navigation}) => {
  const [data, setData] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
    isAvailableEmail: false,
    secureTextEntry: true,
    confirmSecureTextEntry: true,
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

  const availableEmailCheck = () => {
    Axios.post('http://10.0.2.2:4000/api/user/availableEmail', {
      email: data.email
    }).then((result) => {

      const isAvailable = result.data.isAvailable;

      if(isAvailable){
        setData({
          ...data,
          isAvailableEmail: true
        })
      } else {
        setData({
          ...data,
          isAvailableEmail: false
        })
        alert("이미 사용중인 이메일 입니다.")
      }
      
    }).catch((error) => {
      alert("에러가 발생했습니다. 관리자에게 문의해주세요.")
    })
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <TopView>
          <TopTitle>회원가입</TopTitle>
        </TopView>
        <Animatable.View style={styles.bottom} animation="fadeInUpBig">
          <BottomTitle>이메일</BottomTitle>
          <InputWrap>
            <FontAwesomeIcon name="user-o" color="#05375a" size={20} />
            <Input
              placeholder="당신의 소중한 이메일"
              autoCapitalize="none"
              onChangeText={(value) => handleInputChange(value, 'email')}
              onBlur={availableEmailCheck}
            />
            {data.isAvailableEmail ? (
              <Animatable.View animation="bounceIn">
                <FeatherIcon name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
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
            <TouchableOpacity
              onPress={() => {
                handleSecureTextEntryChange('secureTextEntry');
              }}>
              {data.secureTextEntry ? (
                <FeatherIcon name="eye-off" color="gray" size={20} />
              ) : (
                <FeatherIcon name="eye" color="gray" size={20} />
              )}
            </TouchableOpacity>
          </InputWrap>

          <BottomTitle>비밀번호 확인</BottomTitle>
          <InputWrap>
            <FontAwesomeIcon name="lock" color="#05375a" size={20} />
            <Input
              placeholder="중요한 건 한번 더 체크"
              secureTextEntry={data.confirmSecureTextEntry ? true : false}
              autoCapitalize="none"
              onChangeText={(value) =>
                handleInputChange(value, 'confirmPassword')
              }
            />
            <TouchableOpacity
              onPress={() => {
                handleSecureTextEntryChange('confirmSecureTextEntry');
              }}>
              {data.confirmSecureTextEntry ? (
                <FeatherIcon name="eye-off" color="gray" size={20} />
              ) : (
                <FeatherIcon name="eye" color="gray" size={20} />
              )}
            </TouchableOpacity>
          </InputWrap>

          <ButtonWrap>
            <Button
              buttonStyle={{backgroundColor: '#efc4cd'}}
              title="회원가입"
              raised={true}
            />
          </ButtonWrap>
          <ButtonWrap>
            <Button
              buttonStyle={{borderColor: '#efc4cd'}}
              titleStyle={{color: '#efc4cd'}}
              type="outline"
              title="로그인"
              raised={true}
              onPress={() => {
                navigation.navigate('SignIn');
              }}
            />
          </ButtonWrap>
        </Animatable.View>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  bottom: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
