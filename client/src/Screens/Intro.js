import {Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import {Button} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

const Container = styled.View`
  flex: 1;
  background-color: #efc4cd;
`;

const TopView = styled.View`
  flex: 1.25;
  align-items: center;
  justify-content: center;
`;

const BottomTitle = styled.Text`
  color: #2b2b2b;
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

const Intro = ({navigation}) => {
  return (
    <Container>
      <TopView>
        <Animatable.Image
          animation="bounce"
          duration={2500}
          iterationDelay={650}
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="stretch"
          iterationCount="infinite"
        />
      </TopView>
      <Animatable.View style={styles.bottom} animation="fadeInUpBig">
        <BottomContentWrap>
          <BottomTitle>당신의 마음을 관측합니다.</BottomTitle>
          <BottomContent>내 마음 관측소에 어서오세요.</BottomContent>
          <BottomContent>하루 하루 당신의 마음 속 날씨</BottomContent>
          <BottomContent>소중하게 간직 할께요.</BottomContent>
        </BottomContentWrap>
        <BottomButtonWrap>
          <Button
            buttonStyle={styles.buttonStyle}
            title="시작하기"
            raised={true}
            iconRight={true}
            onPress={() => {
              navigation.navigate('SignIn');
            }}
          />
        </BottomButtonWrap>
      </Animatable.View>
    </Container>
  );
};

export default Intro;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  logo: {
    width: height_logo,
    height: height_logo,
  },
  bottom: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  buttonStyle: {
    backgroundColor: '#efc4cd',
  },
});