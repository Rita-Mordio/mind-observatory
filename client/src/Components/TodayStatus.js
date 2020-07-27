import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Button } from 'react-native-elements';

const { width } = Dimensions.get('screen');

const Container = styled.View`
  align-items: center;
  background-color: #ffffff;
  padding-top: 30px;
  padding-bottom: 50px;
  position: relative;
`;

const GrayBackground = styled.View`
  background-color: #f5f5f5;
  width: 100%;
  height: 250px;
  position: absolute;
`

const WindowImage = styled.Image`
  width: ${width * 0.6};
  height: ${width * 0.732};
`;

const TodayText = styled.Text`
  margin-top: 15px;
  font-family: NotoSerifKR-Regular;
  font-size: 24px;
`;

const TodayStatus = () => {
  return (
    <Container>
        <GrayBackground />
      <WindowImage source={require('../../assets/images/window.png')} />
      <TodayText>오늘은, 어떤 날이었나요?</TodayText>
      <Button
        title="일기 쓰기"
        type="outline"
        raised={true}
        buttonStyle={styles.buttonStyle}
        containerStyle={styles.containerStyle}
        titleStyle={styles.titleStyle}
      />
    </Container>
  );
};

export default TodayStatus;

const styles = StyleSheet.create({
  containerStyle: {
    width: 150,
    marginTop: 5,
  },

  buttonStyle: {
    borderColor: '#2b2b2b',
  },

  titleStyle: {
    color: '#2b2b2b',
    fontFamily: 'NotoSerifKR-Bold',
    lineHeight: 24,
    paddingTop: 7,
  },
});
