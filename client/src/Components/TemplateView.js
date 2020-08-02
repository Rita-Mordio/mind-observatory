import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';

//##################################
//##################################
//############# Styled #############
//##################################
//##################################

const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
  border-radius: 10px;
  margin-left: 0px;
  margin-right: 0px;
  margin-bottom: 30px;
  padding: 30px 10px 20px 10px;
  shadow-color: #000000;
  shadow-opacity: 0.3;
  shadow-radius: 6.27;
  shadow-offset: 3px 10px;
  elevation: 9;
`;

const TemplateTitle = styled.Text`
  color: #3f3e3c;
  text-align: center;
  font-size: 24px;
  margin-bottom: 30px;
`;

const Area = styled.View`
  flex: 1;
  background-color: #cee1e9;
  border-radius: 15px;
  margin: 5px;
  justify-content: center;
  align-items: center;
`;

const AreaTitle = styled.Text`
  color: #3f3e3c;
  font-size: 19px;
`;

const Description = styled.Text`
  color: #3f3e3c;
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
`;

//###################################
//###################################
//############ Component ############
//###################################
//###################################

const TemplateView = ({ title, description, viewData, navigation }) => {
  const renderAreaWrap = (template) => {
    return template.map((item, index) => {
      return (
        <View key={index} style={{ flex: item.flex, flexDirection: 'row' }}>
          {renderArea(item)}
        </View>
      );
    });
  };

  const renderArea = (data) => {
    return data.title.map((areaTitle, index) => {
      return (
        <Area
          key={index}
          style={{
            backgroundColor: `${
              areaTitle === '이미지'
                ? '#cee1e9'
                : areaTitle === '제목'
                ? '#fde6e2'
                : '#fef6e0'
            }`,
          }}
        >
          <AreaTitle>{areaTitle}</AreaTitle>
        </Area>
      );
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => {navigation()}}>
      <Container>
        <TemplateTitle>{title}</TemplateTitle>
        {renderAreaWrap(viewData)}
        <Description>{description}</Description>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default TemplateView;
