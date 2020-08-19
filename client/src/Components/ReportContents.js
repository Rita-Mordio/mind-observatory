import React from 'react';
import styled from 'styled-components/native';

import REPORT_SENTENCE from '../REPORT_SENTENCE';

//##################################
//##################################
//############# Styled #############
//##################################
//##################################

const Container = styled.View`
  background-color: #e5f3fb;
  padding: 10px 15px;
  margin-bottom: 20px;
`;

const Text = styled.Text`
  color: #3f3e3c;
  font-size: 15px;
  line-height: 28px;
`;

//###################################
//###################################
//############ Component ############
//###################################
//###################################

const ReportContents = ({ data }) => {
  return (
    <Container>
      <Text>총 관측 일자는 {data.weather.length} 일이고 </Text>
      {data.count.sun && <Text>- 맑은 날이 {data.count.sun}일</Text>}
      {data.count.cloud && <Text>- 흐린 날이 {data.count.cloud}일</Text>}
      {data.count.rain && <Text>- 비가 온 날이 {data.count.rain}일</Text>}
      {data.count.thunder && (
        <Text>- 번개 치는 날이 {data.count.thunder}일</Text>
      )}
      <Text>
        {REPORT_SENTENCE[data.mostNumerous][Math.floor(Math.random() * 3)]}
      </Text>
    </Container>
  );
};

export default ReportContents;
