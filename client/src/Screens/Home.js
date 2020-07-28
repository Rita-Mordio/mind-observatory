import React, { useState } from 'react';
import styled from 'styled-components/native';

import TodayStatus from '../Components/TodayStatus';
import ViewType from '../Components/ViewType';
import DiaryImage from '../Components/DiaryImage';
import DiaryText from '../Components/DiaryText';

//##################################
//##################################
//############# Styled #############
//##################################
//##################################

const Container = styled.ScrollView`
  flex: 1;
`;

const DiaryScroll = styled.View`
  flex: 1;
  padding: 30px 20px;
  background-color: white;
  align-items: center;
`;

//###################################
//###################################
//############ Component ############
//###################################
//###################################

const Home = () => {
  const [viewType, setViewType] = useState('image');

  const handleVieTypeToggle = (nextType) => {
    if (nextType !== viewType)
      setViewType(viewType === 'image' ? 'text' : 'image');
  };

  const renderDiaries = () => {

  }

  return (
    <Container>
      <TodayStatus />
      <ViewType viewType={viewType} handleVieTypeToggle={handleVieTypeToggle} />
      <DiaryScroll>
        {/*<DiaryText />*/}
        {/*<DiaryText />*/}
        {/*<DiaryText />*/}
        <DiaryImage />
        <DiaryImage />
        <DiaryImage />
      </DiaryScroll>
    </Container>
  );
};

export default Home;
