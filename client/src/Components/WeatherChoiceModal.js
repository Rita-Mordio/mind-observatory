import React from 'react';
import styled from 'styled-components/native';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';

const WeatherModalTitle = styled.Text`
  color: #3f3e3c;
  font-size: 18px;
  text-align: center;
  margin-bottom: 30px;
`;

const WeatherWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Weather = styled.Image`
  width: 32px;
  height: 32px;
`;

const WeatherChoiceModal = ({ visible, toggleModal, setWeather }) => {

    const handleIconChange = (name) => {
    toggleModal();

    switch (name) {
      case 'sun':
        return setWeather(require(`../../assets/images/weather-sun.png`));
      case 'rain':
        return setWeather(require(`../../assets/images/weather-rain.png`));
      case 'cloud':
        return setWeather(require(`../../assets/images/weather-cloud.png`));
      case 'thunder':
        return setWeather(require(`../../assets/images/weather-thunder.png`));
    }
  };

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={toggleModal}
      overlayStyle={styles.overlayStyle}
    >
      <WeatherModalTitle>감정 날씨를 선택해 주세요.</WeatherModalTitle>
      <WeatherWrap>
        <TouchableWithoutFeedback
          onPress={() => {
            handleIconChange('sun');
          }}
        >
          <Weather source={require(`../../assets/images/weather-sun.png`)} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            handleIconChange('cloud');
          }}
        >
          <Weather source={require(`../../assets/images/weather-cloud.png`)} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            handleIconChange('rain');
          }}
        >
          <Weather source={require(`../../assets/images/weather-rain.png`)} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            handleIconChange('thunder');
          }}
        >
          <Weather
            source={require(`../../assets/images/weather-thunder.png`)}
          />
        </TouchableWithoutFeedback>
      </WeatherWrap>
    </Overlay>
  );
};

export default WeatherChoiceModal;

const styles = StyleSheet.create({
  overlayStyle: {
    width: 265,
    borderRadius: 15,
    padding: 20,
  },
});
