import React from 'react';
import styled from 'styled-components/native';

const Image = styled.Image`
  width: ${props => props.size ? props.size : 30}px;
  height: ${props => props.size ? props.size : 30}px;
`;

const WeatherIcon = ({ value, id, size }) => {

  const getSource = () => {

    switch (value) {
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

  return <Image key={`${id}${Math.random()}`} source={getSource()} size={size} />;
};

export default WeatherIcon;
