import React from 'react';
import styled from 'styled-components/native';
import WeatherIcon from "./WeatherIcon";

const Container = styled.View`
  width: ${100 / 5}%;
  align-items: center;
  border-color: #dddddd;
  border-right-width: 1px;
  border-bottom-width: 1px;
  padding: 10px;
`

const Text = styled.Text`
  color: #3f3e3c;
  margin-top: 4px;
`

const ReportDayItem = ({weather, date}) => {
    return (
        <Container>
            <WeatherIcon value={ weather } id={Math.random()} />
            <Text>{ date }</Text>
        </Container>
    )
}

export default ReportDayItem