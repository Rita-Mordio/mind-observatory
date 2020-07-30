import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/native';

import TodayStatus from '../Components/TodayStatus';
import ViewType from '../Components/ViewType';
import ImageTypeDiary from '../Components/ImageTypeDiary';
import TextTypeDiary from '../Components/TextTypeDiary';
import Context from '../Redux/contexts/context';

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

const Home = ({ navigation }) => {
  const { setHeader } = useContext(Context);

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      setHeader({ headerColor: '#efc4cd', headerTitle: '홈' });
    });

    return unsubscribe;
  }, [navigation]);

  const [viewType, setViewType] = useState('image');

  const handleVieTypeToggle = (nextType) => {
    if (nextType !== viewType)
      setViewType(viewType === 'image' ? 'text' : 'image');
  };

  const renderDiaries = () => {};

  return (
    <Container>
      <TodayStatus navigation={navigation} />
      <ViewType viewType={viewType} handleVieTypeToggle={handleVieTypeToggle} />
      <DiaryScroll>
        {/*<TextTypeDiary />*/}
        {/*<TextTypeDiary />*/}
        {/*<TextTypeDiary />*/}
        <ImageTypeDiary />
        <ImageTypeDiary />
        <ImageTypeDiary />
      </DiaryScroll>
    </Container>
  );
};

export default Home;
