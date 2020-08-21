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

const PointText = styled.Text`
  font-weight: bold;
`;

//###################################
//###################################
//############ Component ############
//###################################
//###################################

const ReportContents = ({ data }) => {
  return (
    <Container>
      <Text>
        총 관측 일자는 <PointText>{data.weather.length}</PointText> 일이고
      </Text>
      {data.count.sun && (
        <Text>
          - 맑은 날이 <PointText>{data.count.sun}</PointText>일
        </Text>
      )}
      {data.count.cloud && (
        <Text>
          - 흐린 날이 <PointText>{data.count.cloud}</PointText>일
        </Text>
      )}
      {data.count.rain && (
        <Text>
          - 비가 온 날이 <PointText>{data.count.rain}</PointText>일
        </Text>
      )}
      {data.count.thunder && (
        <Text>
          - 번개 치는 날이 <PointText>{data.count.thunder}</PointText>일
        </Text>
      )}
      <Text style={{ marginTop: 10 }}>
        "{REPORT_SENTENCE[data.mostNumerous][Math.floor(Math.random() * 3)]}"
      </Text>
    </Container>
  );
};

export default ReportContents;
