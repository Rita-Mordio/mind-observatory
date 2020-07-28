import React from 'react';
import { Dimensions, StyleSheet, Platform } from 'react-native';
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
`;

const WindowImage = styled.Image`
  width: ${Math.round(width * 0.6)}px;
  height: ${Math.round(width * 0.732)}px;
`;

const TodayText = styled.Text`
  margin-top: ${() => {
    if (Platform.OS === 'ios') return '35px';
    else return '15px';
  }};
  margin-bottom: ${() => {
    if (Platform.OS === 'ios') return '25px';
    else return '5px';
  }};
  font-family: NotoSerifKR-Regular;
  font-size: 24px;
`;

const TodayStatus = ({ navigation }) => {
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
        onPress={() => {
          navigation.navigate('EditDiary');
        }}
      />
    </Container>
  );
};

export default TodayStatus;

const styles = StyleSheet.create({
  containerStyle: {
    width: 150,
  },

  buttonStyle: {
    borderColor: '#2b2b2b',
  },

  titleStyle: {
    color: '#2b2b2b',
    lineHeight: 24,
    paddingTop: 2,
  },
});
