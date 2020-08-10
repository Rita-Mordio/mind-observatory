import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import Carousel from 'react-native-snap-carousel';
import TemplateViewData from '../TemplateViewData';
import TemplateItem from '../Components/TemplateItem';

const { width } = Dimensions.get('screen');

//##################################
//##################################
//############# Styled #############
//##################################
//##################################

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

const Container = styled.View`
  flex: 1;
  padding: 25px 0px 20px 0px;
  background-color: #ffffff;
`;

const PageTitle = styled.Text`
  color: #3f3e3c;
  text-align: center;
  font-size: 18px;
  margin-bottom: 30px;
`;

const CarouselWrap = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
`;

//###################################
//###################################
//############ Component ############
//###################################
//###################################

class Template extends Component {
  constructor(props) {
    super(props);
  }

  renderTemplate = ({ item }) => {
    return (
      <TemplateItem
        title={item.title}
        description={item.description}
        viewData={item.viewData}
        navigation={() => {
          this.props.navigation.navigate(item.navigationName, {
              templateType: item.template,
          });
        }}
      />
    );
  };

  render() {
    return (
      <SafeAreaView>
        <Container>
          <PageTitle>원하시는 일기 형태를 선택해주세요.</PageTitle>
          <CarouselWrap>
            <Carousel
              ref={(ref) => (this.carousel = ref)}
              data={TemplateViewData}
              sliderWidth={width}
              itemWidth={Math.round(width * 0.77)}
              renderItem={this.renderTemplate}
            />
          </CarouselWrap>
        </Container>
      </SafeAreaView>
    );
  }
}

export default Template;
