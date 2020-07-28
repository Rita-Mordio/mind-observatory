import React, { useState } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import TodayStatus from '../Components/TodayStatus';
import ViewType from '../Components/ViewType';

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
  background-color: white;
`;

const Diary = styled.View`
  width: 300px;
  height: 300px;
  background-color: white;
  border: 0px solid #000000;
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

  return (
    <Container>
      <TodayStatus />
      <ViewType viewType={viewType} handleVieTypeToggle={handleVieTypeToggle} />
      <DiaryScroll>
        <Diary />
        <Diary />
        <Diary />
      </DiaryScroll>
    </Container>
  );
};

export default Home;
