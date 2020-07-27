import React from 'react';
import styled from 'styled-components/native';

import TodayStatus from "../Components/TodayStatus";

//##################################
//##################################
//############# Styled #############
//##################################
//##################################

const Container = styled.ScrollView`
  flex: 1;
`;

const ViewType = styled.View`
  height: 50px;
  background-color: cadetblue;
`;

const DiaryScroll = styled.View`
  flex: 1;
  background-color: coral;
`

const Diary = styled.View`
  width: 300px;
  height: 300px;
  background-color: yellowgreen;
  border: 2px solid #000000;
`


const Home = () => {
  return (
    <Container>
        <TodayStatus />
        <ViewType></ViewType>
        <DiaryScroll>
            <Diary />
            <Diary />
            <Diary />
        </DiaryScroll>
    </Container>
  );
};

export default Home;
