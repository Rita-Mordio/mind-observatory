import React, { useState } from 'react';
import styled from 'styled-components/native';

const Image = styled.Image`
  width: 30px;
  height: 30px;
  margin-left: 10px;
`;

const WeatherIcon = ({ value, id }) => {
  const [weather, setWeather] = useState(value);

  const getSource = () => {

    switch (weather) {
      case 'sun':
        return require(`../../assets/images/weather-sun.png`);
      case 'rain':
        return require(`../../assets/images/weather-rain.png`);
      case 'cloud':
        return require(`../../assets/images/weather-cloud.png`);
      case 'thunder':
        return require(`../../assets/images/weather-thunder.png`);
    }
  };

  return <Image key={`${id}${Math.random()}`} source={getSource()} />;
};

export default WeatherIcon;
