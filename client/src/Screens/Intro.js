import React, { useContext, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

import COMMON from '../common';
import Context from '../Redux/contexts/context';

import Alert from '../Components/Alert';

const { height } = Dimensions.get('screen');

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
  align-items: center;
  justify-content: center;
`;

const Logo = styled.Image`
  width: ${Math.round(height * 0.28)}px;
  height: ${Math.round(height * 0.28)}px;
`;

const BottomView = styled.View`
  flex: 1;
  background-color: #ffffff;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding-top: 50px;
  padding-left: 30px;
  padding-right: 30px;
`;

const BottomTitle = styled.Text`
  color: #3f3e3c;
  font-size: 38px;
  font-family: Nanum Pen;
  margin-bottom: 15px;
`;

const BottomContentWrap = styled.View`
  flex: 1;
`;

const BottomContent = styled.Text`
  color: #9e9e9e;
  font-family: NotoSerifKR-Regular;
  line-height: 35px;
`;

const BottomButtonWrap = styled.View`
  flex: 1;
  justify-content: center;
`;

//###################################
//###################################
//############ Component ############
//###################################
//###################################

const Intro = ({ navigation }) => {
  const { signIn } = useContext(Context);

  const [userToken, setUserToken] = useState(null);
  const [alertData, setAlertData] = useState({
    show: false,
    message: '',
    onConfirmPressed: null,
  });

  useEffect(() => {
    COMMON.getStoreData(
      '@isAutoSignIn',
      (value) => {
        if (value === 'true') {
          COMMON.getStoreData(
            '@userToken',
            (value) => {
              if (value !== null) {
                setUserToken(value);
              }
            },
            () => {
              setAlertData({
                ...alertData,
                show: true,
                message: '사용자 토큰정보를 가져오는데 문제가 발생했습니다.',
              });
            },
          );
        }
      },
      () => {
        setAlertData({
          ...alertData,
          show: true,
          message: '자동 로그인정보를 가져오는데 문제가 발생했습니다.',
        });
      },
    );
  }, []);

  return (
    <Container>
      <TopView>
        <Logo
          as={Animatable.Image}
          animation="bounce"
          duration={2500}
          iterationDelay={650}
          source={require('../../assets/images/logo-background-void.png')}
          resizeMode="stretch"
          iterationCount="infinite"
        />
      </TopView>

      <BottomView as={Animatable.View} animation="fadeInUpBig">
        <BottomContentWrap>
          <BottomTitle>당신의 마음을 관측합니다.</BottomTitle>
          <BottomContent>내 마음 관측소에 어서오세요.</BottomContent>
          <BottomContent>하루 하루 당신의 마음 속 날씨</BottomContent>
          <BottomContent>소중하게 간직 할께요.</BottomContent>
        </BottomContentWrap>
        <BottomButtonWrap>
          <Button
            buttonStyle={{ backgroundColor: '#efc4cd' }}
            title="시작하기"
            raised={true}
            iconRight={true}
            onPress={() => {
              userToken === null
                ? navigation.navigate('SignIn')
                : signIn(userToken);
            }}
          />
        </BottomButtonWrap>
      </BottomView>

      <Alert alertData={alertData} setAlertData={setAlertData} />
    </Container>
  );
};

export default Intro;
