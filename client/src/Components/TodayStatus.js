import React from 'react';
import { Dimensions, StyleSheet, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import styled from 'styled-components/native';
import moment from 'moment';

import TODAY_SENTENCE from '../TODAY_SENTENCE';

const { width } = Dimensions.get('screen');

//##################################
//##################################
//############# Styled #############
//##################################
//##################################

const Container = styled.View`
  background-color: #ffffff;
  padding-top: 30px;
  padding-bottom: 20px;
`;

const View = styled.View`
  align-items: center;
  position: relative;
`;

const WindowImage = styled.Image`
  width: ${Math.round(width * 0.6)}px;
  height: ${Math.round(width * 0.732)}px;
`;

const TodayText = styled.Text`
  margin-top: ${() => {
    if (Platform.OS === 'ios') return '40px';
    else return '15px';
  }};
  margin-bottom: ${() => {
  if (Platform.OS === 'ios') return '25px';
  else return '0px';
}};
  font-family: NotoSerifKR-Regular;
  font-size: 24px;
  color: #3f3e3c;
`;

//###################################
//###################################
//############ Component ############
//###################################
//###################################

const TodayStatus = ({ navigation, recentDiary }) => {
  const renderWindow = () => {
    switch (recentDiary.weather) {
      case 'sun':
        return require('../../assets/images/window-sun.png');
      case 'rain':
        return require('../../assets/images/window-rain.png');
      case 'cloud':
        return require('../../assets/images/window-cloud.png');
      case 'thunder':
        return require('../../assets/images/window-thunder.png');
    }
  };

  const renderDefaultWindow = () => {
    return (
      <View>
        <WindowImage source={require('../../assets/images/window-blind.png')} />
        <TodayText>오늘은, 어떤 날이었나요?</TodayText>
        <Button
          title="일기 쓰기"
          type="outline"
          raised={true}
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.containerStyle}
          titleStyle={styles.titleStyle}
          onPress={() => {
            navigation.navigate('Template');
          }}
        />
      </View>
    );
  };

  const renderTodayWindow = () => {
    const writeDay = moment(recentDiary.createdAt).format('YYYY-MM-DD');
    const today = moment().format('YYYY-MM-DD');
    const isSame = moment(writeDay).isSame(today, 'day');
    const todayWord =
      TODAY_SENTENCE[recentDiary.weather][Math.floor(Math.random() * 3)];

    if (isSame) {
      return (
        <View>
          <WindowImage source={renderWindow()} />
          <TodayText>{todayWord}</TodayText>
        </View>
      );
    } else {
      return renderDefaultWindow();
    }
  };

  if (recentDiary === undefined) {
    return <Container>{renderDefaultWindow()}</Container>;
  } else {
    return <Container>{renderTodayWindow()}</Container>;
  }
};

export default TodayStatus;

const styles = StyleSheet.create({
  containerStyle: {
    width: 150,
    marginTop: Platform.OS === 'ios' ? 15 : 15,
    marginBottom: Platform.OS === 'ios' ? 25 : 25
  },

  buttonStyle: {
    borderColor: '#3f3e3c',
  },

  titleStyle: {
    color: '#3f3e3c',
    lineHeight: 24,
    paddingTop: 2,
  },
});
