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
  margin-top: 10px;
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
  margin-top: 20px;
`;

const SignUp = ({navigation}) => {
  const [data, setData] = React.useState({
    id: '',
    password: '',
    confirm_password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  const handleIdChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        id: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        id: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirm_password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

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
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleIdChange(val)}
            />
            {data.check_textInputChange ? (
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
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
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
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {data.confirm_secureTextEntry ? (
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
              onPress={() => {navigation.navigate('SignIn')}}
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
