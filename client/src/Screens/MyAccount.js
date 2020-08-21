import React, { useState, useEffect } from 'react';
import {
  Keyboard,
  Dimensions,
  Platform,
  Switch,
  TouchableWithoutFeedback,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import { RNS3 } from 'react-native-aws3';
import ImagePicker from 'react-native-image-crop-picker';
import styled from 'styled-components/native';
import moment from 'moment';

import Alert from '../Components/Alert';
import InputSecureIcon from '../Components/InputSecureIcon';
import COMMON from '../common';

const { width } = Dimensions.get('screen');

//##################################
//##################################
//############# Styled #############
//##################################
//##################################

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
  align-items: center;
`;

const ImageWrap = styled.View`
  width: ${Math.round(width * 0.35)}px;
  height: ${Math.round(width * 0.35)}px;
  border-style: dashed;
  border-width: 1px;
  border-color: #a9a9a9;
  border-radius: ${Math.round(width * 0.175)}px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: ${Math.round(width * 0.175)}px;
`;

const ScrollView = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

const View = styled.View`
  margin-top: 30px;
`;

const Title = styled.Text`
  color: #3f3e3c;
  font-size: 16px;
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

const AutoSignInWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ButtonWrap = styled.View`
  width: 100%;
  margin-top: 40px;
`;

//###################################
//###################################
//############ Component ############
//###################################
//###################################

const MyAccount = () => {
  const [accountData, setAccountData] = useState({
    nickname: '',
    password: '',
    confirmPassword: '',
    secureTextEntry: true,
    confirmSecureTextEntry: true,
    isAutoSignIn: false,
  });

  const [imageData, setImageData] = useState({
    uri:
      'https://mind-observatory.s3.ap-northeast-2.amazonaws.com/default-choice.png',
    name: '',
    type: '',
  });

  const [alertData, setAlertData] = useState({
    show: false,
    message: '',
    onConfirmPressed: null,
    confirmButtonColor: '#BCC74F',
  });

  useEffect(() => {
    getAccount();
  }, []);

  const getAccount = () => {
    COMMON.getStoreData(
      '@userToken',
      (value) => {
        COMMON.axiosCall(
          'user/getUser',
          { token: value },
          (object) => {
            if (COMMON.checkSuccess(object, alertData, setAlertData)) {
              console.log(object);
            }
          },
          () => {
            setAlertData({
              ...alertData,
              show: true,
              message: '',
            });
          },
        );
      },
      () => {
        setAlertData({
          ...alertData,
          show: true,
          message: '사용자 토큰정보를 가져오는데 실패하였습니다.',
        });
      },
    );
  };

  const handleSecureTextEntryChange = (entryName) => {
    setAccountData({
      ...accountData,
      [entryName]: !accountData[entryName],
    });
  };

  const handleInputChange = (value, inputName) => {
    setAccountData({
      ...accountData,
      [inputName]: value,
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 150,
      height: 150,
      cropping: true,
    })
      .then((image) => {
        setImageData({
          uri: image.path,
          name: image.filename,
          type: image.mime,
        });
      })
      .catch((error) => {
        setAlertData({
          ...alertData,
          show: true,
          message:
            '이미지를 선택하지 않았거나, 사용 불가능한 이미지 입니다. 다른 이미지를 선택해 주세요.',
        });
      });
  };

  const uploadProfileImage = () => {
    const currentDate = moment().format('YYYY-MM-DD-hh-mm-ss');
    const imageObject = {
      uri: `file://${imageData.uri}`,
      name: `${currentDate}${imageData.name}`,
      type: imageData.type,
    };

    RNS3.put(imageObject, COMMON.awsConfig)
      .then((result) => {
        editAccount(result.body.postResponse.location);
      })
      .catch((error) => {
        setAlertData({
          ...alertData,
          show: true,
          message:
            '이미지를 서버로 전송중 문제가 발생하였습니다. 관리자에게 문의해주세요.',
        });
      });
  };

  const editAccount = (profileImageUrl) => {};

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <TouchableWithoutFeedback onPress={choosePhotoFromLibrary}>
          <ImageWrap>
            <Image source={{ uri: imageData.uri }} resizeMode="cover" />
          </ImageWrap>
        </TouchableWithoutFeedback>

        <ScrollView>
          <View>
            <Title>닉네임</Title>
            <InputWrap>
              <FontAwesomeIcon name="user-o" color="#05375a" size={20} />
              <Input
                placeholder="당신만의 닉네임"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(value) => handleInputChange(value, 'email')}
              />
            </InputWrap>
          </View>

          <View>
            <Title>비밀번호</Title>
            <InputWrap>
              <FontAwesomeIcon name="lock" color="#05375a" size={20} />
              <Input
                placeholder="비밀번호는 8자 이상으로"
                secureTextEntry={accountData.secureTextEntry ? true : false}
                autoCapitalize="none"
                onChangeText={(value) => handleInputChange(value, 'password')}
              />
              <InputSecureIcon
                handleSecureTextEntryChange={() =>
                  handleSecureTextEntryChange('secureTextEntry')
                }
                isSecureTextEntry={accountData.secureTextEntry}
              />
            </InputWrap>
          </View>

          <View>
            <Title>비밀번호 확인</Title>
            <InputWrap>
              <FontAwesomeIcon name="lock" color="#05375a" size={20} />
              <Input
                placeholder="중요한 건 한번 더 체크"
                secureTextEntry={
                  accountData.confirmSecureTextEntry ? true : false
                }
                autoCapitalize="none"
                onChangeText={(value) =>
                  handleInputChange(value, 'confirmPassword')
                }
              />
              <InputSecureIcon
                handleSecureTextEntryChange={() =>
                  handleSecureTextEntryChange('confirmSecureTextEntry')
                }
                isSecureTextEntry={accountData.confirmSecureTextEntry}
              />
            </InputWrap>
          </View>

          <View>
            <AutoSignInWrap>
              <Title>자동 로그인 설정</Title>
              <TouchableWithoutFeedback
                onPress={() => {
                  setAccountData({
                    ...accountData,
                    isAutoSignIn: !accountData.isAutoSignIn,
                  });
                }}
              >
                <Switch value={accountData.isAutoSignIn} />
              </TouchableWithoutFeedback>
            </AutoSignInWrap>
          </View>

          <ButtonWrap>
            <Button
              buttonStyle={{ backgroundColor: '#BCC74F' }}
              title="저장"
              raised={true}
              onPress={() => {
                imageData.name === '' ? editAccount() : uploadProfileImage();
              }}
              // loading={showButtonSpinner}
            />
          </ButtonWrap>
        </ScrollView>

        <Alert alertData={alertData} setAlertData={setAlertData} />
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default MyAccount;
